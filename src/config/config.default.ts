import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1679843677111_3756',
  koa: {
    port: 7001,
  },
  // staticFile: {
  //   dirs: {
  //     default: {
  //       prefix: '/',
  //       dir: 'xxx',
  //     },
  //   },
  // },
  view: {
    view: {
      rootDir: {
        default: join(__dirname, './view'),
      },
    },
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  },
} as MidwayConfig;
