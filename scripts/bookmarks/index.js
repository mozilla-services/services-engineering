const bookmarksJson = require('./sample_bookmarks.json');

class BookmarkHelper {
  constructor(bookmarksJson) {
    this.folderCount = 0;
    this.bookmarkCount = 0;
    this.collection = bookmarksJson;
  }

  getTotals() {
    this._updateByTypeCode(this.collection);
    if (this.collection.children) {
      this.collection.children.forEach((item) => {
        this._countChildren(item);
      });
    }

    return {
      folderCount: this.folderCount,
      bookmarkCount: this.bookmarkCount
    }
  }

  _updateByTypeCode(item) {
    if (item.typeCode === 1) {
      this.bookmarkCount++;
    } else if (item.typeCode === 2) {
      this.folderCount++;
    }
  }

  _countChildren(item) {
    if (!item) {
      return;
    }

    this._updateByTypeCode(item);
    if (item.typeCode === 2) {
      if (!item.children) {
        return;
      }
      item.children.forEach((item) => {
        this._countChildren(item);
      });
    }
  }
}

const bookmarkHelper = new BookmarkHelper(bookmarksJson);
console.log(bookmarkHelper.getTotals());