import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptors';

import { HttpExceptionFilter } from '../exception/http.filter';
//import { AuthPipe } from 'src/pipe/AuthPipe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreatePostDto } from '../pipe/CreatePostDto';

@Controller('posts')
@UseInterceptors(LoggingInterceptor)
export class PostsController {
  @Get('post-list')
  @UseGuards(AuthGuard)
  postList(): object {
    console.log('API Call');
    return {
      data: 'POST LIST DATA',
      id: 12,
      item: [{ name: 'test' }],
    };
  }

  // @Post('post-add')
  // @UseInterceptors(FileInterceptor('profile'))
  // postAddFile(@UploadedFile() profile: Express.Multer.File): object {
  //   console.log(profile);
  //   return {
  //     message: 'file uploaded',
  //   };
  // }

  // @Post('post-add')
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     {
  //       name: 'profile',
  //       maxCount: 2,
  //     },
  //     {
  //       name: 'profile2',
  //       maxCount: 1,
  //     },
  //   ]),
  // )
  // postAddupload(
  //   @UploadedFiles()
  //   profile: {
  //     profile?: Express.Multer.File[];
  //     profile2?: Express.Multer.File[];
  //   },
  // ): object {
  //   console.log(profile);
  //   return {
  //     message: 'file uploaded',
  //   };
  // }

  @Post('post-add')
  @UseInterceptors(FilesInterceptor('profile'))
  postAdduploadfile(
    @UploadedFiles() profilexyz: Array<Express.Multer.File>,
  ): object {
    console.log(profilexyz);
    return {
      message: 'file uploaded',
    };
  }

  @Get('post-add')
  postAdd() {
    return 'post add';
  }

  @Get('detail')
  postDetail() {
    return 'post detail';
  }
  /* //parseIntPipe for validation only int */
  //@Post('list/:id')

  // detailById(@Param('id', ParseIntPipe) id: number): string {
  //   console.log(id, '===');
  //   return 'List user' + id;
  // }
  // }

  /*for customize error */

  //@Post('list/:id')
  //   detailById(
  //     @Param(
  //       'id',
  //       new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //     )
  //     id: number,
  //   ): string {
  //     console.log(id, '===');
  //     return 'List user' + id;
  //   }
  // }

  /*default value set in query */

  //@Post('list/:id')
  //   detailById(
  //     @Query('page', new DefaultValuePipe(0))
  //     page: number,
  //   ): string {
  //     console.log(page, '===');
  //     return 'List user' + page;
  //   }
  // }

  // @Post('list/:id')
  // detailById(
  //   @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
  //   id: number[],
  // ): string {
  //   console.log(id, '===');
  //   return 'List user' + id;
  // }

  //   @Post('list/:id')
  //   @UsePipes(new AuthPipe())
  //   detailById(
  //     @Param('id')
  //     id: number,
  //   ): string {
  //     return 'List user' + id;
  //   }
  // }

  @Post('list/:id')
  //if we remove Usepipes then not use validator
  @UsePipes(ValidationPipe)
  detailById(
    @Body()
    CreatePostDto: CreatePostDto,
  ) {
    console.log(CreatePostDto);
    return 'List user';
  }

  @Get('info/:id')
  @UseFilters(new HttpExceptionFilter())
  postInfo(@Param('id', ParseIntPipe) id: number): object {
    if (id == 12) {
      // // throw new HttpException('XYZ', HttpStatus.NOT_FOUND);
      // throw new HttpException(
      //   {
      //     status: HttpStatus.ACCEPTED,
      //     error: 'CUSTOM error',
      //   },
      //   HttpStatus.ACCEPTED,
      // );
      // throw new ForbiddenException();
    }
    return {
      id: id,
      data: 'NA',
    };
  }
}
