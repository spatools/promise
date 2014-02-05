/// <reference path="promise.d.ts" />

// NodeJS : no need to check as node does not support es6 yet
if (typeof global !== "undefined") {
    global.Promise = require("./promise/class");
}
// Browser : check for implementation and apply it to window
else {
    var isWellImplemented = () => {
            var resolve;
            new window.Promise(function (r) { resolve = r; });

            return typeof resolve === "function";
        },
        needPromise = () => {
            return "Promise" in window &&
                // Some of these methods are missing from Firefox/Chrome experimental implementations
                "cast" in window.Promise &&
                "resolve" in window.Promise &&
                "reject" in window.Promise &&
                "all" in window.Promise &&
                "race" in window.Promise &&
                // Older version of the spec had a resolver object as the arg rather than a function
                isWellImplemented();
        };

    if (needPromise()) {
        define(["./promise/class"], (Promise) => {
            window.Promise = Promise;

            return {
                Promise: Promise
            };
        });
    }
    else {
        define([], {});
    }
}
