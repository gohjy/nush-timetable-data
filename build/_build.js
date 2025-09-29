async function run(path) {
    let module = await import(path);
    return await module.default();
}

await run("./periodToSubject.js");
await run("./minify.js");
