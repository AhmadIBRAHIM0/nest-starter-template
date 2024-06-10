import { ApiProperty } from '@nestjs/swagger';

export class LoginModel {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;
}

export class TokenModel {
  @ApiProperty({ type: String })
  token: string;
}
