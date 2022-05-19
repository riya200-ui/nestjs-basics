//import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http.filter';
import { AuthGuard } from './guards/auth.guard';
//import { SwaggerModule } from '@nestjs/swagger';
//import { createdocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //for validation without use usevalidatorpipe
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());
  //SwaggerModule.setup('api', app, createdocument(app));
  await app.listen(3000);
}
bootstrap();
