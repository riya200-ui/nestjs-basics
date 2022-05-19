import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exception/http.filter';
import { PostsController } from './posts/posts.controller';
import { UsersController } from './users/users.controller';

import { BlogsService } from './blogs/blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { DemoModule } from './super-admin/demo/demo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      //envFilePath: ['.development.env', '.env'],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //entities: [User],
      synchronize: true,
    }),
    DemoModule,
  ],
  controllers: [AppController, PostsController, UsersController],
  // providers: [AppService, BlogsService,{
  //   provide: APP_FILTER,
  //   useClass: HttpExceptionFilter
  // },{
  //   provide: APP_GUARD,
  //   useClass: AuthGuard
  // } ],
  providers: [AppService, BlogsService],
})
export class AppModule {}
