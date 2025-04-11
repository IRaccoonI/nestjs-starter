import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EApiTags } from 'src/constants/tags';

@ApiTags(EApiTags.HelloWorld)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
