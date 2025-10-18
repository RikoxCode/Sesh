import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsermetasModule } from './usermetas/usermetas.module';
import { RolesModule } from './roles/roles.module';
import { ProjectsModule } from './projects/projects.module';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    UsermetasModule,
    RolesModule,
    ProjectsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {}
