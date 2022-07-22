import toBase64 from 'btoa';

class File {
  constructor(name, options) {
    const { extension, content, initialWindowDimensions } = options;

    this.id = toBase64(`file.${name}.${extension}.${content}`);
    this.nameWithoutExtension = name;
    this.extension = extension;
    this.content = content;
    this.initialWindowDimensions = initialWindowDimensions;
  }

  get name() {
    return `${this.nameWithoutExtension}.${this.extension}`;
  }
}

export { File };
