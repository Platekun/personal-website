import { v4 as uuid } from 'uuid';

class Record {
  id = uuid();
  __typename = 'ContentRecord';

  constructor({ tag, content }) {
    this.tag = tag;
    this.content = content;
  }

  toJSON() {
    return {
      __typename: this.__typename,
      id: this.id,
      tag: this.tag,
      content: this.content,
    };
  }
}

class CollectionItem {
  id = uuid();
  __typename = 'CollectionRecordItem';

  constructor({ tag, content }) {
    this.tag = tag;
    this.content = content;
  }

  toJSON() {
    return {
      __typename: this.__typename,
      id: this.id,
      tag: this.tag,
      content: this.content,
    };
  }
}

class Collection {
  id = uuid();
  __typename = 'CollectionRecord';

  constructor({ tag, items }) {
    this.tag = tag;
    this.collection = items.map(
      (item) => new CollectionItem({ tag, content: item })
    );
  }

  toJSON() {
    return {
      __typename: this.__typename,
      id: this.id,
      tag: this.tag,
      collection: this.collection.map((item) => item.toJSON()),
    };
  }
}

class Version {
  constructor(tag) {
    this.tag = tag;
  }

  createRecord(...content) {
    return new Record({ tag: this.tag, content });
  }

  createCollection(...items) {
    return new Collection({ tag: this.tag, items });
  }
}

export { Version };
