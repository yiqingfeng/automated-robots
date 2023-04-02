# my_midway_project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

```
- src
  |- controller Web Controller 目录
  |- middleware 中间件目录
  |- filter 过滤器目录
  |- aspect 拦截器
  |- service 服务逻辑目录
  |- entity 或 model 数据库实体目录
  |- config 业务的配置目录
  |- util 工具类存放的目录
  |- decorator 自定义装饰器目录
  |- interface.ts 业务的 ts 定义文件
```


### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.


[midway]: https://midwayjs.org
