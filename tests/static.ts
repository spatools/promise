/// <reference path="../src/promise.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
/// <reference path="../typings/sinon/sinon.d.ts" />

import abstract = require("src/promise/abstract");
import Promise = require("src/promise/class");
import tasks = require("src/promise/tasks");
import FakePromise = require("./helpers/fake-promise");
import commonHelpers = require("./helpers/common");
import reactionsHelpers = require("./helpers/reactions");
import capabilitiesHelpers = require("./helpers/capabilities");

describe("Promise Static", () => {

    describe("all", () => {

        it("should return a Promise object", () => {
            var promise = Promise.all([]);

            abstract.isPromise(promise).should.be.ok;
            promise.then.should.be.type("function");
        });

        it("should return a resolved Promise object if array is empty", () => {
            var promise = Promise.all([]);

            promise._status.should.equal("has-resolution");
        });

        it("should return an unresolved Promise object if array is not empty", () => {
            var promise = Promise.all([
                new Promise(commonHelpers.noop())
            ]);

            promise._status.should.equal("unresolved");
        });

        it("should resolve Promise when every given Promises are fulfilled", (done) => {
            var capabilities = capabilitiesHelpers.createFakeCapabilities(3),
                promises = capabilitiesHelpers.extractPromisesFromCapabilities(capabilities),

                promise = Promise.all(promises);

            for (var i = 0; i < capabilities.length; i++) {
                promise._status.should.equal("unresolved");

                capabilities[i].resolve();
            }

            setTimeout(() => {
                promise._status.should.equal("has-resolution");
                done();
            }, 40);
        });

        it("should resolve Promise whenever any given Promises fails", (done) => {
            var capabilities = capabilitiesHelpers.createFakeCapabilities(3),
                promises = capabilitiesHelpers.extractPromisesFromCapabilities(capabilities),

                promise = Promise.all(promises);

            promise._status.should.equal("unresolved");

            capabilities[0].reject(new Error("an error"));

            setTimeout(() => {
                promise._status.should.equal("has-rejection");
                done();
            }, 10);
        });

    });

    describe("cast", () => {

        it("should return given argument if it's a Promise", () => {
            var promise = new Promise(commonHelpers.noop()),
                result = Promise.cast(promise);

            result.should.equal(promise);
        });

        it("should return a resolved Promised if it's an object", () => {
            var promise = Promise.cast({});

            promise._status.should.equal("has-resolution");
        });

        it("should return a resolved Promised with argument as result if it's an object", (done) => {
            var onFulfilledSpy = sinon.spy(),
                expectedResolution = { value: "Yoopie!" },
                promise = Promise.cast(expectedResolution);

            promise.then(onFulfilledSpy);

            promise._status.should.equal("has-resolution");

            setTimeout(() => {
                sinon.assert.calledOnce(onFulfilledSpy);
                sinon.assert.calledWith(onFulfilledSpy, expectedResolution);

                done();
            }, 5);
        });

        it("should return a resolved Promised and wait for resolution before calling callbacks if argument is a thenable", (done) => {
            var onFulfilledSpy = sinon.spy(),
                resolveHandler,
                expectedResolution = { value: "Yoopie!" },
                fake = new FakePromise(resolve => { resolveHandler = resolve; }),
                promise = Promise.cast(fake);

            promise.then(onFulfilledSpy);

            promise._status.should.equal("has-resolution");

            setTimeout(() => {
                sinon.assert.notCalled(onFulfilledSpy);

                resolveHandler(expectedResolution);

                setTimeout(() => {
                    sinon.assert.calledOnce(onFulfilledSpy);
                    sinon.assert.calledWith(onFulfilledSpy, expectedResolution);

                    done();
                }, 5);
            }, 5);
        });

    });

    describe("race", () => {

        it("should return a Promise object", () => {
            var promise = Promise.race([]);

            abstract.isPromise(promise).should.be.ok;
            promise.then.should.be.type("function");
        });

        it("should return an unresolved Promise object", () => {
            var promise = Promise.race([
                new Promise(commonHelpers.noop())
            ]);

            promise._status.should.equal("unresolved");
        });

        it("should resolve Promise whenever any given Promises are fulfilled", (done) => {
            var capabilities = capabilitiesHelpers.createFakeCapabilities(3),
                promises = capabilitiesHelpers.extractPromisesFromCapabilities(capabilities),

                promise = Promise.race(promises);

            capabilities[0].resolve();

            setTimeout(() => {
                promise._status.should.equal("has-resolution");
                done();
            }, 10);
        });

        it("should resolve Promise whenever any given Promises fails", (done) => {
            var capabilities = capabilitiesHelpers.createFakeCapabilities(3),
                promises = capabilitiesHelpers.extractPromisesFromCapabilities(capabilities),

                promise = Promise.race(promises);

            promise._status.should.equal("unresolved");

            capabilities[0].reject(new Error("an error"));

            setTimeout(() => {
                promise._status.should.equal("has-rejection");
                done();
            }, 10);
        });

    });

    describe("reject", () => {

        it("should return a new rejected Promise with given reason", () => {
            var expectedReason = new Error("an error"),
                promise = Promise.reject(expectedReason);

            promise._status.should.equal("has-rejection");
            promise._result.should.equal(expectedReason);
        });

    });

    describe("resolve", () => {

        it("should return a new resolved Promise with given resolution", () => {
            var expectedResolution = { value: "Yoopie!" },
                promise = Promise.resolve(expectedResolution);

            promise._status.should.equal("has-resolution");
            promise._result.should.equal(expectedResolution);
        });

    });
});
