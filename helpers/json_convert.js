// This function is intended to convert
// JSON output in ... { ... "p1": "NAME", "p2": "NAME"... }
// (from csvjson.com) to the format
// { ... "p1": { "courseCode": "", "subject": "NAME" }, "p2": { "courseCode": "", "subject": "NAME"}... }
// which is used in the data files.
// Copy and paste this code into the browser console
// then run convert(data) for each data object
// if you wish to run this in the browser.

function convert(data) {
  for (let i=0; i<data.data.length; i++) {
    for (let k of Object.keys(data.data[i])) {
      if (k.match(/^p\d+/)) { // "p1", "p2" etc
        data.data[i][k] = { "courseCode": "", "subject": data.data[i][k] };
      }
    }
  }

  console.log(
    JSON.stringify(data, 2)
  );
}