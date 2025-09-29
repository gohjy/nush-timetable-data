// class/101.max.json -> class/101.period.json & class/101.json (latter kept for compat)

import fs from "node:fs/promises";
import path from "node:path";

async function main() {
    let filepaths = await fs.readdir("./v2", { recursive: true });
    let maxJsonFileRegex = new RegExp(`\\${path.sep}\\d{3}\\.max\\.json$`);
    filepaths = filepaths
        .filter(x => x.match(maxJsonFileRegex))
        .sort()
        .map(x => path.join("./v2", x));

    for (let [index, filepath] of filepaths.entries()) {
        let fileContent = await fs.readFile(filepath);
        let minFileContent = JSON.stringify(JSON.parse(fileContent));
        
        let writeFilePaths = [
            filepath.replace(/\.max\.json$/, ".period.json"),
            filepath.replace(/\.max\.json$/, ".json")
        ];
        for (let writeFilePath of writeFilePaths) {
            await fs.writeFile(writeFilePath, minFileContent);
        }

        console.log(`Wrote file ${writeFilePaths[0].split(path.sep).slice(1).join("/")} (${index + 1}/${filepaths.length})`);
    }

    console.log("Done!");
}

export default main;

await main();
