/// <reference path="../src/promise.d.ts" />
/// <reference path="./tests.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
/// <reference path="../typings/sinon/sinon.d.ts" />

requirejs.config({
    //baseUrl: "../",

    paths: {
        "promise": "../src/promise",
        "mocha": "../bower_components/mocha/mocha",
        "should": "../bower_components/should/should",
        "sinon": "../bower_components/sinon/sinon"
    },

    map: {
        "*": {
            "src/promise/abstract": "promise/abstract",
            "src/promise/class": "promise/class",
            "src/promise/extensions": "promise/extensions",
            "src/promise/status": ".promise/status",
            "src/promise/tasks": "promise/tasks",
            "src/promise/timeout": "promise/timeout",
            "src/promise/utils": "promise/utils"
        }
    },

    shim: {
        mocha: {
            exports: "mocha"
        }
    }
});

(<any>window).console = window.console || function () { return; };
(<any>window).notrack = true;

var tests = [
    "abstract",
    "tasks",
    "constructor",
    "prototype",
    "static",
    "extensions",
];

require(tests, function () {
    mocha.run();
});
