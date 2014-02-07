/// <reference path="promise.d.ts" />

// NodeJS : no need to check as node does not support es6 yet
if (typeof process !== "undefined" && {}.toString.call(process) === "[object process]") {
    global.Promise = require("./promise/class");
    exports = global.Promise;
}
// Browser : check for implementation and apply it to window
else {
    var isWellImplemented = () => {
            var resolve;
            new window.Promise(function (r) { resolve = r; });

            return typeof resolve === "function";
        },
        hasPromise = () => {
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

    if (!hasPromise()) {
        define(["promise/class"], (Promise) => Promise);
    }
    else {
        define([], () => window.Promise);
    }
}
