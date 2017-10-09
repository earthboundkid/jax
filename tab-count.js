#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  let app = Application("Safari");
  app.includeStandardAdditions = true;

  let total = 0;
  let urls = new Set();

  app.windows().forEach(w => {
    w.tabs().forEach(t => {
      let url = t.url();
      if (url) total++;
      urls.add(url);
    });
  });

  console.log("Safari Facts");
  console.log("------");
  console.log("Windows:", app.windows().length);
  console.log("Tabs:", total);
  console.log("Distinct URLs:", urls.size);
}

