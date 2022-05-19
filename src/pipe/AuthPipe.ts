/* eslint-disable prettier/prettier */
import {
    ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
   console.log('ok',value)
   if(value =='22'){
       throw new BadRequestException("iNVALID")
   }
    return value;
  }
}
