async function run(path) {
    let module = await import(path);
    return await module.default();
}

console.log(`\
1. Converting class to day data (classToDay.js)
-----------------------------------------------`);
await run("./classToDay.js");

console.log(`
2. Converting class-period to class-subject data
(periodToSubject.js)
-----------------------------------------------`);
await run("./classPeriodToSubject.js");
