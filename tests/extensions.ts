/// <reference path="../src/promise.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
/// <reference path="../typings/sinon/sinon.d.ts" />

import Promise = require("promise");
import extensions = require("src/promise/extensions");

describe("Promise Extensions", () => {

    describe("timeout", () => {

        it("should return a Promise object", () => {
            extensions.timeout(1).should.be.instanceof(Promise);
        });

    });

});
