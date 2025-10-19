export class GlossaryEntity {
  id: string;
  term: string;
  definition: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<GlossaryEntity>) {
    Object.assign(this, partial);
  }
}
