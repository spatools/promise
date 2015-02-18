/// <reference path="promise.d.ts" />
/// <reference path="../_definitions.d.ts" />
// NodeJS : no need to check as node does not support es6 yet
if (typeof process !== "undefined" && {}.toString.call(process) === "[object process]") {
    global.Promise = require("./promise/class");
    module.exports = global.Promise;
}
else {
    var win = window, isWellImplemented = function () {
        var resolve;
        new win.Promise(function (r) {
            resolve = r;
        });
        return typeof resolve === "function";
    }, hasPromise = function () {
        return "Promise" in win && "resolve" in win.Promise && "reject" in win.Promise && "all" in win.Promise && "race" in win.Promise && isWellImplemented();
    };
    if (!hasPromise()) {
        define(["promise/class"], function (Promise) { return Promise; });
    }
    else {
        define([], function () { return win.Promise; });
    }
}
