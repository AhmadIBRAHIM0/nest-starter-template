import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { IPayload } from '../types/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, _password: string): Promise<any> {
    const user: User = await this.usersService.findOneWithPassword({ email });
    if (!user)
      throw new UnauthorizedException('User with this email does not exist');

    const hashedPassword: string = await bcrypt.hash(_password, user.salt);

    if (!(user.password === hashedPassword)) {
      throw new UnauthorizedException('Password is incorrect');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return userData;
  }

  login(user: User): { token: string } {
    const payload: IPayload = {
      email: user.email,
      sub: user.id,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles.map((role) => role.name),
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
