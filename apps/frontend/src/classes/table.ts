import { Section } from './section';

export class Table {
  private id: string = '';
  private section: Section = new Section();
  private position: number = 0;
  private source: string = '';

  private markdown_table: string = '';
  private heading: string = '';

  constructor() {}

  setId(id: string) {
    this.id = id;
  }

  setSection(section: Section) {
    this.section = section;
  }

  setPosition(position: number) {
    this.position = position;
  }

  setSource(source: string) {
    this.source = source;
  }

  setHeading(heading: string) {
    this.heading = heading;
  }

  setMarkdownTable(table: string) {
    this.markdown_table = table;
  }

  getId() {
    return this.id;
  }
}
