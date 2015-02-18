define(["require", "exports"], function (require, exports) {
    /**
     * Test if given value is a Function.
     * @param {any} value Value to test
     * @returns {boolean} True if value is a function
     */
    function isCallable(value) {
        return typeof value === "function";
    }
    exports.isCallable = isCallable;
    /**
     * Test if given value is an Object.
     * @param {any} value Value to test
     * @returns {boolean} True if value is an object and not null
     */
    function isObject(value) {
        return (typeof value === "object" && value !== null);
    }
    exports.isObject = isObject;
    /**
     * Test if given value is a Constructor Function.
     * @param {any} value Value to test
     * @returns {boolean} True if value is a Constructor Function
     */
    function isConstructor(value) {
        return (isCallable(value) && value.prototype && value.prototype.constructor === value);
    }
    exports.isConstructor = isConstructor;
    /**
     * Test if given value is a undefined
     * @param {any} value Value to test
     * @returns {boolean} True if value is undefined
     */
    function isUndefined(value) {
        return typeof value === "undefined";
    }
    exports.isUndefined = isUndefined;
    /**
     * Test if given object contains property.
     * @param {Object} obj Object to test if value is contained in
     * @param {string} prop Property to test if contained in object
     * @returns {boolean} True if object contains property
     */
    function hasProperty(obj, prop) {
        return (prop in obj);
    }
    exports.hasProperty = hasProperty;
    /**
     * Invoke given function in given object with object as this
     * @param {Object} obj Object which contains function
     * @param {string} prop Function name
     * @returns {any} Returns the result of invocation
     */
    function invoke(obj, fn, args) {
        if (args === void 0) { args = []; }
        if (!hasProperty(obj, fn) || !isCallable(obj[fn])) {
            throw new TypeError("Object has no " + fn + " function");
        }
        return obj[fn].apply(obj, args);
    }
    exports.invoke = invoke;
    /**
     * Returns given value
     * @param {any} value Value to return
     * @returns {any} Given value
     */
    function identity(value) {
        return value;
    }
    exports.identity = identity;
    function thrower(e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        throw e;
    }
    exports.thrower = thrower;
});
