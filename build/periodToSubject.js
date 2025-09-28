// convert V2 period data to subject data
import fs from "node:fs/promises";
import path from "node:path";

function periodIndexToTime(index) {
    let hours = 800 + Math.floor(index / 2) * 100;
    let minutes = (index * 30) % 60;
    return (hours + minutes).toString().padStart(4, "0");
}

let filepaths = await fs.readdir("./v2", { recursive: true });
filepaths = filepaths
    .filter(x => x.match(new RegExp(`\\${path.sep}\\d{3}\\.max\\.json$`)))
    .sort()
    .map(thispath => path.join("./v2", thispath));

for (let [fileIndex, filepath] of filepaths.entries()) {
    let content = await fs.readFile(filepath);
    content = JSON.parse(content);
    let output = {
        version: "2-subject",
        meta: { ...content.meta },
        data: []
    };

    for (let dayData of content.data) {
        let outputDayData = {
            day: dayData.day,
            subjects: []
        };

        let lessonData = Object.entries(dayData)
            .filter(([key]) => key.match(/^p\d+$/))
            .sort(([a], [b]) => a.match(/\d+$/)[0] - b.match(/\d+$/)[0])
            .map(([, value]) => value)
            .map(value => value.sort((a, b) => {
                if (a.courseCode > b.courseCode) return 1;
                if (a.courseCode < b.courseCode) return -1;
                if (a.subject > b.subject) return 1;
                if (a.subject < b.subject) return -1;
                return 0;
            }));

        outerLoop: for (let [index, item] of lessonData.entries()) {
            let addData = {
                duration: 1,
                start: {
                    oneIndex: index + 1,
                    time: periodIndexToTime(index)
                },
                end: {
                    oneIndex: (index + 1) + 1,
                    time: periodIndexToTime(index + 1)
                },
                lessons: [...item]
            };

            if (outputDayData.subjects.length === 0) {
                // first item
                outputDayData.subjects.push(addData);
                continue;
            }

            let prevObj = outputDayData.subjects.at(-1);
            let prevItem = prevObj.lessons;

            // if the lengths aren't equal, they're different
            if (prevItem.length !== item.length) {
                outputDayData.subjects.push(addData);
                continue;
            }

            // cycle through each item
            for (let i=0; i<item.length; i++) {
                if (
                    (item[i].courseCode !== prevItem[i].courseCode)
                    || (item[i].subject !== prevItem[i].subject)
                ) {
                    outputDayData.subjects.push(addData);
                    continue outerLoop;
                }
            }

            // if not, they're the same
            prevObj.duration++;
            prevObj.end.time = periodIndexToTime(prevObj.end.oneIndex++);
        }

        output.data.push(outputDayData);
    }

    let writeFilePath = filepath.replace(/\.max\.json$/, ".subject.json");
    await fs.writeFile(writeFilePath, JSON.stringify(output));

    console.log(`Wrote file ${writeFilePath.split(path.sep).slice(1).join("/")} (${fileIndex + 1}/${filepaths.length})`);
}

console.log("Done!");
