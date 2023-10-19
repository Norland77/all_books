import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GenderModule } from './gender/gender.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { BansModule } from './bans/bans.module';
import { FollowModule } from './follow/follow.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    GenderModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BansModule,
    FollowModule,
    GenreModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
('');
