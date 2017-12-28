#!/usr/bin/env osascript -l JavaScript

function print() {
  ObjC.import("Foundation");
  for (let argument of arguments) {
    $.NSFileHandle.fileHandleWithStandardOutput.writeData(
      $.NSString.alloc
        .initWithString(String(argument) + "\n")
        .dataUsingEncoding($.NSNEXTSTEPStringEncoding)
    );
  }
}

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

  print(`Safari Facts
------
Windows: ${app.windows().length}
Total tabs: ${total}
Active tabs: ${active}
Distinct URLs: ${urls.size}
`);

  if (String(argv) === "list") {
    print();
    urls = Array.from(urls).sort();
    urls.forEach((url, i) => {
      print(`${i+1}. ${names[url]}\n\t- ${url}`);
    });
  }
}
