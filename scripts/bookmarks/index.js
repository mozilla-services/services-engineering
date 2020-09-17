const argv = require('yargs').argv;

const BookmarkCounter = require('./counter');
const BookmarkGenerator = require('./generator');

// // default is to count bookmarks, ie -g for generate
if (argv['g'] !== true) {
  const bookmarkHelper = new BookmarkCounter();
  console.info('bookmarks:', bookmarkHelper.bookmarkCount);
  console.info('folders:', bookmarkHelper.folderCount);
  console.info('dataset size:', bookmarkHelper.size);
  return;
}

// otherwise, we generate them.
new BookmarkGenerator();
