import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // 控制器之后执行的逻辑
      ctx.logger.info(
        `Report in "src/middleware/report.middleware.ts", rt = ${
          Date.now() - startTime
        }ms`
      );
      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }

  // 执行忽略 - 非必要，默认所有路由都支持 | 正向的 还有 match 方法
  // ignore(ctx: Context): boolean {
  //   // 下面的路由将忽略此中间件
  //   return (
  //     ctx.path === '/' || ctx.path === '/api/auth' || ctx.path === '/api/login'
  //   );
  // }
}
