const argv = require('yargs').argv;

const BookmarkCounter = require('./counter');
const BookmarkGenerator = require('./generator');


// // default is to count bookmarks, ie -g for generate
if (argv['g'] !== true) {
  const bookmarkHelper = new BookmarkCounter();
  console.log('bookmarks:', bookmarkHelper.bookmarkCount);
  console.log('folders:', bookmarkHelper.folderCount);
  console.log('dataset size:', bookmarkHelper.size);
  return;
}

// otherwise, we generate them.
const bookmarkHelper = new BookmarkGenerator();
