/// <reference path="../src/promise.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
/// <reference path="../typings/sinon/sinon.d.ts" />

import abstract = require("src/promise/abstract");
import Promise = require("src/promise/class");
import commonHelpers = require("./helpers/common");

describe("Promise Constructor", () => {
    var initializePromiseStub: SinonStub;
    beforeEach(() => { initializePromiseStub = sinon.stub(abstract, "initializePromise"); });
    afterEach(() => { initializePromiseStub.restore(); });

    it("should throws a TypeError if given argument is not a Function", () => {
        (() => { new Promise({}); }).should.throw(TypeError);
        (() => { new Promise(null); }).should.throw(TypeError);
        (() => { new Promise("test"); }).should.throw(TypeError);
    });

    it("should throws a TypeError if not called using new keyword", () => {
        (function () {
            Promise(null);
        }).should.throw(TypeError);
    });

    it("should call InitializePromise Abstract Operations with itself and executor method", () => {
        var executor = commonHelpers.noop(),
            promise = new Promise(executor);

        sinon.assert.calledOnce(initializePromiseStub);
        sinon.assert.calledWithExactly(initializePromiseStub, promise, executor);
    });

    it("should set [[Status]] internal slot to undefined", () => {
        var promise = new Promise(commonHelpers.noop());

        promise.should.have.property("_status", undefined);
    });

});
