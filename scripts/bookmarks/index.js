const bookmarksJson = require('./samples/default.json');
const argv = require('yargs').argv;
const fs = require('fs');

const fakeData = {
  guid: 'HFg2eqp1XVX4',
  iconuri: 'fake-favicon-uri:https://planet.mozilla.org/',
  keyword: 'mdn',
  timestamp: 1573830170,
  title: 'topSecret',
  uri: 'https://hacks.mozilla.org/',
};

class BookmarkHelper {
  constructor(bookmarksJson) {
    this.folderCount = 0;
    this.bookmarkCount = 0;
    this.collection = bookmarksJson;
    this.anonymize = argv.anon === true;
  }

  init() {
    this.collection = this._processByType(this.collection);
    if (this.collection.children) {
      this.collection.children = this.collection.children.map((item) => {
        return this._processChildren(item);
      });
    }

    if (this.anonymize) {
      fs.writeFile("./anonymized_bookmarks.json", JSON.stringify(this.collection), (err) => {
        if (err) {
          console.error(err);
          return;
        };
        console.log("Your bookmarks have been anonymized 😎");
      });
    }

    return {
      folderCount: this.folderCount,
      bookmarkCount: this.bookmarkCount
    }
  }

  _processByType(item) {
    if (item.typeCode === 1) {
      item = this.__processBookmark(item);
    } else if (item.typeCode === 2) {
      item = this.__processFolder(item);
    }
    return item;
  }

  __processFolder(folder) {
    this.folderCount++;
    if (this.anonymize) {
      folder = {
        ...folder,
        dateAdded: fakeData.timestamp,
        guid: fakeData.guid,
        lastModified: fakeData.timestamp,
        title: fakeData.title,
      }
    }
    return folder;
  }

  __processBookmark(bookmark) {
    this.bookmarkCount++;
    if (this.anonymize) {
      bookmark = {
        ...bookmark,
        dateAdded: fakeData.timestamp,
        guid: fakeData.guid,
        iconuri: fakeData.iconuri,
        keyword: fakeData.keyword,
        lastModified: fakeData.timestamp,
        title: fakeData.title,
        uri: fakeData.uri,
      }
    }
    return bookmark;
  }

  _processChildren(item) {
    item = this._processByType(item);
    if (item.typeCode !== 2 || !item.children) {
      return item;
    }
    item.children = item.children.map((child) => {
      return this._processChildren(child);
    });
    return item;
  }
}

const bookmarkHelper = new BookmarkHelper(bookmarksJson);
console.log(bookmarkHelper.init());