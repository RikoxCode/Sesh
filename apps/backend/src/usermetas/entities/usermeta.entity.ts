export class UsermetaEntity {
  id: string;
  userId: string;
  metaKey: string;
  metaValue: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UsermetaEntity>) {
    Object.assign(this, partial);
  }
}
