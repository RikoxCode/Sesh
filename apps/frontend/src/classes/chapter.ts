import { BaseChildHaving } from './BaseChildHavingClass';

export class Chapter extends BaseChildHaving {
  private id: string = '';
  private title: string = '';
  private subtitle: string = '';
  private project_id: string = '';
  private type: string = '';

  constructor() {
    super();
  }

  setId(id: string) {
    this.id = id;
  }

  setProjectId(id: string) {
    this.project_id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setType(type: string) {
    this.type = type;
  }
}
