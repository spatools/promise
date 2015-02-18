define("promise", [], function () {
    function isWellImplemented() {
        var resolve;
        new window.Promise(function (r) { resolve = r; });
        return typeof resolve === "function";
    }

    function hasPromise() {
        return "Promise" in window &&
            "resolve" in window.Promise &&
            "reject" in window.Promise &&
            "all" in window.Promise &&
            "race" in window.Promise &&
            isWellImplemented();
    }

    if (!hasPromise()) {
        return require("./promise/class");
    } else {
        return window.Promise;
    }
});
