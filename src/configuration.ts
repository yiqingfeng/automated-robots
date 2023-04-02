/**
 * configuration 文件是 Midway 的生命周期入口文件，承担了组件开关，配置加载和生命周期管理的作用
 * imports 就使用来导入（开启）组件的方法
 */
import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as view from '@midwayjs/view-nunjucks';
import * as swagger from '@midwayjs/swagger';
import * as staticFile from '@midwayjs/static-file';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [
    koa,
    staticFile,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    view,
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // 添加全局中间件
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
