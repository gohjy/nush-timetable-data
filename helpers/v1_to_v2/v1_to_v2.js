// Convert from V1 (single object per period)
// to V2 (array of objects). Generates CLASS.max.json
// for human-readable files, and CLASS.json for 
// minified files (e.g. 101.max.json and 101.json).
// JSON files are saved in a subdirectory of the 
// current directory (./v2-generated-{epoch time}).

const fs = require("fs");

function transformData(data) {
    data = {version: "2", ...data};
    for (let dayData of Object.keys(data.data)) {
        let thisData = data.data[dayData];
        for (let key of Object.keys(thisData)) {
            if (!key.match(/^p\d+$/)) continue;
            if (thisData[key].courseCode instanceof Array) {
                let datakeyx = [];
                for (let cc of thisData[key].courseCode) {
                    datakeyx.push({
                        courseCode: cc,
                        subject: thisData[key].subject
                    });
                }
                thisData[key] = datakeyx;
            } else if (thisData[key].subject.includes(",")) {
                let datakeyx = [];
                for (let subj of thisData[key].subject.split("/")) {
                    datakeyx.push({
                        courseCode: thisData[key].courseCode,
                        subject: subj
                    })
                }
                thisData[key] = datakeyx;
            } else thisData[key] = [thisData[key]];
        }
    }
    return data;
}

const folderName = `v2-generated-${Date.now()}`;
fs.mkdirSync(folderName);
fs.mkdirSync(folderName + "/class");
fs.mkdirSync(folderName + "/day");

const classList = [
    "101", "102", "103", "104", "105", "106",
    "201", "202", "203", "204", "205", "206",
    "301", "302", "303", "304", "305", "306", "307",
    "401", "402", "403", "404", "405", "406", "407",
    "501", "502", "503", "504", "305", "506", "507",
    "601", "602", "603", "604", "305", "606", "607"
];

const yPath = process.argv[2] || "2025s1";

for (let classId of classList) {
    for (let inter of ["", ".max"]) {
        const path = `${classId}${inter}.json`;
        try {
            let data = JSON.parse(fs.readFileSync(`../../${yPath}/class/${path}`));
            data = transformData(data);
            console.log("writing", path);

            fs.writeFileSync(`./${folderName}/class/${path}`, JSON.stringify(data, null, (inter === ".max" ? 2 : undefined)));
        } catch {
            console.warn("Failed to transform " + path + ", skipping");
        }
    }
}

const dayList = ["1", "2", "3", "4", "5"];

for (let dayId of dayList) {
    const path = `${dayId}.json`;
    try {
        let data = JSON.parse(fs.readFileSync(`../../${yPath}/day/${path}`));
        data = transformData(data);
        console.log("writing", path, "and minified");

        fs.writeFileSync(`./${folderName}/day/${path}`, JSON.stringify(data));
        fs.writeFileSync(`./${folderName}/day/${path.replace(/json$/,"max.json")}`, JSON.stringify(data, null, 2));
    } catch {
        console.warn("Failed to transform " + path + ", skipping")
    }
}