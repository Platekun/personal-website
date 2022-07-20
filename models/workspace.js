function findTarget(fieName, items) {
  // Note: Only works for first level!
  const item = items.find((currentItem) => {
    return currentItem.name === fieName;
  });

  return item;
}

class Workspace {
  constructor(...items) {
    this.items = items;
  }

  get(targetName) {
    return findTarget(targetName, this.items);
  }
}

export { Workspace };
