/// <amd-dependency path="../promise" />
/// <reference path="../promise.d.ts" />
/// <reference path="../../_definitions.d.ts" />
define(["require", "exports", "../promise"], function (require, exports) {
    function partial(fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i - 0] = arguments[_i];
            }
            return fn.apply(undefined, args.concat(_args));
        };
    }
    function timeout(ms) {
        if (ms === void 0) { ms = 1; }
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve.call(undefined);
            }, ms);
        });
    }
    exports.timeout = timeout;
    function module() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length === 0) {
            return Promise.resolve(undefined);
        }
        return new Promise(function (resolve, reject) {
            if (args.length === 1 && Object.prototype.toString.call(args[0]) === "[object Array]") {
                args = args[0];
            }
            try {
                require(args, function () {
                    var mods = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        mods[_i - 0] = arguments[_i];
                    }
                    resolve(mods.length === 1 ? mods[0] : mods);
                }, function (err) {
                    reject(err);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    exports.module = module;
    function forEach(values, executor) {
        if (values.length === 0) {
            return Promise.resolve(undefined);
        }
        return new Promise(function (resolve, reject) {
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
    function map(values, iterator) {
        if (values.length === 0) {
            return Promise.resolve([]);
        }
        return new Promise(function (resolve, reject) {
            var p, val, i = 0, len = values.length, result = [], wrapper = function (val, i) {
                return iterator(val, i).then(function (val) {
                    result.push(val);
                    return val;
                });
            };
            p = Promise.resolve(undefined);
            for (; i < len; i++) {
                val = values[i];
                p = p.then(partial(wrapper, val, i), reject);
            }
            p.then(function () { return resolve(result); }, reject);
        });
    }
    exports.map = map;
});
