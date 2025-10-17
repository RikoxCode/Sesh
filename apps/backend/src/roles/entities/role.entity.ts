export class RoleEntity {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
