import fs from "node:fs/promises";
import path from "node:path";

import periodToSubject from "./periodToSubject.js";

const baseRawFolder = "v3/raw";
const baseDistFolder = "v3/dist";

function toPeriod(data) {
    let output = {...data};
    output.version = "3-period";
    return output;
}

async function convertFile(filepath) {
    try {
        let readPath = path.join(baseRawFolder, filepath);
        let content = JSON.parse(await fs.readFile(readPath, "utf-8"));

        if (!content.version?.match?.(/^3(\.\d+)*\-raw/)) {
            console.error(`Invalid content version: "${content.version}"`);
            return false;
        }

        let output = {
            period: JSON.stringify(toPeriod(content)),
            subject: JSON.stringify(periodToSubject(content))
        };

        let baseWriteFilePath = path.join(baseDistFolder, filepath);
        await fs.mkdir(path.dirname(baseWriteFilePath), { recursive: true });

        let writeFilePaths = {
            period: baseWriteFilePath.replace(/\.json$/, ".period.json"),
            subject: baseWriteFilePath.replace(/\.json$/, ".subject.json")
        };

        await fs.writeFile(writeFilePaths.period, output.period);
        await fs.writeFile(writeFilePaths.subject, output.subject);

        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}

async function main() {
    let allFiles = await fs.readdir(baseRawFolder, { recursive: true });
    allFiles = allFiles.filter(pathname => {
        let filename = pathname.split(path.sep).pop();
        if (!filename.match(/^\d+\.json$/)) return false;
        return true;
    }).sort();

    let failed = 0;

    for (let [index, entry] of allFiles.entries()) {
        let passed = await convertFile(entry);

        if (passed) {
            console.log(`Wrote file ${entry} successfully (${index + 1}/${allFiles.length})`);
        } else {
            console.log(`Failed to write file ${entry} (${index + 1}/${allFiles.length})`);
            failed++;
        }
    }

    console.log(`\nFinished conversion (${allFiles.length - failed} success, ${failed} failed)`);
}

await main();
