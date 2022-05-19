import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

// interface Blog{
//     name:string,
//     id:number
// }

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  private readonly blogs: any[] = [
    {
      id: 1,
      data: 'NA',
    },
  ];

  create(data: any) {
    //this.userRepo.save(data);
    this.blogs.push(data);
  }

  findData(): Promise<any[]> {
    return this.userRepo.find();
    //return this.blogs;
  }
}
