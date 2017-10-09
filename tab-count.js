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

  let urlsOut = "";
  if (argv == "list") {
    urls = Array.from(urls).sort();
    urlsOut = urls
      .map((url, i) => `${i}. ${names[url]}\n\t- ${url}`)
      .join("\n");
  }

  return `Safari Facts
------
Windows: ${app.windows().length}
Total tabs: ${total}
Active tabs: ${active}
Distinct URLs: ${urls.size||urls.length}

${urlsOut}`;
}
