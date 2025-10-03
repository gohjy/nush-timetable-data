// convert V2/V3 period data to subject data

function periodIndexToTime(index) {
    let hours = 800 + Math.floor(index / 2) * 100;
    let minutes = (index * 30) % 60;
    return (hours + minutes).toString().padStart(4, "0");
}

function convert(content) {
    let output = {
        version: "3-subject",
        meta: { ...content.meta },
        data: []
    };

    for (let dayData of content.data) {
        let outputDayData = {
            day: dayData.day,
            "class": dayData.class,
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

        let last = outputDayData.subjects.at(-1).lessons;
        let lastEvery = last.every.bind(last);
        if (lastEvery(x => x.courseCode === "") && lastEvery(x => x.subject === "")) {
            outputDayData.subjects.splice(outputDayData.subjects.length - 1, 1);
        }

        output.data.push(outputDayData);
    }

    return output;
}

export default convert;
