import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneWithPassword(condition: Partial<User>): Promise<User> {
    let query: SelectQueryBuilder<User> =
      this.userRepository.createQueryBuilder('user');

    query = query.where(condition);

    query = query.addSelect('user.password');

    return query.getOne();
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  //
  // findAll() {
  //   return `This action returns all users`;
  // }
  //
  // findOneBy(condition: any) {
  //   return `This action returns a #${id} user`;
  // }
  //
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
