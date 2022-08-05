class DisplayInformation {
  constructor({ dimensions }) {
    this.initialWindowDimensions = dimensions;
  }

  // TODO: One could ellaborate a proper method to compute a random (x, y) taking into account the dimensions of each file's window.
  get initialWindowCoordinates() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    return {
      x: width / 3,
      y: height / 5,
    };
  }
}

export { DisplayInformation };
