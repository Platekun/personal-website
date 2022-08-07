import { DisplayInformation } from './display-information.model';

class Directory {
  constructor(name, options) {
    const { id, contents, initialWindowDimensions } = options;

    this.id = id;
    this.name = name;
    this.contents = contents;

    if (
      typeof initialWindowDimensions !== 'undefined' &&
      initialWindowDimensions !== null
    ) {
      this.displayInformation = new DisplayInformation({
        dimensions: initialWindowDimensions,
      });
    }
  }

  get initialDimensions() {
    return this.displayInformation.initialWindowDimensions;
  }

  get initialCoordinates() {
    return this.displayInformation.initialWindowCoordinates;
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
