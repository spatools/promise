/// <reference path="../src/promise.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
/// <reference path="../typings/sinon/sinon.d.ts" />

import Promise = require("src/promise/class");
import extensions = require("src/promise/extensions");
import capabilitiesHelpers = require("./helpers/capabilities");

describe("Promise Extensions", () => {

    describe("timeout", () => {

        it("should return a Promise object which is not resolved", () => {
            var promise = extensions.timeout(1);

            promise.should.be.instanceof(Promise);
            promise._status.should.equal("unresolved");
        });

        it("should resolve Promise after given delay", (done) => {
            var promise = extensions.timeout(5);

            promise._status.should.equal("unresolved");

            setTimeout(() => {
                promise._status.should.equal("has-resolution");
                done();
            }, 10);
        });

        it("should call subscriptions after given delay", (done) => {
            var spy = sinon.spy(),
                promise = extensions.timeout(5);

            promise.then(spy);
            promise._status.should.equal("unresolved");

            setTimeout(() => {
                promise._status.should.equal("has-resolution");

                setTimeout(() => {
                    sinon.assert.calledOnce(spy);
                    done();
                }, 1);
            }, 10);
        });

    });

    describe("forEach", () => {

        it("should return a resolved Promise if called using an empty array", () => {
            var p = extensions.forEach([], sinon.spy());

            p._status.should.equal("has-resolution");
        });

        it("should return an unresolved Promise if called using an non-empty array", () => {
            var p = extensions.forEach([1], sinon.spy());

            p._status.should.equal("unresolved");
        });

        it("should call iterator only when previous iterator promise is resolved", (done) => {
            var values = [1, 2, 3],
                result,
                capabilities = capabilitiesHelpers.createFakeCapabilities(3),
                promises = capabilitiesHelpers.extractPromisesFromCapabilities(capabilities),
                i = 0, len = 3,
                p, c, execSpy;

            function execute(val: number, index: number): Promise<number> {
                return promises[index];
            }

            execSpy = sinon.spy(execute);
            result = extensions.forEach(values, execSpy);

            setTimeout(() => {
                sinon.assert.calledOnce(execSpy);
                sinon.assert.calledWith(execSpy, values[0]);

                promises[0]._status.should.equal("unresolved");
                capabilities[0].resolve(undefined);
                promises[0]._status.should.equal("has-resolution");

                setTimeout(() => {
                    sinon.assert.calledTwice(execSpy);
                    sinon.assert.calledWith(execSpy, values[1]);

                    promises[1]._status.should.equal("unresolved");
                    capabilities[1].resolve(undefined);
                    promises[1]._status.should.equal("has-resolution");

                    setTimeout(() => {
                        promises[2]._status.should.equal("unresolved");
                        sinon.assert.calledThrice(execSpy);
                        sinon.assert.calledWith(execSpy, values[2]);

                        result._status.should.equal("unresolved");

                        done();
                    }, 30);
                }, 30);
            }, 30);
        });

        it("should resolve when every iterators' promises are resolved", (done) => {
            var values = [1, 2, 3],
                result,
                capabilities = capabilitiesHelpers.createFakeCapabilities(3),
                promises = capabilitiesHelpers.extractPromisesFromCapabilities(capabilities),
                i = 0, len = 3,
                p, c, execSpy;

            function execute(val: number, index: number): Promise<number> {
                return promises[index];
            }

            execSpy = sinon.spy(execute);
            result = extensions.forEach(values, execSpy);

            setTimeout(() => {
                sinon.assert.calledOnce(execSpy);
                sinon.assert.calledWith(execSpy, values[0]);

                promises[0]._status.should.equal("unresolved");
                capabilities[0].resolve(undefined);
                promises[0]._status.should.equal("has-resolution");

                setTimeout(() => {
                    sinon.assert.calledTwice(execSpy);
                    sinon.assert.calledWith(execSpy, values[1]);

                    promises[1]._status.should.equal("unresolved");
                    capabilities[1].resolve(undefined);
                    promises[1]._status.should.equal("has-resolution");

                    setTimeout(() => {
                        sinon.assert.calledThrice(execSpy);
                        sinon.assert.calledWith(execSpy, values[2]);

                        promises[2]._status.should.equal("unresolved");
                        capabilities[2].resolve(undefined);
                        promises[2]._status.should.equal("has-resolution");

                        setTimeout(() => {
                            result._status.should.equal("has-resolution");
                            done();
                        }, 30);
                    }, 30);
                }, 30);
            }, 30);
        });

    });

});
