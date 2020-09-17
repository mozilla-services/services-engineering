const path = require('path');
const defaultFilepath = path.resolve(__dirname, 'generated_bookmarks.json');
const helpers = require('./helpers');
const argv = require('yargs').argv;
const fs = require('fs');
const nanoid = require('nanoid').nanoid;

class BookmarkGenerator {
  constructor() {
    // ie, node scripts/bookmarks/ -g --count=25
    const bookmarksToAdd = parseInt(argv['count'], 10) || 10000; // 10k bookmarks is roughly 3MB before encryption

    console.info(`Creating a file with ${bookmarksToAdd} bookmarks...`);

    this.collection = helpers.EMPTY_BOOKMARK_COLLECTION;
    var counter = 0;
    while (counter < bookmarksToAdd) {
      this.collection.children[1].children.push(
        this.__createBookmarkJson(counter),
      ); // dump into toolbar
      counter++;
    }

    this.__writeFile();
    return this;
  }

  __createBookmarkJson(counter) {
    const timestamp = Date.now();
    const guid = nanoid(12);
    return {
      ...helpers.FAKE_BOOKMARK,
      dateAdded: timestamp,
      guid,
      id: counter,
      index: counter,
      lastModified: timestamp,
      title: `${helpers.FAKE_BOOKMARK.title} ${counter}`,
      uri: `${helpers.FAKE_BOOKMARK.uri}?guid=${guid}`,
    };
  }

  __writeFile() {
    fs.writeFile(defaultFilepath, JSON.stringify(this.collection), function (
      err,
    ) {
      if (err) {
        return console.error(err);
      }
      console.info(`Open ${defaultFilepath} to see your content`);
    });
  }
}

module.exports = BookmarkGenerator;
