import { DisplayInformation } from './display-information.model';

class File {
  isSettingUp = true;
  isReady = false;

  constructor(name, options) {
    const { id, extension, content, initialWindowDimensions } = options;

    this.id = id;
    this.nameWithoutExtension = name;
    this.extension = extension;

    if (typeof content === 'function') {
      this.content = null;
      this.fetchContentFn = content;
    } else {
      this.content = content;
      this.fetchContentFn = null;
    }

    this.displayInformation = new DisplayInformation({
      dimensions: initialWindowDimensions,
    });

    if (typeof content !== 'function') {
      this.isReady = true;
      this.isSettingUp = false;
    }
  }

  async fetchContent() {
    if (!this.isSettingUp) {
      return;
    }

    this.content = await this.fetchContentFn();
    this.isSettingUp = false;
    this.isReady = true;
  }

  get initialDimensions() {
    return this.displayInformation.initialWindowDimensions;
  }

  get initialCoordinates() {
    return this.displayInformation.initialWindowCoordinates;
  }

  get name() {
    return `${this.nameWithoutExtension}.${this.extension}`;
  }
}

export { File };
