# nush-timetable-data
Collection of timetable data for NUSH in JSON format.

## Structure
(The `helpers` directory contains some utility scripts for preparing the data.)

Each directory in the `v2` folder is named after the corresponding year/semester, so `2025s1` contains the files for year 2025, semester 1.

Inside each such directory there may be two folders: `day` and `class`.

Unfortunately there is currently no proper definition for the structure of the data, and we hope to introduce this soon as appropriate.

### `day` data
These directories contain the data for each day of the week. The data files are named `1.json` through `5.json`, 1 being Monday and 5 being Friday.

### `class` data
These directories contain data for each class. There is one file for each class (`101.json`, `102.json` etc).

### Common files
Both `day` and `class` directories share some common files:
- `CREDITS.txt` has data about where the data was sourced from, as well as potential usage notes. 
- `source.zip` (or similarly named file(s)) **may** exist, and if so, it is a compressed file of the source(s) the data was taken from.

### `v1` vs `v2`
**Only `v2` data will be updated from now on.** `v2` introduced a change in the structure to allow for proper separation of course options. `v1` data is only fully available for `2025s1`. Please only use `v2` data.

## Notes
This repo is purposely not hosted on GitHub Pages - you are strongly encouraged to either download and include the files in your project directly or use a CDN to access the files.

Currently, there is a work-in-progress list for values of the `subject` field in `SUBJECT_CODES.md`. In the future, the standard may include course codes for cross reference with [nush-pos-data](https://github.com/gohjy/nush-pos-data) as well.

## Extra files (in `helpers` directory)
`json_convert.js` is a utility function for the preparation of the data (post-CSV to JSON conversion) into the format used by the data files. See the file for more info.

The files in `helpers/day_to_class` convert data in `day` format to `class` format (provided a full and comprehensive `day` data set). See the files for more info.

`helpers/v1_to_v2` converted `v1` data to `v2` data. See the file for more info.

## License
So technically the data isn't mine because the timetables are the school's...

...but data in itself can't be copyrighted, because copyright protects the **expression** of ideas and data, not the ideas or data itself.

So I don't actually know if I can license this, but until I get a definitive answer, just assume that the license I'll be using if I discover that I can, in fact, license this will be the [MIT license](https://choosealicense.com/licenses/mit/).

(Actually, it's probably public domain in any case, but I don't have a good answer yet so...)