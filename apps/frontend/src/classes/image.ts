import { Section } from './section';

export class Image {
  private id: string = '';
  private section: Section = new Section();
  private position: number = 0;
  private source: string = '';

  private image: BinaryType = 'arraybuffer';
  private description: string = '';

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

  setDescription(description: string) {
    this.description = description;
  }

  setImage(imagedata: BinaryType) {
    this.image = imagedata;
  }

  getId() {
    return this.id;
  }
}
