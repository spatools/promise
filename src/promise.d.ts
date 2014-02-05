interface PromiseConstructor {
    new (executor: PromiseExecutor): Promise;
    prototype: PromisePrototype;

    all(promises: Promise[]): Promise;
    race(promises: Promise[]): Promise;

    resolve(value: any): Promise;

    reject(reason: Error): Promise;
    reject(reason: any): Promise;
}

interface PromisePrototype {
    constructor?: PromiseConstructor;

    then(onFulfilled: PromiseCallback): Promise;
    then(onFulfilled: PromiseCallback, onRejected: PromiseCallback): Promise;

    catch(onRejected: PromiseCallback): Promise;
}

interface Promise extends PromisePrototype {
    _status: string;
    _result: any;
    _rejectReactions: PromiseReaction[];
    _resolveReactions: PromiseReaction[];
}

interface Thenable {
    then(onFulfilled: PromiseCallback): any;
    then(onFulfilled: PromiseCallback, onRejected: PromiseCallback): any;
}

interface PromiseCapability {
    promise: Promise;
    resolve: Function;
    reject: Function;
}

interface PromiseReaction {
    capability: PromiseCapability;
    handler: Function;
}

interface PromiseRejectFunction {
    (reason: any): void;
}
interface PromiseResolveFunction {
    (value: any): void;
}

interface PromiseTask {
    executor: Function;
    args: any[];
}

interface PromiseExecutor {
    (resolve: PromiseCallback, reject: PromiseCallback): void;
}

interface PromiseCallback {
    (value: any): void;
}

interface Window {
    Promise: PromiseConstructor;
}

declare var Promise: PromiseConstructor;

declare var process: any;
declare var require: any;
declare var global: any;
declare var define: any;
