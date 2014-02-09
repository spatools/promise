# promise-ext [![Build Status](https://travis-ci.org/spatools/promise.png)](https://travis-ci.org/spatools/promise) [![NPM version](https://badge.fury.io/js/promise-ext.png)](http://badge.fury.io/js/promise-ext)

An Ecmascript 6 Polyfill strictly following specification.
Also contains extensions like timeout Promise, Processing Queue...

## Installation

Using Bower:

```console
$ bower install promise-ext --save
```

Using NuGet:

```console
$ Install-Package PromiseExt
```

Using NPM:

```console
$ npm install promise-ext --save
```

## Usage

You could use promise-ext in different context.

### Browser (with built file)

Include built script in your HTML file.

```html
<script type="text/javascript" src="path/to/promise.min.js"></script>
```

### Browser (AMD from source)

Configure RequireJS.

```javascript
requirejs.config({
    paths: {
        promise: 'path/to/promise'
    }
});
```

Then include promise in your dependencies.

```javascript
define(["promise"], function() {
    var promise = new Promise(function(resolve, reject) {

    });
});
```

### Almond

If you want to build using RequireJS r.js and almond along with your project, you have to add some configuration.

```javascript
{
    paths: {
        'promise': 'path/to/promise',
        'promise-builder': 'path/to/promise-builder'
    },
    include: [
        "path/to/promise-builder",
        "path/to/promise/abstract",
        "path/to/promise/class",
        "path/to/promise/extensions", // not mandatory if your are referencing it in your app
        "path/to/promise/status",
        "path/to/promise/tasks",
        "path/to/promise/timeout",
        "path/to/promise/utils"
    ]
}
```

### Node (installed using NPM)

Call require to register Promise to global object

```javascript
require("promise");

var promise = new Promise(function(resolve, reject) {

});
```


## Documentation

You can find documentation about EcmaScript 6 Promise specification on some websites.

* [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [HTML5Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/)

This library strictly follows EcmaScript 6 Specification which can be found on [EcmaScript Wiki](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts).

* [Word](http://wiki.ecmascript.org/lib/exe/fetch.php?id=harmony%3Aspecification_drafts&cache=cache&media=harmony:working_draft_ecma-262_edition_6_01-20-14.doc)
* [PDF](http://wiki.ecmascript.org/lib/exe/fetch.php?id=harmony%3Aspecification_drafts&cache=cache&media=harmony:working_draft_ecma-262_edition_6_01-20-14.pdf)
