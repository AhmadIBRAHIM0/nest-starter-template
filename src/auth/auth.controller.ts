import {
  Controller,
  Post,
  Req,
  UseGuards,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import { LoginModel, TokenModel } from './dto/auth.models';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ operationId: 'login', summary: 'Login to a service account' })
  @ApiBody({
    type: LoginModel,
    description: 'The Description for the Post Body',
    examples: {
      a: {
        summary: 'Login Body',
        description: 'Login is used for authenticate service',
        value: {
          email: 'example@test.com',
          password: 'passw0rd',
        } as LoginModel,
      },
    },
  })
  @ApiOkResponse({
    description: 'User logged in',
    schema: {
      type: 'tokenModel',
      example: {
        token: 'JWT_TOKEN',
      } as TokenModel,
    },
  })
  @Version(VERSION_NEUTRAL)
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
