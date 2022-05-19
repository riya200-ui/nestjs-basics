/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { IsString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsString()
  name: String;

  @IsInt()
  id: Number;

  @IsString()
  email: String;
}
