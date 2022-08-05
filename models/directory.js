import toBase64 from 'btoa';

class Directory {
  constructor(name, options) {
    const { contents, initialWindowDimensions } = options;

    this.id = toBase64(
      `directory.${name}.${contents
        .map((fileOrDirectory) => fileOrDirectory.id)
        .join('+')}`
    );
    this.name = name;
    this.contents = contents;

    if (
      typeof initialWindowDimensions !== 'undefined' &&
      initialWindowDimensions !== null
    ) {
      this.initialWindowDimensions = initialWindowDimensions;
    }
  }

  setWindowCoordinates(value) {
    this.initialWindowCoordinates = value;
  }

  search(id) {
    if (this.id === id) {
      return this;
    }

    for (const currentFileOrDirectory of this.contents) {
      if (currentFileOrDirectory instanceof Directory) {
        const searchResult = currentFileOrDirectory.search(id);

        if (searchResult !== null) {
          return searchResult;
        }
      }

      if (currentFileOrDirectory.id === id) {
        return currentFileOrDirectory;
      }
    }

    return null;
  }
}

export { Directory };
