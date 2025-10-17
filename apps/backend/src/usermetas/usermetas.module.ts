import { Module } from '@nestjs/common';

import { UsermetasController } from './usermetas.controller';
import { UsermetasService } from './usermetas.service';

@Module({
  controllers: [UsermetasController],
  providers: [UsermetasService],
})
export class UsermetasModule {}
