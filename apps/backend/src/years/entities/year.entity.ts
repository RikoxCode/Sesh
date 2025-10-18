export class YearEntity {
  id: string;
  year: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<YearEntity>) {
    Object.assign(this, partial);
  }
}
