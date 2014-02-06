/// <reference path="../../src/promise.d.ts" />
/// <reference path="../../typings/sinon/sinon.d.ts" />

import Promise = require("promise");
import abstract = require("src/promise/abstract");
import commonHelpers = require("./common");

export function createFakeReaction(): PromiseReaction {
    return {
        capability: abstract.newPromiseCapability(Promise),
        handler: sinon.spy()
    };
}

export function createFakeReactionNoSpy(): PromiseReaction {
    return {
        capability: abstract.newPromiseCapability(Promise),
        handler: commonHelpers.noop()
    };
}

export function createFakeReactions(count: number): PromiseReaction[] {
    var result = [],
        i = 0;

    for (; i < count; i++) {
        result[i] = createFakeReaction();
    }

    return result;
}
