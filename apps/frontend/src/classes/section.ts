import { BaseChildHaving } from './BaseChildHavingClass';
import { Chapter } from './chapter';

export class Section extends BaseChildHaving {
  private id: string = '';
  private chapter: Chapter = new Chapter();
  private parent: Section | null = null;
  private position: number = 0;
  private title: string = '';
  private subtitle: string = '';
  private rating_checksum: string = '';

  constructor() {
    super();
  }

  setId(id: string) {
    this.id = id;
  }

  setParent(section: Section) {
    this.parent = section;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setPosition(position: number) {
    this.position = position;
  }

  setChapter(chapter: Chapter) {
    this.chapter = chapter;
  }

  setRatingChecksum(checksum: string) {
    this.rating_checksum = checksum;
  }

  getId() {
    return this.id;
  }
}
