function partial(fn) {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        args[_i] = arguments[_i + 1];
    }
    return function () {
        var _args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            _args[_i] = arguments[_i + 0];
        }
        return fn.apply(undefined, args.concat(_args));
    };
}

function timeout(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve.call(undefined);
        }, ms);
    });
}
exports.timeout = timeout;

function forEach(values, executor) {
    return new Promise(function (resolve, reject) {
        if (values.length === 0) {
            return resolve.call(undefined);
        }
        var p, val, i = 0, len = values.length;

        p = Promise.resolve(undefined);

        for (; i < len; i++) {
            val = values[i];
            p = p.then(partial(executor, val, i), reject);
        }

        p.then(resolve, reject);
    });
}
exports.forEach = forEach;
