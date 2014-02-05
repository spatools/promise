if (typeof global !== "undefined") {
    global.Promise = require("./promise/class");
} else {
    var isWellImplemented = function () {
        var resolve;
        new window.Promise(function (r) {
            resolve = r;
        });

        return typeof resolve === "function";
    }, needPromise = function () {
        return "Promise" in window && "cast" in window.Promise && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise && isWellImplemented();
    };

    if (needPromise()) {
        define(["./promise/class"], function (Promise) {
            window.Promise = Promise;

            return {
                Promise: Promise
            };
        });
    } else {
        define([], {});
    }
}
