import { createReadStream } from 'fs';
import { join } from 'path';
import * as csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { checkDir, mkDir, OUTPUT_PATH } from './constants';

interface Item<T = string | number> {
  [name: string]: T;
}

interface ReadOption {
  baseUrl?: string;
  numberFields?: string[];
  defaultNumber?: number;
}

// csv 数据格式化
function formatData(
  data: Item<string>,
  {
    numberFields,
    defaultNumber = 0,
  }: Pick<ReadOption, 'numberFields' | 'defaultNumber'> = {}
): Item {
  const result: Item = { ...data };
  numberFields?.forEach((name: string) => {
    if (name in result) {
      const num = Number(result[name]);
      result[name] = isNaN(num) ? defaultNumber : num;
    }
  });
  return result;
}

export async function readCsv(
  fileName: string,
  options?: ReadOption
): Promise<Item[]> {
  const path = join(OUTPUT_PATH, options?.baseUrl || './', `${fileName}.csv`);
  // 判断文件是否存在
  const isExists = await checkDir(path);
  if (!isExists) {
    throw new Error('数据文件不存在');
  }
  return new Promise((resolve, reject) => {
    const results: Item[] = [];
    createReadStream(path)
      .pipe(csv())
      // .pipe(csv({ separator: '\t' }))
      // .pipe(csv(['NAME', 'LANGUAGE']))
      .on('data', (data: Item<string>) =>
        results.push(formatData(data, options))
      )
      .on('error', reject)
      .on('end', () => {
        resolve(results);
      });
  });
}

export async function writerCsv({
  fileName,
  baseUrl,
  data,
}: {
  fileName: string;
  baseUrl?: string;
  data: Item[];
}) {
  const header = Object.keys(data[0] || []);

  if (header.length < 1) {
    throw new Error('暂无数据需要写入');
  }

  const dir = join(OUTPUT_PATH, baseUrl || './');

  await mkDir(dir);

  const csvWriter = createCsvWriter({
    path: join(dir, `${fileName}.csv`),
    header: header.map((id: string) => ({ id, title: id })),
  });
  await csvWriter.writeRecords(data);
}
