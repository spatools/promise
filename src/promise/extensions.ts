/// <reference path="../promise.d.ts" />

import Promise = require("promise");

function partial(fn: Function, ...args: any[]) {
    return () => {
        var _args = Array.prototype.concat(args, arguments);
        return fn.apply(undefined, _args);
    };
}

export function timeout(ms: number): Promise {
    return new Promise(resolve => {
        setTimeout(() => { resolve.call(undefined); }, ms);
    });
}

export function forEach(values: any[], executor: (value: any) => Promise): Promise {
    return new Promise((resolve, reject) => {
        if (values.length === 0) {
            return resolve.call(undefined);
        }
        var p, val,
            i = 1,
            len = values.length;

        p = Promise.cast(executor(values[0]));

        for (; i < len; i++) {
            val = values[i];
            p = p.then(partial(executor, val), reject); // > IE8
        }

        p.then(resolve, reject);
    });
}
