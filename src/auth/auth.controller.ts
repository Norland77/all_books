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
import { map, mergeMap } from 'rxjs';
import { handlerTimeoutAndErrors } from '../../libs/common/src/helpers';

const REFRESH_TOKEN = 'refreshtoken111';

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

  @UseInterceptors(ClassSerializerInterceptor)
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
    this.setrefreshtoken111ToCookies(token, res);
  }

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
    @Res() res: Response,
  ) {
    if (!refreshtoken111) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.logout(refreshtoken111);
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh-tokens')
  async refreshtoken111(
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const string = '';
    if (typeof refreshtoken111 !== typeof string) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.refreshtoken111s(refreshtoken111, agent);
    if (!token) {
      throw new UnauthorizedException();
    }
    this.setrefreshtoken111ToCookies(token, res);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  googleAuth() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const token = req.user['accessToken'];
    return res.redirect(
      `http://localhost:3000/api/auth/success?token=${token}`,
    );
  }

  @Get('success')
  success(
    @Query('token') token: string,
    @UserAgent() agent: string,
    @Res() res: Response,
  ) {
    return this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      )
      .pipe(
        mergeMap(({ data: { email } }) =>
          this.authService.googleAuth(email, agent),
        ),
        map((data) => this.setrefreshtoken111ToCookies(data, res)),
        handlerTimeoutAndErrors(),
      );
  }

  private setrefreshtoken111ToCookies(tokens: IToken, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshtoken111.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshtoken111.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
