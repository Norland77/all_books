import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { IToken } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Cookie } from '../../libs/common/src/decorators';

const REFRESH_TOKEN = 'refreshtoken';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    if (!user) {
      throw new BadRequestException(
        `Can't register user with data ${JSON.stringify(dto)}`,
      );
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(dto);

    if (!token) {
      throw new BadRequestException(
        `Can't login user with data ${JSON.stringify(dto)}`,
      );
    }
    this.setRefreshTokenToCookies(token, res);
  }

  @Get('refresh-tokens')
  async refreshToken(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    const string = '';
    if (typeof refreshToken !== typeof string) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.refreshTokens(refreshToken);
    if (!token) {
      throw new UnauthorizedException();
    }
    this.setRefreshTokenToCookies(token, res);
  }

  private setRefreshTokenToCookies(tokens: IToken, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
