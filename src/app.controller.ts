import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { EApiTags } from 'src/constants/tags';

// Example don't use this as here
export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Alice' })
  name: string;
}

@ApiTags(EApiTags.HelloWorld)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns a list of users',
    type: UserDto,
    isArray: true,
  })
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
