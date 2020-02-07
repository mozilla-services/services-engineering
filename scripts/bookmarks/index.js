const path = require('path');
const filesize = require('filesize');
const defaultFilepath = path.resolve(__dirname, 'samples/default.json');
const bookmarksJson = require(defaultFilepath);
const argv = require('yargs').argv;
const fs = require('fs');


const fakeData = {
  iconuri: 'fake-favicon-uri:https://planet.mozilla.org/',
  keyword: 'mdn',
  titles: {
    folder: 'topSecretFolder',
    bookmark: 'someBookmark'
  },
  uri: 'https://hacks.mozilla.org/',
};

class BookmarkHelper {
  constructor(bookmarksJson) {
    this.folderCount = 0;
    this.bookmarkCount = 0;
    this.collection = bookmarksJson;
    this.anonymize = argv.anon === true;
    this.size = this._getSize();

    this.collection = this._processByType(this.collection);
    if (this.collection.children) {
      this.collection.children = this.collection.children.map((item) => {
        return this._processChildren(item);
      });
    }

    if (this.anonymize) {
      const newFileName = 'anonymized_bookmarks.json';
      fs.writeFile(`./${newFileName}`, JSON.stringify(this.collection), (err) => {
        if (err) {
          console.error(err);
          return;
        };
        this.size = this._getSize(path.resolve(process.cwd(), `${newFileName}`));
        console.log(`Your bookmarks have been anonymized 😎. See ${newFileName}.`);
      });
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
        title: `${fakeData.titles.folder} ${this.folderCount}`,
      }
    }
    return folder;
  }

  __processBookmark(bookmark) {
    this.bookmarkCount++;
    if (this.anonymize) {
      bookmark = {
        ...bookmark,
        iconuri: fakeData.iconuri,
        keyword: fakeData.keyword,
        title: `${fakeData.titles.bookmark} ${this.bookmarkCount}`,
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

  _getSize(filepath = defaultFilepath) {
    const {
      size
    } = fs.statSync(filepath);
    return filesize(size);
  }
}

const bookmarkHelper = new BookmarkHelper(bookmarksJson);
console.log('bookmarks:', bookmarkHelper.bookmarkCount);
console.log('folders:', bookmarkHelper.folderCount);
console.log('dataset size:', bookmarkHelper.size);
