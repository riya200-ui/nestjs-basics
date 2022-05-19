/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log('First Call', request.headers.token);
    // return next
    // .handle()
    // .pipe(
    //     tap(()=>console.log("Last Call")),
    // );

    // const redisCache = false;
    // if (redisCache) {
    //   return of([
    //     {
    //       id: 1,
    //       message: 'data from cache',
    //     },
    //   ]);
    // }
    // return next.handle();

       return next
        .handle()
        .pipe(
             map(data=>{ 
                 return {
                     ...data,
                     newToken:"JHGSHJHJSJSHJHHS"
                 }
             })
        ); 
  }
}
