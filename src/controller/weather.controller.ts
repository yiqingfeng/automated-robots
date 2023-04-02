// src/controller/weather.controller.ts
import { Controller, Get, Inject } from '@midwayjs/core';
import { WeatherService } from '../service/weather.service';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class WeatherController {
  @Inject()
  weatherService: WeatherService;

  @Inject()
  ctx: Context;

  @Get('/weather')
  async render() {
    console.log(111, this.ctx.render);
    await this.ctx.render('test.nj', { user: 'midway' });
  }
  // async getWeatherInfo(@Query('cityId') cityId: string): Promise<any> {
  //   // const result = await this.weatherService.getWeather(cityId);
  //   // return result;
  //   // if (result) {
  //   //   await this.ctx.render('info.html', result.weatherinfo);
  //   // }
  // }
}
