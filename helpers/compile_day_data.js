// make day data for testing

import process from "node:process";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const NO_ARG_MESSAGE = `\
Run this file with a year/sem id as the 3rd argument.
E.g.

    node helpers/compile_day_data.js 2025s2

`;
const INVALID_ARG_MESSAGE = `\
Invalid year/sem id argument! Please ensure you are using
the format YYYYsS e.g. 2025s2.`;

async function main() {
    const folderId = process.argv[2];
    if (typeof folderId === "undefined") {
        console.error(NO_ARG_MESSAGE);
        return;
    }
    const matchRes = folderId?.match?.(/^(\d{4})s(1|2)$/);
    if (!matchRes) {
        console.error(INVALID_ARG_MESSAGE);
        return;
    }

    const data = [];
    for (let i=1; i<=5; i++) {
        const fileUrl = import.meta.resolve(`../v3/dist/${matchRes[0]}/day/${i}.subject.json`);
        const filepath = fileURLToPath(fileUrl);
        const filetext = await fs.readFile(filepath, { encoding: "utf-8" });
        data.push(filetext);
    }

    const stringifiedData = `[${data.join(",")}]`;

    const outputPath = process.argv[3];
    if (outputPath) {
        await fs.writeFile(fileURLToPath(import.meta.resolve("../" + outputPath)), stringifiedData);
    } else {
        console.log(stringifiedData);
    }
}

await main();
