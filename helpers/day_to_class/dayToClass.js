"use strict";

// Converts day-by-day data into class data.
// Intended to be run in a browser; copy-and-paste
// this whole script into a browser console AFTER
// defining the variables day1data through day5data
// with the JSON (object, not string) for each day
// respectively. The output will be a JSON-stringified
// representation of an input suitable for generateFiles.js
// (output is logged to the console).

day1data;
day2data;
day3data;
day4data;
day5data;

let classData = {};

let classList = [
    101, 102, 103, 104, 105, 106,
    201, 202, 203, 204, 205, 206,
    301, 302, 303, 304, 305, 306, 307,
    401, 402, 403, 404, 405, 406, 407,
    501, 502, 503, 504, 505, 506, 507,
    601, 602, 603, 604, 605, 606, 607
];

for (let classId of classList) {
    console.log(classId);
    const thisClassData = {};

    const thisClassDay = [
        null,
        day1data.data.find(x => x["class"] === classId),
        day2data.data.find(x => x["class"] === classId),
        day3data.data.find(x => x["class"] === classId),
        day4data.data.find(x => x["class"] === classId),
        day5data.data.find(x => x["class"] === classId)
    ]

    thisClassData.meta = {
        year: day1data.meta.year,
        sem: day1data.meta.sem,
        "class": classId
    };

    thisClassData.data = [{},{},{},{},{}];

    for (let [day, dayData] of Object.entries(thisClassDay)) {
        day = +day;
        if (Number.isNaN(day)) continue;
        if (!day) continue;
        console.log(day, dayData);

        for (let key of Object.keys(dayData)) {
            if (key.match(/^p\d{1,2}$/)) thisClassData.data[day-1][key] = dayData[key];
        }
        thisClassData.data[day-1].day = day;
    }

    classData[classId] = thisClassData;

    console.log("Finished class:", classId);
}

console.log(JSON.stringify(classData, null, 2));