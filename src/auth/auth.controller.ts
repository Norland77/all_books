import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { IToken } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Cookie, UserAgent, Public } from '../../libs/common/src/decorators';
import { GoogleGuard } from './guards/google.guard';
import { HttpService } from '@nestjs/axios';
import { mergeMap } from 'rxjs';
import { handlerTimeoutAndErrors } from '../../libs/common/src/helpers';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    if (!user) {
      throw new BadRequestException(
        `Can't register user with data ${JSON.stringify(dto)}`,
      );
    }
    return user;
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const token = await this.authService.login(dto, agent);
    if (!token) {
      throw new BadRequestException(
        `Can't login user with data ${JSON.stringify(dto)}`,
      );
    }
    this.setRefreshTokenToCookies(token, res);
  }

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.logout(refreshToken);
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh-tokens')
  async refreshToken(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const string = '';
    if (typeof refreshToken !== typeof string) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.refreshTokens(refreshToken, agent);
    if (!token) {
      throw new UnauthorizedException();
    }
    this.setRefreshTokenToCookies(token, res);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  googleAuth() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    // @ts-ignore
    const token = req.user['accessToken'];
    return res.redirect(
      `http://localhost:3000/api/auth/success?token=${token}`,
    );
  }

  @Get('success')
  success(@Query('token') token: string, @UserAgent() agent: string) {
    return this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      )
      .pipe(
        mergeMap(({ data: { email } }) =>
          this.authService.googleAuth(email, agent),
        ),
        handlerTimeoutAndErrors(),
      );
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
