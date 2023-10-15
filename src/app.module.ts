import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [PrismaModule, UserModule, RoleModule, GenderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
('');
