import {
  All,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';

import { BlogsService } from '../blogs/blogs.service';

@Controller('users')
export class UsersController {
  constructor(private blogService: BlogsService) {}

  @Get()
  userInfo(): string {
    return 'USER PAGE';
  }

  @Get('history-page')
  userHistory(): object {
    return { id: 1, text: 'KJHJKHJKHJKH' };
  }

  @Post('add-user')
  //@All('add-user')
  addUser(@Body() record: any): string {
    console.log(record, '===');
    return 'OK Add user';
  }

  @Get('lists/:id')
  // @HttpCode(404)
  listUser(@Param() record: any): string {
    console.log(record, '===');
    return 'List user' + record.id;
  }

  @Get('list')
  listFilterUser(@Query() record: any): string {
    console.log(record, '===');
    return 'List Query user' + record.id;
  }

  @Get('version*card')
  detailPage(): string {
    return 'Detail';
  }

  detailPages(): string {
    return 'Detail';
  }

  @Get('blog-list')
  async blogList(): Promise<any[]> {
    console.log(process.env.SECRET_KEY);
    return this.blogService.findData();
  }

  @Post('blog-add')
  blogAdd(@Body() record: any) {
    this.blogService.create(record);
  }
}
