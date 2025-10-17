import { PrismaService } from '../../prisma/prisma.service';
import { UsermetaEntity } from '../..//usermetas/entities/usermeta.entity';
import { UsermetasService } from '../..//usermetas/usermetas.service';

export class UserEntity {
  private static usermetasService: UsermetasService;

  static init(service: UsermetasService) {
    UserEntity.usermetasService = service;
  }

  id: string;
  firstName: string;
  lastName: string;
  abbreviation: string;
  email: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  usermetas?: UsermetaEntity[];

  constructor(partial: Partial<UserEntity>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete partial.password;
    Object.assign(this, partial);
  }

  static async withMetas(user: Partial<UserEntity>): Promise<UserEntity> {
    UserEntity.init(new UsermetasService(new PrismaService()));
    if (!UserEntity.usermetasService) {
      throw new Error('UserEntity not initialized: call UserEntity.init()');
    }
    const u = new UserEntity(user);
    u.usermetas = await UserEntity.usermetasService.getUsermetasByUserId(u.id);
    return u;
  }
}
