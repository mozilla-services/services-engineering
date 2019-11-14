const bookmarks = require('./sample_bookmarks.json');

console.log(bookmarks);

const getTotals = (bookmarks) => {
  let folderCount = 0;
  let itemCount = 0;

  // TODO, walk the tree of children and count 'em

  return {
    folderCount,
    itemCount
  }
};

const totals = getTotals(bookmarks);

console.log('totals: ', totals);