const path = require('path');
const filesize = require('filesize');
const argv = require('yargs').argv;
const fs = require('fs');
const defaultFilepath = path.resolve(__dirname, 'samples/default.json');
const bookmarksJson = require(defaultFilepath);
const helpers = require('./helpers');

class BookmarkCounter {
  constructor() {
    this.folderCount = 0;
    this.bookmarkCount = 0;
    this.collection = bookmarksJson;
    this.mockData = argv.mock === true;
    this.size = this._getSize();

    this.collection = this._processByType(this.collection);
    if (this.collection.children) {
      this.collection.children = this.collection.children.map((item) => {
        return this._processChildren(item);
      });
    }

    if (this.mockData) {
      const newFileName = 'mocked_bookmarks.json';
      fs.writeFile(
        `./${newFileName}`,
        JSON.stringify(this.collection),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          this.size = this._getSize(
            path.resolve(process.cwd(), `${newFileName}`),
          );
          console.info(
            `Your bookmarks have been replaced with sample values 😎. All urls, titles, keywords, and icon uris have been replaced. See ${newFileName}.`,
          );
        },
      );
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
        title: `topSecretFolder ${this.folderCount}`,
      };
    }
    return folder;
  }

  __processBookmark(bookmark) {
    this.bookmarkCount++;
    if (this.anonymize) {
      bookmark = {
        ...bookmark,
        iconuri: helpers.FAKE_BOOKMARK.iconuri,
        keyword: helpers.FAKE_BOOKMARK.keyword,
        title: `topSecretBookmark ${this.bookmarkCount}`,
        uri: helpers.FAKE_BOOKMARK.uri,
      };
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
    const { size } = fs.statSync(filepath);
    return filesize(size);
  }
}

module.exports = BookmarkCounter;
