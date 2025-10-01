// Move .max.json files from v2/* to v3/raw/* and rename to .json.

import fs from "node:fs/promises";
import path from "node:path";

async function main() {
    let filepaths = await fs.readdir("v2", { recursive: true });
    filepaths = filepaths.filter(x => x.split(path.sep).pop().match(/^\d+\.max\.json$/));

    for (let [index, entry] of filepaths.entries()) {
        let content = await fs.readFile(path.join("v2", entry));
        content = JSON.parse(content);
        content.version = "3-raw";
        content = JSON.stringify(content, null, 2);
        
        let writeFilePath = path.join("v3/raw", entry).replace(/\.max\.json$/, ".json");
        await fs.mkdir(path.dirname(writeFilePath), { recursive: true });
        await fs.writeFile(writeFilePath, content);

        console.log(`Wrote ${entry} (${index + 1}/${filepaths.length})`);
    }

    console.log("Done!");
}

await main();
