#!/usr/bin/env osascript -l JavaScript

function run(argv) {
    // Debug input:
    // console.log(JSON.stringify(argv))

    var message = "",
        options = {soundName: "Glass"};

    if (argv.length == 1) {
        message = argv[0];
    } else if (argv.length == 2) {
        options.withTitle = argv[0];
        message = argv[1];
    } else if (argv.length == 3) {
        options.withTitle = argv[0];
        options.subtitle = argv[1];
        message = argv[2];
    } else if (argv.length == 4) {
        options.withTitle = argv[0];
        options.subtitle = argv[1];
        message = argv[2];
        options.soundName = argv[3];
    }

    displayNotifications(message, options);
}

function displayNotifications(message, options) {
    app = Application.currentApplication();
    app.includeStandardAdditions = true;
    app.displayNotification(message, options);
}
