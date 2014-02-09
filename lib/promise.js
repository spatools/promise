if (typeof process !== "undefined" && {}.toString.call(process) === "[object process]") {
    global.Promise = require("./promise/class");
    exports = global.Promise;
} else {
    var isWellImplemented = function () {
        var resolve;
        new window.Promise(function (r) {
            resolve = r;
        });

        return typeof resolve === "function";
    }, hasPromise = function () {
        return "Promise" in window && "cast" in window.Promise && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise && isWellImplemented();
    };

    if (!hasPromise()) {
        define(["promise/class"], function (Promise) {
            return Promise;
        });
    } else {
        define([], function () {
            return window.Promise;
        });
    }
}
