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
import { Token, User } from '../../prisma/generated/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';

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

  async login(dto: LoginDto): Promise<IToken> {
    const user = await this.userService
      .findUserByEmail(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Wrong login or password');
    }
    return this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<IToken> {
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
    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<IToken> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.roleId,
      });

    const refreshToken = await this.getRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: number): Promise<Token> {
    return this.prismaService.token.create({
      data: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
      },
    });
  }
}
