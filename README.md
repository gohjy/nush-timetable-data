# nush-timetable-data
Collection of timetable data for NUSH in JSON format.

## Structure
Each top-level directory is named after the corresponding year/semester, so `2025s1` contains the files for year 2025, semester 1.

Inside each top-level directory there may be two folders: `day` and `class`. (Note: as of writing, only `day` has been implemented.)

### `day` data
These directories contain the data for each day of the week. The data files are named `1.json` through `5.json`, 1 being Monday and 5 being Friday.

Example:
```json
{
  "meta": {
    "year": 2025, // year
    "sem": 1, // semester
    "day": 1 // day: 1-5, 1 being Monday
  },
  "data": [
    {
      "class": 101, // Class: 101, 102 etc
      // p1 is 0800-0830, p2 is 0830-0900 etc
      // Empty fields indicate empty or free periods
      "p1": {
        "subject": "EL" // "subject" field contains name of subject
      },
      "p2": {
        "subject": "EL"
      },
      "p3": {
        "subject": "EL"
      },
      "p4": {
        "subject": "MA"
      },
      "p5": {
        "subject": "MA"
      },
      "p6": {
        "subject": "RC"
      },
      "p7": {
        "subject": "BIO"
      },
      "p8": {
        "subject": "BIO"
      },
      "p9": {
        "subject": "BIO"
      },
      "p10": {
        "subject": "BIO"
      },
      "p11": {
        "subject": "LUN"
      },
      "p12": {
        "subject": "LUN"
      },
      "p13": {
        "subject": "PHYS"
      },
      "p14": {
        "subject": "PHYS"
      },
      "p15": {
        "subject": "CCE"
      },
      "p16": {
        "subject": "CCE"
      },
      "p17": {
        "subject": "CCA"
      },
      "p18": {
        "subject": "CCA"
      },
      "p19": {
        "subject": "CCA"
      },
      "p20": {
        "subject": "CCA"
      }
    }
  ]
}
```

### `class` data
These directories contain data for each class. There is one file for each class (`101.json`, `102.json` etc).

Example:
```json
{
  "meta": {
    "year": 2025, // Year
    "sem": 1, // Semester
    "class": 101 // Class as a number
  },
  "data": [
    {
      "day": 1, // Day: 1-5, 1 being Monday
      "p1": {
        "subject": "EL"
      },
      "p2": {
        "subject": "EL"
      },
      "p3": {
        "subject": "EL"
      },
      "p4": {
        "subject": "MA"
      },
      "p5": {
        "subject": "MA"
      },
      "p6": {
        "subject": "RC"
      },
      "p7": {
        "subject": "BIO"
      },
      "p8": {
        "subject": "BIO"
      },
      "p9": {
        "subject": "BIO"
      },
      "p10": {
        "subject": "BIO"
      },
      "p11": {
        "subject": "LUN"
      },
      "p12": {
        "subject": "LUN"
      },
      "p13": {
        "subject": "PHYS"
      },
      "p14": {
        "subject": "PHYS"
      },
      "p15": {
        "subject": "CCE"
      },
      "p16": {
        "subject": "CCE"
      },
      "p17": {
        "subject": "CCA"
      },
      "p18": {
        "subject": "CCA"
      },
      "p19": {
        "subject": "CCA"
      },
      "p20": {
        "subject": "CCA"
      }
    }
  ]
}
```

### Common files
Both `day` and `class` directories share some common files:
- `CREDITS.txt` has data about where the data was sourced from, as well as potential usage notes. 
- `source.zip` (or similarly named file(s)) **may** exist, and if so, it is a compressed file of the source(s) the data was taken from.

## Notes
This repo is purposely not hosted on GitHub Pages - you are strongly encouraged to either download and include the files in your project directly or use a CDN to access the files.

## License
So technically the data isn't mine because the timetables are the school's...

...but data in itself can't be copyrighted, because copyright protects the **expression** of ideas and data, not the ideas or data itself.

So I don't actually know if I can license this, but until I get a definitive answer, just assume that the license I'll be using if I discover that I can, in fact, license this will be the [MIT license](https://choosealicense.com/licenses/mit/).