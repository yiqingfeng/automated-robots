import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { readCsv } from '../util/csv';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getUserList(): Promise<any[]> {
    return await readCsv('user');
  }
}
