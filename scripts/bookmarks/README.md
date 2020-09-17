# Bookmark Helper Scripts

Count and/or generate bookmarks for your Firefox accounts, to help with debugging bookmark related issues.

## Usage

- Make sure you have [node](https://nodejs.org/en/) installed.
- $ `npm i` - install dependencies.

### Counting
- [Export](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them) your Firefox bookmarks as JSON.
- Then replace the [bookmarks/samples/default.json](https://github.com/mozilla-services/services-engineering/blob/task/add-bookmark-debugging-script/scripts/bookmarks/samples/default.json) file with your bookmarks.
- \$ `node scripts/bookmarks/` - this will give you details around dataset size and bookmark + folder counts.
- \$ `node scripts/bookmarks/ --mock` - this will give dataset size info, bookmark + folder counts AND create an fresh copy for you to use called `mocked_bookmarks.json` which will replace your data with example data. Note: some folders and bookmarks are hidden so while you will note each new mock folder + bookmark is given a unique numeric suffix, you might be missing a few of them if you import into the browser. This is expected.

### Generating
- \$ `node scripts/bookmarks/ -g` - This will default to generating a JSON file with 10k bookmarks (which is roughly 3MB pre-encryption).
  - If you want, you can pass a `--count` flag, to generate a specific number of bookmarks. For example, `$ node scripts/bookmarks/ -g --count=500` to generate 500 bookmarks.
- Now, [import](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them) your generated bookmarks as JSON.

## About Dataset Sizes

It's worth noting that the dataset sizes for the sample JSON files that you can [import/export within Firefox](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them) are different that the actual sizes that are stored on the sync backend. This is due to the fact that we base 64 encode the encrypted bytes to store them in a JSON object; it makes the stored objects notably larger that the source JSON bookmark files you'll see here in /samples.

The actual data stored in the bso table winds up being roughly **1.7x larger** than the size of the JSON files here. You can measure this difference locally by creating a new FF profile, and connecting to a local syncstorage or syncstorage-rs instance. Import one of the sample JSON files, and then run `mysql -h {DH_HOST} -u {DB_USER} -p {DB_NAME} -e "SELECT userid, COUNT(*), collection, sum(payload_size) FROM bso GROUP BY userid, collection" > bso_sizes.txt` replacing DB_HOST, DB_USER, and DB_NAME with the appropriate values.


