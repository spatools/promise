define("promise", [], function () {
    var win = window,
        extensions = require("promise/extensions"),
        key;

    function isWellImplemented() {
        var resolve;
        new win.Promise(function (r) { resolve = r; });
        return (typeof resolve === "function");
    }

    function hasPromise() {
        return "Promise" in win
            && "resolve" in win.Promise
            && "reject" in win.Promise
            && "all" in win.Promise
            && "race" in win.Promise
            && isWellImplemented();
    }

    if (!hasPromise()) {
        win.Promise = require("promise/class");
    }

    for (key in extensions) {
        win.Promise[key] = extensions[key];
    }

    return win.Promise;
});
