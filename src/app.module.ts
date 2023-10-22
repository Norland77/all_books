import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GenderModule } from './gender/gender.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { BansModule } from './bans/bans.module';
import { FollowModule } from './follow/follow.module';
import { GenreModule } from './genre/genre.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { AwardsModule } from './awards/awards.module';
import { ShelfModule } from './shelf/shelf.module';
import { BookModule } from './book/book.module';
import { UserBookModule } from './user-book/user-book.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsLikeDislikeModule } from './reviews-like-dislike/reviews-like-dislike.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { PrismaModule } from "@prisma/prisma.module";

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
    AuthorModule,
    PublisherModule,
    AwardsModule,
    ShelfModule,
    BookModule,
    UserBookModule,
    ReviewsModule,
    ReviewsLikeDislikeModule,
    ResetPasswordModule,
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
