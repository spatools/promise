﻿/// <reference path="../src/promise.d.ts" />
/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
/// <reference path="../typings/sinon/sinon.d.ts" />

requirejs.config({
    baseUrl: "../",

    paths: {
        "mocha": "bower_components/mocha/mocha",
        "should": "bower_components/should/should",
        "sinon": "bower_components/sinon/sinon"
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
    "tests/abstract",
    "tests/tasks",
    "tests/constructor",
    "tests/prototype",
    "tests/static"
];

require(tests, function () {
    mocha.run();
});
