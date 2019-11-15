# Bookmark Helper Scripts

Count and anonymize bookmarks for your Firefox accounts, to help with debugging bookmark related issues.

## Usage

- Make sure you have [node](https://nodejs.org/en/) installed.
- $ `npm i` - install dependencies.
- [Export](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them) your Firefox bookmarks as JSON.
- Then replace the [bookmarks/samples/default.json](https://github.com/mozilla-services/services-engineering/blob/task/add-bookmark-debugging-script/scripts/bookmarks/samples/default.json) file with your bookmarks.
- \$ `node scripts/bookmarks/` - this will give you total folder and bookmark count.
- \$ `node scripts/bookmarks/ --anon` - this will give you total folder and bookmark count AND create an anonymized copy for you to use called `anonymized_bookmarks.json`.
