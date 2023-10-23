import {
  BadRequestException,
  Controller,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { IToken } from './interfaces';
import { Provider, Token } from '../../prisma/generated/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { IUser } from './interfaces/IUser';

@Controller('user')
export class AuthRepository {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}
  private readonly logger = new Logger(AuthService.name);
  async register(dto: RegisterDto) {
    const user = await this.userService.getUserByName(dto.username, dto.email);

    if (user) {
      throw new BadRequestException('This username or email is already in use');
    }
    return this.userService.createUser(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: LoginDto, agent: string): Promise<IToken> {
    const user = await this.userService
      .findUserByEmail(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Wrong login or password');
    }
    return this.generateTokens(user, agent);
  }

  logout(refreshToken: string) {
    return this.prismaService.token.delete({ where: { token: refreshToken } });
  }

  async refreshTokens(refreshToken: string, agent: string): Promise<IToken> {
    const token = await this.prismaService.token.findUnique({
      where: { token: refreshToken },
    });
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.prismaService.token.delete({
      where: { token: refreshToken },
    });
    if (new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findUserById(token.userId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.generateTokens(user, agent);
  }

  private async generateTokens(user: IUser, agent: string): Promise<IToken> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

    const refreshToken = await this.getRefreshToken(user.id, agent);

    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string, agent: string): Promise<Token> {
    const _token = await this.prismaService.token.findFirst({
      where: {
        userId: userId,
        userAgent: agent,
      },
    });
    const token = _token?.token ?? '';
    return this.prismaService.token.upsert({
      where: { token },
      update: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }

  async googleAuth(email: string, agent: string) {
    const userExist = await this.userService.findUserByEmail(email);

    if (userExist) {
      return this.generateTokens(userExist, agent);
    }
    const user = await this.userService
      .createUser({
        username: email,
        email,
        genderName: 'Ніякий',
        provider: Provider.GOOGLE,
      })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user) {
      throw new BadRequestException(
        `Failed to create user with email: ${email} in GoogleAuth`,
      );
    }
    return this.generateTokens(user, agent);
  }
}
