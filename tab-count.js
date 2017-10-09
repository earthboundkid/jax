#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  let app = Application("Safari");
  app.includeStandardAdditions = true;

  let active = 0;
  let total = 0;
  let urls = new Set();
  let names = {};

  app.windows().forEach(w => {
    w.tabs().forEach(t => {
      total++;
      let url = t.url();
      if (url) {
        active++;
        urls.add(url);
        names[url] = t.name();
      }
    });
  });

  console.log("Safari Facts");
  console.log("------");
  console.log("Windows:", app.windows().length);
  console.log("Total tabs:", total);
  console.log("Active tabs:", active);
  console.log("Distinct URLs:", urls.size);
  console.log();
  if (argv == "list") {
    urls = Array.from(urls).sort();
    urls.forEach((url, i) => {
      console.log(`${i}. ${names[url]}
    - ${url}`);
    });
  }
}
