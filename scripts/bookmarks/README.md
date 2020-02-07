# Bookmark Helper Scripts

Count and anonymize bookmarks for your Firefox accounts, to help with debugging bookmark related issues.

## Usage

- Make sure you have [node](https://nodejs.org/en/) installed.
- $ `npm i` - install dependencies.
- [Export](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them) your Firefox bookmarks as JSON.
- Then replace the [bookmarks/samples/default.json](https://github.com/mozilla-services/services-engineering/blob/task/add-bookmark-debugging-script/scripts/bookmarks/samples/default.json) file with your bookmarks.
- \$ `node scripts/bookmarks/` - this will give you details around dataset size and bookmark + folder counts.
- \$ `node scripts/bookmarks/ --anon` - this will give dataset size info, bookmark + folder counts AND create an anonymized copy for you to use called `anonymized_bookmarks.json`. Note: some folders and bookmarks are hidden so while you will note each anonymized folder + bookmark is given a unique numeric suffix, you might be missing a few of them if you import into the browser. This is expected.

## About Dataset Sizes

It's worth noting that the dataset sizes for the sample JSON files that you can [import/export within Firefox](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them) are different that the actual sizes that are stored on the sync backend. This is due to the fact that the data is encrypted and stored using a different schema that what you'll see in the JSON files used for importing/exporting bookmarks.

The actual data stored in the bso table winds up being roughly **1.7x larger** than the size of the JSON files here. You can measure this difference locally by creating a new FF profile, and connecting to a local syncstorage or syncstorage-rs instance. Import one of the sample JSON files, and then run `mysql -h {DH_HOST} -u {DB_USER} -p {DB_NAME} -e "SELECT userid, COUNT(*), collection, sum(payload_size) FROM bso GROUP BY userid, collection" > bso_sizes.txt` replacing DB_HOST, DB_USER, and DB_NAME with the appropriate values.


