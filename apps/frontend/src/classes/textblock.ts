import { Section } from './section';

export class Textblock {
  private id: string = '';
  private section: Section = new Section();
  private position: number = 0;
  private source: string = '';

  private text: string = '';
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

  setText(text: string) {
    this.text = text;
  }

  getId() {
    return this.id;
  }
}
