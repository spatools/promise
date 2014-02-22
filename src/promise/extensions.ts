/// <amd-dependency path="../promise" />
/// <reference path="../promise.d.ts" />

function partial(fn: Function, ...args: any[]) {
    return (..._args: any[]) => {
        return fn.apply(undefined, args.concat(_args));
    };
}

export function timeout(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(() => { resolve.call(undefined); }, ms);
    });
}

export function forEach<T>(values: T[], executor: (value: T, index: number) => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        if (values.length === 0) {
            return resolve.call(undefined);
        }
        var p, val,
            i = 0,
            len = values.length;

        p = Promise.resolve(undefined);

        for (; i < len; i++) {
            val = values[i];
            p = p.then(partial(executor, val, i), reject);
        }

        p.then(resolve, reject);
    });
}
