import fs from "node:fs/promises";
import path from "node:path";

import periodToSubject from "./periodToSubject.js";

const VERSION_KEY_PERIOD = "3-day-period";
const VERSION_KEY_SUBJECT = "3-day-subject";

const READ_FILE_PATH = "./v3/raw/";
const WRITE_FILE_PATH = "./v3/dist/";

async function main() {
    let filenames = await fs.readdir(READ_FILE_PATH, { recursive: true });

    let pathRegExp = new RegExp(`^\\d{4}s(1|2)\\${path.sep}class\\${path.sep}`);

    filenames = filenames.filter(x => x.match(pathRegExp));

    filenames = Object.groupBy(filenames, filename => filename.split(path.sep)[0]);

    filenames = Object.entries(filenames);

    for (let [index, [folder, files]] of filenames.entries()) {
        let days = {};

        let metaInfo = (() => {
            let [, year, sem] = folder.match(/^(\d{4})s(1|2)$/);
            return { year, sem };
        })();

        for (let file of files) {
            let contents = await fs.readFile(path.join(READ_FILE_PATH, file));
            contents = JSON.parse(contents);

            let classId = contents.meta.class;

            for (let dataElem of contents.data) {
                let dayId = dataElem.day;
                if (!days[dayId]) {
                    days[dayId] = {
                        version: VERSION_KEY_PERIOD,
                        meta: {
                            ...metaInfo,
                            day: dayId
                        },
                        data: []
                    };
                }

                let insertData = { class: classId, ...dataElem };
                delete insertData.day;

                days[dayId].data.push(insertData);
            }
        }

        let writeFilePath = path.join(WRITE_FILE_PATH, folder, "day");
        await fs.mkdir(writeFilePath, { recursive: true });

        for (let [key, value] of Object.entries(days)) {
            await fs.writeFile(
                path.join(writeFilePath, `${key}.period.json`),
                JSON.stringify(value)
            );
            await fs.writeFile(
                path.join(writeFilePath, `${key}.subject.json`),
                JSON.stringify(periodToSubject(value, { version: VERSION_KEY_SUBJECT }))
            );
        }
            
        console.log(`${folder} done - ${files.length} class data processed (${index + 1}/${filenames.length})`);
    }

    console.log("Done!");
}

export default main;
