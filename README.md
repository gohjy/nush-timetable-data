# nush-timetable-data
Collection of timetable data for NUSH in JSON format.

## Structure
`v3/raw` contains raw data for editing and contribution. This is converted by `build/index.js` to `v3/dist` data meant for consumption.

### `day` data
These directories contain the data for each day of the week. The data files are named `1.json` through `5.json`, 1 being Monday and 5 being Friday.

### `class` data
These directories contain data for each class. There is one file for each class (`101.json`, `102.json` etc).

Both `day` and `class` data in `v3/dist` contain `.period.json` and `.subject.json` files. Generally, `.subject.json` is better for application use as it splits the day up by lessons, rather than `.period.json` which splits the day up by each period. 

### Versioning
Currently, the `tt-data` format is on V3 and all data that existed in V2 format has been ported over. The V3 format includes both `period` and `subject` formats for easier parsing, automated data compilation and building, and more improvements. **Only V3 data is being updated.**

## Compiling and building data
Run `build/index.js` in Node. This will:
- read all JSON files from `v3/raw`
- convert them to `.period.json` and `.subject.json` files
- write the converted and minifed files to `v3/dist`

## Notes
This repo is purposely not hosted on GitHub Pages - you are strongly encouraged to either download and include the files in your project directly or use a CDN to access the files.

Currently, there is a work-in-progress list for values of the `subject` field in `SUBJECT_CODES.md`.

## Extra files (in `helpers` directory)
> [!WARNING]
> All `helpers` files are designed for specialised use, most of them for single-use only. They are left inside in case I ever need them again, but **you should not use them unless you know what you are doing**. Proceed with caution.

`helpers/json_convert.js` is a utility function for the preparation of the data (post-CSV to JSON conversion) into the format used by the data files. See the file for more info.

The files in `helpers/day_to_class` convert data in `day` format to `class` format (provided a full and comprehensive `day` data set). See the files for more info.

`helpers/v1_to_v2` converted `v1` data to `v2` data. See the file for more info.

`helpers/v2_to_v3.js` renamed `v2` data (with slight edits) to `v3` data. See the file for more info.

## License
So technically the data isn't mine because the timetables are the school's...

...but data in itself can't be copyrighted, because copyright protects the **expression** of ideas and data, not the ideas or data itself.

So I don't actually know if I can license this, but until I get a definitive answer, just assume that the license I'll be using if I discover that I can, in fact, license this will be the [MIT license](https://choosealicense.com/licenses/mit/).

(Actually, it's probably public domain in any case, but I don't have a good answer yet so...)
