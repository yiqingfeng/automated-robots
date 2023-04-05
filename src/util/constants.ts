import { join } from 'path';
import { PathLike } from 'fs';
import { access, mkdir } from 'fs/promises';

export const OUTPUT_PATH = join(process.cwd(), './output');

// 判断是否存在 output 路径，不存在则创建
export async function checkDir(path: PathLike) {
  const isExists = await access(path).catch(() => false);
  return isExists !== false;
}

// 创建指定目录
export async function mkDir(path: PathLike) {
  const isExists = await checkDir(path);
  if (!isExists) {
    await mkdir(path);
  }
}
