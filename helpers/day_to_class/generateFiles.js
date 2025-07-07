// Node script to convert the output from dayToClass.js
// into files suitable to be put into the repo
// (nush-timetable-data). Generates CLASS.max.json
// for human-readable files, and CLASS.json for 
// minified files (e.g. 101.max.json and 101.json).
// JSON files are saved in a subdirectory of the 
// current directory (./{epoch time}-generated).

const fs = require("fs");

let allData = JSON.parse(fs.readFileSync("./allData.json"));

const now = Date.now();
const folderName = `${now}-generated`;
fs.mkdirSync(folderName);

for (let dataItem of Object.values(allData)) {
    const myClass = dataItem.meta["class"];
    const pathName = `${folderName}\\${myClass}.max.json`;
    const minPathName = `${folderName}\\${myClass}.json`;
    console.log(`Writing ${myClass} to ${pathName} (min ${minPathName})...`);
    fs.writeFileSync(pathName, JSON.stringify(dataItem, null, 2));
    fs.writeFileSync(minPathName, JSON.stringify(dataItem));
}
console.log("Done!");