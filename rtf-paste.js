#!/usr/bin/env osascript -l JavaScript

ObjC.import('AppKit');

function run(argv) {
    var r = pboardUnpacked('public.rtf');
    if (r) {
        return r;
    }
    console.log("No RTF data available...")
    return pboardUnpacked("public.utf8-plain-text")
}

// Types: 'public.rtf', 'public.html' etc
function pboardUnpacked(strType) {
    'use strict';
    return ObjC.unwrap(
        $.NSPasteboard.generalPasteboard.stringForType(
            strType
        )
    );
}
