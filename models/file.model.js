import toBase64 from 'btoa';

import { DisplayInformation } from './display-information.model';

class File {
  constructor(name, options) {
    const { extension, content, initialWindowDimensions } = options;

    this.id = toBase64(`file.${name}.${extension}.${content}`);
    this.nameWithoutExtension = name;
    this.extension = extension;
    this.content = content;
    this.initialWindowDimensions = initialWindowDimensions;
    this.displayInformation = new DisplayInformation({
      dimensions: initialWindowDimensions,
    });
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
