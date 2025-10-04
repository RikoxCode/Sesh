import { Image } from './Image';
import { Textblock } from './textblock';
import { Table } from './table';
import { Section } from './section';

export type SectionChild = Section | Image | Textblock | Table;

export class BaseChildHaving {
  protected childs: SectionChild[] = [];

  protected addChild(child: SectionChild) {
    this.childs.push(child);
  }

  protected updateChild(child: SectionChild) {
    const index = this.childs.findIndex((c) => c.getId() === child.getId());
    if (index >= 0) this.childs[index] = child;
  }

  protected deleteChild(child: SectionChild) {
    const index = this.childs.findIndex((c) => c.getId() === child.getId());
    if (index >= 0) this.childs.splice(index, 1);
  }
}
