/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(31)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(11)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../.0.28.1@css-loader/index.js!./weui.css", function() {
			var newContent = require("!!../../../.0.28.1@css-loader/index.js!./weui.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0e0b4f18",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\xampp\\htdocs\\angular\\0410\\vue&webpack\\components\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e0b4f18", Component.options)
  } else {
    hotAPI.reload("data-v-0e0b4f18", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(21)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(18),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-079bd769",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\xampp\\htdocs\\angular\\0410\\vue&webpack\\components\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-079bd769", Component.options)
  } else {
    hotAPI.reload("data-v-079bd769", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(23)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(20),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-211dc29b",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\xampp\\htdocs\\angular\\0410\\vue&webpack\\components\\weui.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] weui.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-211dc29b", Component.options)
  } else {
    hotAPI.reload("data-v-211dc29b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.3.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
});

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 */
function noop() {}

/**
 * Always return false.
 */
var no = function no() {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
      // possible circular reference
      return a === b;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = null; // work around flow check

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var name = typeof vm === 'string' ? vm : typeof vm === 'function' && vm.options ? vm.options.name : vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  var generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

function handleError(err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err;
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function logError(err) {
      console.error(err);
    };
    timerFunc = function timerFunc() {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) {
        setTimeout(noop);
      }
    };
  } else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function timerFunc() {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function timerFunc() {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      });
    }
  };
}();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(obj, key, val, customSetter) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, childVal) : res;
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn('Invalid prop: type check failed for prop "' + name + '".' + ' Expected ' + expectedTypes.map(capitalize).join(', ') + ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.', vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }
  /* istanbul ignore next */
  return false;
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + "referenced during render. Make sure to declare reactive data " + "properties in the data option.", target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode() {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned;
}

function cloneVNodes(vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res;
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || '') + "_" + i));
    } else if (isPrimitive(c)) {
      if (isDef(last) && isDef(last.text)) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isDef(c.text) && isDef(last) && isDef(last.text)) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  return isObject(comp) ? base.extend(comp) : comp;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) && child.data && child.data.slot != null) {
      var name = child.data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment || node.text === ' ';
}

function resolveScopedSlots(fns) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res;
}

/*  */

var activeInstance = null;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse(val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || !Object.isExtensible(val)) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch) {
    initWatch(vm, opts.watch);
  }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn("\"" + key + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }observerState.shouldConvert = true;
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + keys[i] + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  try {
    return data.call(vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production') {
      if (getter === undefined) {
        warn("No getter function has been defined for computed property \"" + key + "\".", vm);
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn("method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("method \"" + key + "\" has already been defined as a prop.", vm);
      }
    }
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray ? inject : hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
    }
    return result;
  }
}

/*  */

function createFunctionalComponent(Ctor, propsData, data, context, children) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function h(a, b, c, d) {
    return createElement(_context, a, b, c, d, true);
  };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function slots() {
      return resolveSlots(children, context);
    }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return;
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children });
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options);
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  };
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) {
      applyNS(vnode, ns);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      slotNodes._rendered = true;
    }
    return slotNodes || fallback;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes(eventKeyCode, key, builtInAlias) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1;
  } else {
    return keyCodes !== eventKeyCode;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };
}

function renderMixin(Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e) : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue$3(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
      }
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry(vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created() {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this.cache, this._vnode, function (name) {
        return matches(val, name);
      });
    },
    exclude: function exclude(val) {
      pruneCache(this.cache, this._vnode, function (name) {
        return !matches(val, name);
      });
    }
  },

  render: function render() {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (this.include && !matches(this.include, name) || this.exclude && matches(this.exclude, name))) {
        return vnode;
      }
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode;
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get() {
    return this.$vnode.ssrContext;
  }
});

Vue$3.version = '2.3.2';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function genClassFromData(data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (isUndef(value)) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1);
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) {
        res += key + ' ';
      }
    }
    return res.slice(0, -1);
  }
  /* istanbul ignore next */
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b);
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (!inPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) && config.isUnknownElement(tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false;
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break;
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false;
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function wrapFilter(exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return "_f(\"" + filter + "\")(" + exp + ")";
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return "_f(\"" + name + "\")(" + exp + "," + args;
  }
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var str;
var index$1;

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1(event, _handler, once$$1, capture, passive) {
  if (once$$1) {
    var oldHandler = _handler;
    var _target = target$1; // save current target element in closure
    _handler = function handler(ev) {
      var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, _handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, _handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, vnode, checkVal) {
  return !elm.composing && (vnode.tag === 'option' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
}

function isDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal;
}

function isInputChanged(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal);
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim();
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && prop in testEl.style) {
    return prop;
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def$$1 === 'undefined' ? 'undefined' : _typeof(def$$1)) === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted(el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function cb() {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple ? binding.value.some(function (v) {
        return hasNoMatchingOption(v, el.options);
      }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false;
    }
  }
  return true;
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag;
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove != null) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
  if (process.env.NODE_ENV !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
  }
}, 0);

/*  */

exports.default = Vue$3;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(29)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
  * vue-router v2.5.3
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config === 'undefined' ? 'undefined' : _typeof(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + ", " + "expecting an object, function or boolean.");
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) query = {};
  var hash = ref.hash;if (hash === void 0) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    return String(a[key]) === String(b[key]);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function handler(e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this.$root._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this.$root._route;
    }
  });

  var isDef = function isDef(v) {
    return v !== undefined;
  };

  var registerInstance = function registerInstance(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (index$1(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var normalizedPath = normalizePath(path, parent);
  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) {
        return (/^\/?$/.test(child.path)
        );
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path) {
  var regex = index(path);
  if (process.env.NODE_ENV !== 'production') {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }
  return regex;
}

function normalizePath(path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (_typeof(location.params) !== 'object') {
        location.params = {};
      }

      if (currentRoute && _typeof(currentRoute.params) === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || (typeof redirect === 'undefined' ? 'undefined' : _typeof(redirect)) !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return;
    }
    var isObject = (typeof shouldScroll === 'undefined' ? 'undefined' : _typeof(shouldScroll)) === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

/*  */

var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function abort(err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function iterator(hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function isValid() {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    return fn.apply(this, arguments);
  };
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function pushHash(path) {
  window.location.hash = path;
}

function replaceHash(path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path);
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, "invalid mode: " + mode);
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function setupHashListener() {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '2.5.3';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

exports.default = VueRouter;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function (global, factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


	var version = "3.2.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return _slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function isPlainObject(obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function isEmptyObject(obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.3.3
  * https://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2016-08-08
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,


		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    fcssescape = function fcssescape(ch, asCodePoint) {
			if (asCodePoint) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if (ch === "\0") {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		},
		    disabledAncestor = addCombinator(function (elem) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		}, { dir: "parentNode", next: "legend" });

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							while (i--) {
								groups[i] = "#" + nid + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
		function assert(fn) {
			var el = document.createElement("fieldset");

			try {
				return !!fn(el);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
				// release memory in IE
				el = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
		function createDisabledPseudo(disabled) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function (elem) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ("form" in elem) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if (elem.parentNode && elem.disabled === false) {

						// Option elements defer to a parent optgroup if present
						if ("label" in elem) {
							if ("label" in elem.parentNode) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
					}

					return elem.disabled === disabled;

					// Try to winnow out elements that can't be disabled before trusting the disabled property.
					// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
					// even exist on them, let alone have a boolean value.
				} else if ("label" in elem) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    subWindow,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

				// Support: IE 11, Edge
				if (subWindow.addEventListener) {
					subWindow.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (subWindow.attachEvent) {
					subWindow.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (el) {
				el.className = "i";
				return !el.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (el) {
				el.appendChild(document.createComment(""));
				return !el.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (el) {
				docElem.appendChild(el).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID filter and find
			if (support.getById) {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var elem = context.getElementById(id);
						return elem ? [elem] : [];
					}
				};
			} else {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var node,
						    i,
						    elems,
						    elem = context.getElementById(id);

						if (elem) {

							// Verify the id attribute
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName(id);
							i = 0;
							while (elem = elems[i++]) {
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (el) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (el.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!el.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!el.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if (!el.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (el) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					el.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (el.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (el.querySelectorAll(":enabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild(el).disabled = true;
					if (el.querySelectorAll(":disabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (el) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(el, "*");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(el, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.escape = function (sel) {
			return (sel + "").replace(rcssescape, fcssescape);
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": createDisabledPseudo(false),
				"disabled": createDisabledPseudo(true),

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    skip = combinator.next,
			    key = skip || dir,
			    checkNonElements = base && key === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if (skip && skip === elem.nodeName.toLowerCase()) {
								elem = elem[dir] || elem;
							} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[key] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (el) {
			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (el) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (el) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute("value", "");
			return el.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (el) {
			return el.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};
	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			if (nodeName(elem, "iframe")) {
				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}

			return jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = _locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = _slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (Array.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return jQuery(">tbody", elem)[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,


		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rcustomProp = /^--/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		var ret = jQuery.cssProps[name];
		if (!ret) {
			ret = jQuery.cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with computed style
		var valueIsBorderBox,
		    styles = getStyles(elem),
		    val = curCSS(elem, name, styles),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(val)) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if (val === "auto") {
			val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
		}

		// Normalize "", auto, and prepare for extra
		val = parseFloat(val) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name),
			    style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    inProgress,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(elem, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(elem, [animation]);
			return false;
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		// Attach callbacks from options
		animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (Array.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (Array.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (Array.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap(selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var doc,
			    docElem,
			    rect,
			    win,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
					left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {

				// Coalesce documents and windows
				var win;
				if (jQuery.isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(25);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*!\r\n * WeUI v1.1.2 (https://github.com/weui/weui)\r\n * Copyright 2017 Tencent, Inc.\r\n * Licensed under the MIT license\r\n */\r\nhtml {\r\n  -ms-text-size-adjust: 100%;\r\n  -webkit-text-size-adjust: 100%;\r\n}\r\nbody {\r\n  line-height: 1.6;\r\n  font-family: -apple-system-font, \"Helvetica Neue\", sans-serif;\r\n}\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\na img {\r\n  border: 0;\r\n}\r\na {\r\n  text-decoration: none;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n@font-face {\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-family: \"weui\";\r\n  src: url('data:application/octet-stream;base64,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') format('truetype');\r\n}\r\n[class^=\"weui-icon-\"],\r\n[class*=\" weui-icon-\"] {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font: normal normal normal 14px/1 \"weui\";\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\n[class^=\"weui-icon-\"]:before,\r\n[class*=\" weui-icon-\"]:before {\r\n  display: inline-block;\r\n  margin-left: .2em;\r\n  margin-right: .2em;\r\n}\r\n.weui-icon-circle:before {\r\n  content: \"\\EA01\";\r\n}\r\n/* '' */\r\n.weui-icon-download:before {\r\n  content: \"\\EA02\";\r\n}\r\n/* '' */\r\n.weui-icon-info:before {\r\n  content: \"\\EA03\";\r\n}\r\n/* '' */\r\n.weui-icon-safe-success:before {\r\n  content: \"\\EA04\";\r\n}\r\n/* '' */\r\n.weui-icon-safe-warn:before {\r\n  content: \"\\EA05\";\r\n}\r\n/* '' */\r\n.weui-icon-success:before {\r\n  content: \"\\EA06\";\r\n}\r\n/* '' */\r\n.weui-icon-success-circle:before {\r\n  content: \"\\EA07\";\r\n}\r\n/* '' */\r\n.weui-icon-success-no-circle:before {\r\n  content: \"\\EA08\";\r\n}\r\n/* '' */\r\n.weui-icon-waiting:before {\r\n  content: \"\\EA09\";\r\n}\r\n/* '' */\r\n.weui-icon-waiting-circle:before {\r\n  content: \"\\EA0A\";\r\n}\r\n/* '' */\r\n.weui-icon-warn:before {\r\n  content: \"\\EA0B\";\r\n}\r\n/* '' */\r\n.weui-icon-info-circle:before {\r\n  content: \"\\EA0C\";\r\n}\r\n/* '' */\r\n.weui-icon-cancel:before {\r\n  content: \"\\EA0D\";\r\n}\r\n/* '' */\r\n.weui-icon-search:before {\r\n  content: \"\\EA0E\";\r\n}\r\n/* '' */\r\n.weui-icon-clear:before {\r\n  content: \"\\EA0F\";\r\n}\r\n/* '' */\r\n.weui-icon-back:before {\r\n  content: \"\\EA10\";\r\n}\r\n/* '' */\r\n.weui-icon-delete:before {\r\n  content: \"\\EA11\";\r\n}\r\n/* '' */\r\n[class^=\"weui-icon_\"]:before,\r\n[class*=\" weui-icon_\"]:before {\r\n  margin: 0;\r\n}\r\n.weui-icon-success {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-waiting {\r\n  font-size: 23px;\r\n  color: #10AEFF;\r\n}\r\n.weui-icon-warn {\r\n  font-size: 23px;\r\n  color: #F43530;\r\n}\r\n.weui-icon-info {\r\n  font-size: 23px;\r\n  color: #10AEFF;\r\n}\r\n.weui-icon-success-circle {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-success-no-circle {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-waiting-circle {\r\n  font-size: 23px;\r\n  color: #10AEFF;\r\n}\r\n.weui-icon-circle {\r\n  font-size: 23px;\r\n  color: #C9C9C9;\r\n}\r\n.weui-icon-download {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-info-circle {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-safe-success {\r\n  color: #09BB07;\r\n}\r\n.weui-icon-safe-warn {\r\n  color: #FFBE00;\r\n}\r\n.weui-icon-cancel {\r\n  color: #F43530;\r\n  font-size: 22px;\r\n}\r\n.weui-icon-search {\r\n  color: #B2B2B2;\r\n  font-size: 14px;\r\n}\r\n.weui-icon-clear {\r\n  color: #B2B2B2;\r\n  font-size: 14px;\r\n}\r\n.weui-icon-delete.weui-icon_gallery-delete {\r\n  color: #FFFFFF;\r\n  font-size: 22px;\r\n}\r\n.weui-icon_msg {\r\n  font-size: 93px;\r\n}\r\n.weui-icon_msg.weui-icon-warn {\r\n  color: #F76260;\r\n}\r\n.weui-icon_msg-primary {\r\n  font-size: 93px;\r\n}\r\n.weui-icon_msg-primary.weui-icon-warn {\r\n  color: #FFBE00;\r\n}\r\n.weui-btn {\r\n  position: relative;\r\n  display: block;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  padding-left: 14px;\r\n  padding-right: 14px;\r\n  box-sizing: border-box;\r\n  font-size: 18px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  color: #FFFFFF;\r\n  line-height: 2.55555556;\r\n  border-radius: 5px;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  overflow: hidden;\r\n}\r\n.weui-btn:after {\r\n  content: \" \";\r\n  width: 200%;\r\n  height: 200%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  -webkit-transform: scale(0.5);\r\n          transform: scale(0.5);\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  box-sizing: border-box;\r\n  border-radius: 10px;\r\n}\r\n.weui-btn_inline {\r\n  display: inline-block;\r\n}\r\n.weui-btn_default {\r\n  color: #000000;\r\n  background-color: #F8F8F8;\r\n}\r\n.weui-btn_default:not(.weui-btn_disabled):visited {\r\n  color: #000000;\r\n}\r\n.weui-btn_default:not(.weui-btn_disabled):active {\r\n  color: rgba(0, 0, 0, 0.6);\r\n  background-color: #DEDEDE;\r\n}\r\n.weui-btn_primary {\r\n  background-color: #1AAD19;\r\n}\r\n.weui-btn_primary:not(.weui-btn_disabled):visited {\r\n  color: #FFFFFF;\r\n}\r\n.weui-btn_primary:not(.weui-btn_disabled):active {\r\n  color: rgba(255, 255, 255, 0.6);\r\n  background-color: #179B16;\r\n}\r\n.weui-btn_warn {\r\n  background-color: #E64340;\r\n}\r\n.weui-btn_warn:not(.weui-btn_disabled):visited {\r\n  color: #FFFFFF;\r\n}\r\n.weui-btn_warn:not(.weui-btn_disabled):active {\r\n  color: rgba(255, 255, 255, 0.6);\r\n  background-color: #CE3C39;\r\n}\r\n.weui-btn_disabled {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n.weui-btn_disabled.weui-btn_default {\r\n  color: rgba(0, 0, 0, 0.3);\r\n  background-color: #F7F7F7;\r\n}\r\n.weui-btn_disabled.weui-btn_primary {\r\n  background-color: #9ED99D;\r\n}\r\n.weui-btn_disabled.weui-btn_warn {\r\n  background-color: #EC8B89;\r\n}\r\n.weui-btn_loading .weui-loading {\r\n  margin: -0.2em 0.34em 0 0;\r\n}\r\n.weui-btn_loading.weui-btn_primary,\r\n.weui-btn_loading.weui-btn_warn {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n.weui-btn_loading.weui-btn_primary {\r\n  background-color: #179B16;\r\n}\r\n.weui-btn_loading.weui-btn_warn {\r\n  background-color: #CE3C39;\r\n}\r\n.weui-btn_plain-primary {\r\n  color: #1aad19;\r\n  border: 1px solid #1aad19;\r\n}\r\n.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active {\r\n  color: rgba(26, 173, 25, 0.6);\r\n  border-color: rgba(26, 173, 25, 0.6);\r\n}\r\n.weui-btn_plain-primary:after {\r\n  border-width: 0;\r\n}\r\n.weui-btn_plain-default {\r\n  color: #353535;\r\n  border: 1px solid #353535;\r\n}\r\n.weui-btn_plain-default:not(.weui-btn_plain-disabled):active {\r\n  color: rgba(53, 53, 53, 0.6);\r\n  border-color: rgba(53, 53, 53, 0.6);\r\n}\r\n.weui-btn_plain-default:after {\r\n  border-width: 0;\r\n}\r\n.weui-btn_plain-disabled {\r\n  color: rgba(0, 0, 0, 0.2);\r\n  border-color: rgba(0, 0, 0, 0.2);\r\n}\r\nbutton.weui-btn,\r\ninput.weui-btn {\r\n  width: 100%;\r\n  border-width: 0;\r\n  outline: 0;\r\n  -webkit-appearance: none;\r\n}\r\nbutton.weui-btn:focus,\r\ninput.weui-btn:focus {\r\n  outline: 0;\r\n}\r\nbutton.weui-btn_inline,\r\ninput.weui-btn_inline,\r\nbutton.weui-btn_mini,\r\ninput.weui-btn_mini {\r\n  width: auto;\r\n}\r\nbutton.weui-btn_plain-primary,\r\ninput.weui-btn_plain-primary,\r\nbutton.weui-btn_plain-default,\r\ninput.weui-btn_plain-default {\r\n  border-width: 1px;\r\n  background-color: transparent;\r\n}\r\n.weui-btn_mini {\r\n  display: inline-block;\r\n  padding: 0 1.32em;\r\n  line-height: 2.3;\r\n  font-size: 13px;\r\n}\r\n/*gap between btn*/\r\n.weui-btn + .weui-btn {\r\n  margin-top: 15px;\r\n}\r\n.weui-btn.weui-btn_inline + .weui-btn.weui-btn_inline {\r\n  margin-top: auto;\r\n  margin-left: 15px;\r\n}\r\n.weui-btn-area {\r\n  margin: 1.17647059em 15px 0.3em;\r\n}\r\n.weui-btn-area_inline {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-btn-area_inline .weui-btn {\r\n  margin-top: auto;\r\n  margin-right: 15px;\r\n  width: 100%;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-btn-area_inline .weui-btn:last-child {\r\n  margin-right: 0;\r\n}\r\n/*\r\nz-index:\r\n0: .weui-swiped-btn\r\n1: .weui-cell_swiped .weui-cell__bd\r\n2: .weui-cells和.weui-cell的1px线\r\n*/\r\n.weui-cells {\r\n  margin-top: 1.17647059em;\r\n  background-color: #FFFFFF;\r\n  line-height: 1.47058824;\r\n  font-size: 17px;\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n.weui-cells:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  z-index: 2;\r\n}\r\n.weui-cells:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  z-index: 2;\r\n}\r\n.weui-cells__title {\r\n  margin-top: .77em;\r\n  margin-bottom: .3em;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n  color: #999999;\r\n  font-size: 14px;\r\n}\r\n.weui-cells__title + .weui-cells {\r\n  margin-top: 0;\r\n}\r\n.weui-cells__tips {\r\n  margin-top: .3em;\r\n  color: #999999;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n  font-size: 14px;\r\n}\r\n.weui-cell {\r\n  padding: 10px 15px;\r\n  position: relative;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-cell:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n  z-index: 2;\r\n}\r\n.weui-cell:first-child:before {\r\n  display: none;\r\n}\r\n.weui-cell_primary {\r\n  -webkit-box-align: start;\r\n  -webkit-align-items: flex-start;\r\n          align-items: flex-start;\r\n}\r\n.weui-cell__bd {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-cell__ft {\r\n  text-align: right;\r\n  color: #999999;\r\n}\r\n.weui-cell_swiped {\r\n  display: block;\r\n  padding: 0;\r\n}\r\n.weui-cell_swiped > .weui-cell__bd {\r\n  position: relative;\r\n  z-index: 1;\r\n  background-color: #FFFFFF;\r\n}\r\n.weui-cell_swiped > .weui-cell__ft {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  color: #FFFFFF;\r\n}\r\n.weui-swiped-btn {\r\n  display: block;\r\n  padding: 10px 1em;\r\n  line-height: 1.47058824;\r\n  color: inherit;\r\n}\r\n.weui-swiped-btn_default {\r\n  background-color: #C7C7CC;\r\n}\r\n.weui-swiped-btn_warn {\r\n  background-color: #FF3B30;\r\n}\r\n.weui-cell_access {\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  color: inherit;\r\n}\r\n.weui-cell_access:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-cell_access .weui-cell__ft {\r\n  padding-right: 13px;\r\n  position: relative;\r\n}\r\n.weui-cell_access .weui-cell__ft:after {\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 6px;\r\n  width: 6px;\r\n  border-width: 2px 2px 0 0;\r\n  border-color: #C8C8CD;\r\n  border-style: solid;\r\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n  position: relative;\r\n  top: -2px;\r\n  position: absolute;\r\n  top: 50%;\r\n  margin-top: -4px;\r\n  right: 2px;\r\n}\r\n.weui-cell_link {\r\n  color: #586C94;\r\n  font-size: 14px;\r\n}\r\n.weui-cell_link:first-child:before {\r\n  display: block;\r\n}\r\n.weui-check__label {\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-check__label:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-check {\r\n  position: absolute;\r\n  left: -9999em;\r\n}\r\n.weui-cells_radio .weui-cell__ft {\r\n  padding-left: 0.35em;\r\n}\r\n.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {\r\n  display: block;\r\n  content: '\\EA08';\r\n  color: #09BB07;\r\n  font-size: 16px;\r\n}\r\n.weui-cells_checkbox .weui-cell__hd {\r\n  padding-right: 0.35em;\r\n}\r\n.weui-cells_checkbox .weui-icon-checked:before {\r\n  content: '\\EA01';\r\n  color: #C9C9C9;\r\n  font-size: 23px;\r\n  display: block;\r\n}\r\n.weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {\r\n  content: '\\EA06';\r\n  color: #09BB07;\r\n}\r\n.weui-label {\r\n  display: block;\r\n  width: 105px;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n}\r\n.weui-input {\r\n  width: 100%;\r\n  border: 0;\r\n  outline: 0;\r\n  -webkit-appearance: none;\r\n  background-color: transparent;\r\n  font-size: inherit;\r\n  color: inherit;\r\n  height: 1.47058824em;\r\n  line-height: 1.47058824;\r\n}\r\n.weui-input::-webkit-outer-spin-button,\r\n.weui-input::-webkit-inner-spin-button {\r\n  -webkit-appearance: none;\r\n  margin: 0;\r\n}\r\n.weui-textarea {\r\n  display: block;\r\n  border: 0;\r\n  resize: none;\r\n  width: 100%;\r\n  color: inherit;\r\n  font-size: 1em;\r\n  line-height: inherit;\r\n  outline: 0;\r\n}\r\n.weui-textarea-counter {\r\n  color: #B2B2B2;\r\n  text-align: right;\r\n}\r\n.weui-cell_warn .weui-textarea-counter {\r\n  color: #E64340;\r\n}\r\n.weui-toptips {\r\n  display: none;\r\n  position: fixed;\r\n  -webkit-transform: translateZ(0);\r\n          transform: translateZ(0);\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  padding: 5px;\r\n  font-size: 14px;\r\n  text-align: center;\r\n  color: #FFF;\r\n  z-index: 5000;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n}\r\n.weui-toptips_warn {\r\n  background-color: #E64340;\r\n}\r\n.weui-cells_form .weui-cell__ft {\r\n  font-size: 0;\r\n}\r\n.weui-cells_form .weui-icon-warn {\r\n  display: none;\r\n}\r\n.weui-cells_form input,\r\n.weui-cells_form textarea,\r\n.weui-cells_form label[for] {\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-cell_warn {\r\n  color: #E64340;\r\n}\r\n.weui-cell_warn .weui-icon-warn {\r\n  display: inline-block;\r\n}\r\n.weui-form-preview {\r\n  position: relative;\r\n  background-color: #FFFFFF;\r\n}\r\n.weui-form-preview:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-form-preview:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-form-preview__hd {\r\n  position: relative;\r\n  padding: 10px 15px;\r\n  text-align: right;\r\n  line-height: 2.5em;\r\n}\r\n.weui-form-preview__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-form-preview__hd .weui-form-preview__value {\r\n  font-style: normal;\r\n  font-size: 1.6em;\r\n}\r\n.weui-form-preview__bd {\r\n  padding: 10px 15px;\r\n  font-size: .9em;\r\n  text-align: right;\r\n  color: #999999;\r\n  line-height: 2;\r\n}\r\n.weui-form-preview__ft {\r\n  position: relative;\r\n  line-height: 50px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-form-preview__ft:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-form-preview__item {\r\n  overflow: hidden;\r\n}\r\n.weui-form-preview__label {\r\n  float: left;\r\n  margin-right: 1em;\r\n  min-width: 4em;\r\n  color: #999999;\r\n  text-align: justify;\r\n  text-align-last: justify;\r\n}\r\n.weui-form-preview__value {\r\n  display: block;\r\n  overflow: hidden;\r\n  word-break: normal;\r\n  word-wrap: break-word;\r\n}\r\n.weui-form-preview__btn {\r\n  position: relative;\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  color: #3CC51F;\r\n  text-align: center;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\nbutton.weui-form-preview__btn {\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: 0;\r\n  line-height: inherit;\r\n  font-size: inherit;\r\n}\r\n.weui-form-preview__btn:active {\r\n  background-color: #EEEEEE;\r\n}\r\n.weui-form-preview__btn:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-form-preview__btn:first-child:after {\r\n  display: none;\r\n}\r\n.weui-form-preview__btn_default {\r\n  color: #999999;\r\n}\r\n.weui-form-preview__btn_primary {\r\n  color: #0BB20C;\r\n}\r\n.weui-cell_select {\r\n  padding: 0;\r\n}\r\n.weui-cell_select .weui-select {\r\n  padding-right: 30px;\r\n}\r\n.weui-cell_select .weui-cell__bd:after {\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 6px;\r\n  width: 6px;\r\n  border-width: 2px 2px 0 0;\r\n  border-color: #C8C8CD;\r\n  border-style: solid;\r\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n  position: relative;\r\n  top: -2px;\r\n  position: absolute;\r\n  top: 50%;\r\n  right: 15px;\r\n  margin-top: -4px;\r\n}\r\n.weui-select {\r\n  -webkit-appearance: none;\r\n  border: 0;\r\n  outline: 0;\r\n  background-color: transparent;\r\n  width: 100%;\r\n  font-size: inherit;\r\n  height: 45px;\r\n  line-height: 45px;\r\n  position: relative;\r\n  z-index: 1;\r\n  padding-left: 15px;\r\n}\r\n.weui-cell_select-before {\r\n  padding-right: 15px;\r\n}\r\n.weui-cell_select-before .weui-select {\r\n  width: 105px;\r\n  box-sizing: border-box;\r\n}\r\n.weui-cell_select-before .weui-cell__hd {\r\n  position: relative;\r\n}\r\n.weui-cell_select-before .weui-cell__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-right: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 100% 0;\r\n          transform-origin: 100% 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-cell_select-before .weui-cell__hd:before {\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 6px;\r\n  width: 6px;\r\n  border-width: 2px 2px 0 0;\r\n  border-color: #C8C8CD;\r\n  border-style: solid;\r\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n  position: relative;\r\n  top: -2px;\r\n  position: absolute;\r\n  top: 50%;\r\n  right: 15px;\r\n  margin-top: -4px;\r\n}\r\n.weui-cell_select-before .weui-cell__bd {\r\n  padding-left: 15px;\r\n}\r\n.weui-cell_select-before .weui-cell__bd:after {\r\n  display: none;\r\n}\r\n.weui-cell_select-after {\r\n  padding-left: 15px;\r\n}\r\n.weui-cell_select-after .weui-select {\r\n  padding-left: 0;\r\n}\r\n.weui-cell_vcode {\r\n  padding-top: 0;\r\n  padding-right: 0;\r\n  padding-bottom: 0;\r\n}\r\n.weui-vcode-img {\r\n  margin-left: 5px;\r\n  height: 45px;\r\n  vertical-align: middle;\r\n}\r\n.weui-vcode-btn {\r\n  display: inline-block;\r\n  height: 45px;\r\n  margin-left: 5px;\r\n  padding: 0 0.6em 0 0.7em;\r\n  border-left: 1px solid #E5E5E5;\r\n  line-height: 45px;\r\n  vertical-align: middle;\r\n  font-size: 17px;\r\n  color: #3CC51F;\r\n}\r\nbutton.weui-vcode-btn {\r\n  background-color: transparent;\r\n  border-top: 0;\r\n  border-right: 0;\r\n  border-bottom: 0;\r\n  outline: 0;\r\n}\r\n.weui-vcode-btn:active {\r\n  color: #52a341;\r\n}\r\n.weui-gallery {\r\n  display: none;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: #000000;\r\n  z-index: 1000;\r\n}\r\n.weui-gallery__img {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 60px;\r\n  left: 0;\r\n  background: center center no-repeat;\r\n  background-size: contain;\r\n}\r\n.weui-gallery__opr {\r\n  position: absolute;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: #0D0D0D;\r\n  color: #FFFFFF;\r\n  line-height: 60px;\r\n  text-align: center;\r\n}\r\n.weui-gallery__del {\r\n  display: block;\r\n}\r\n.weui-cell_switch {\r\n  padding-top: 6.5px;\r\n  padding-bottom: 6.5px;\r\n}\r\n.weui-switch {\r\n  -webkit-appearance: none;\r\n          appearance: none;\r\n}\r\n.weui-switch,\r\n.weui-switch-cp__box {\r\n  position: relative;\r\n  width: 52px;\r\n  height: 32px;\r\n  border: 1px solid #DFDFDF;\r\n  outline: 0;\r\n  border-radius: 16px;\r\n  box-sizing: border-box;\r\n  background-color: #DFDFDF;\r\n  -webkit-transition: background-color 0.1s, border 0.1s;\r\n  transition: background-color 0.1s, border 0.1s;\r\n}\r\n.weui-switch:before,\r\n.weui-switch-cp__box:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 50px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  background-color: #FDFDFD;\r\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n  transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1), -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n}\r\n.weui-switch:after,\r\n.weui-switch-cp__box:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  background-color: #FFFFFF;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\r\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n  transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35), -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n}\r\n.weui-switch:checked,\r\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box {\r\n  border-color: #04BE02;\r\n  background-color: #04BE02;\r\n}\r\n.weui-switch:checked:before,\r\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:before {\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n}\r\n.weui-switch:checked:after,\r\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {\r\n  -webkit-transform: translateX(20px);\r\n          transform: translateX(20px);\r\n}\r\n.weui-switch-cp__input {\r\n  position: absolute;\r\n  left: -9999px;\r\n}\r\n.weui-switch-cp__box {\r\n  display: block;\r\n}\r\n.weui-uploader__hd {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  padding-bottom: 10px;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-uploader__title {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-uploader__info {\r\n  color: #B2B2B2;\r\n}\r\n.weui-uploader__bd {\r\n  margin-bottom: -4px;\r\n  margin-right: -9px;\r\n  overflow: hidden;\r\n}\r\n.weui-uploader__files {\r\n  list-style: none;\r\n}\r\n.weui-uploader__file {\r\n  float: left;\r\n  margin-right: 9px;\r\n  margin-bottom: 9px;\r\n  width: 79px;\r\n  height: 79px;\r\n  background: no-repeat center center;\r\n  background-size: cover;\r\n}\r\n.weui-uploader__file_status {\r\n  position: relative;\r\n}\r\n.weui-uploader__file_status:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n}\r\n.weui-uploader__file_status .weui-uploader__file-content {\r\n  display: block;\r\n}\r\n.weui-uploader__file-content {\r\n  display: none;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  color: #FFFFFF;\r\n}\r\n.weui-uploader__file-content .weui-icon-warn {\r\n  display: inline-block;\r\n}\r\n.weui-uploader__input-box {\r\n  float: left;\r\n  position: relative;\r\n  margin-right: 9px;\r\n  margin-bottom: 9px;\r\n  width: 77px;\r\n  height: 77px;\r\n  border: 1px solid #D9D9D9;\r\n}\r\n.weui-uploader__input-box:before,\r\n.weui-uploader__input-box:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  background-color: #D9D9D9;\r\n}\r\n.weui-uploader__input-box:before {\r\n  width: 2px;\r\n  height: 39.5px;\r\n}\r\n.weui-uploader__input-box:after {\r\n  width: 39.5px;\r\n  height: 2px;\r\n}\r\n.weui-uploader__input-box:active {\r\n  border-color: #999999;\r\n}\r\n.weui-uploader__input-box:active:before,\r\n.weui-uploader__input-box:active:after {\r\n  background-color: #999999;\r\n}\r\n.weui-uploader__input {\r\n  position: absolute;\r\n  z-index: 1;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  opacity: 0;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-msg {\r\n  padding-top: 36px;\r\n  text-align: center;\r\n}\r\n.weui-msg__icon-area {\r\n  margin-bottom: 30px;\r\n}\r\n.weui-msg__text-area {\r\n  margin-bottom: 25px;\r\n  padding: 0 20px;\r\n}\r\n.weui-msg__text-area a {\r\n  color: #586C94;\r\n}\r\n.weui-msg__title {\r\n  margin-bottom: 5px;\r\n  font-weight: 400;\r\n  font-size: 20px;\r\n}\r\n.weui-msg__desc {\r\n  font-size: 14px;\r\n  color: #999999;\r\n}\r\n.weui-msg__opr-area {\r\n  margin-bottom: 25px;\r\n}\r\n.weui-msg__extra-area {\r\n  margin-bottom: 15px;\r\n  font-size: 14px;\r\n  color: #999999;\r\n}\r\n.weui-msg__extra-area a {\r\n  color: #586C94;\r\n}\r\n@media screen and (min-height: 438px) {\r\n  .weui-msg__extra-area {\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n}\r\n.weui-article {\r\n  padding: 20px 15px;\r\n  font-size: 15px;\r\n}\r\n.weui-article section {\r\n  margin-bottom: 1.5em;\r\n}\r\n.weui-article h1 {\r\n  font-size: 18px;\r\n  font-weight: 400;\r\n  margin-bottom: .9em;\r\n}\r\n.weui-article h2 {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  margin-bottom: .34em;\r\n}\r\n.weui-article h3 {\r\n  font-weight: 400;\r\n  font-size: 15px;\r\n  margin-bottom: .34em;\r\n}\r\n.weui-article * {\r\n  max-width: 100%;\r\n  box-sizing: border-box;\r\n  word-wrap: break-word;\r\n}\r\n.weui-article p {\r\n  margin: 0 0 .8em;\r\n}\r\n.weui-tabbar {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  position: absolute;\r\n  z-index: 500;\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #F7F7FA;\r\n}\r\n.weui-tabbar:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #C0BFC4;\r\n  color: #C0BFC4;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-tabbar__item {\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  padding: 5px 0 0;\r\n  font-size: 0;\r\n  color: #999999;\r\n  text-align: center;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,\r\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,\r\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {\r\n  color: #09BB07;\r\n}\r\n.weui-tabbar__icon {\r\n  display: inline-block;\r\n  width: 27px;\r\n  height: 27px;\r\n}\r\ni.weui-tabbar__icon,\r\n.weui-tabbar__icon > i {\r\n  font-size: 24px;\r\n  color: #999999;\r\n}\r\n.weui-tabbar__icon img {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.weui-tabbar__label {\r\n  text-align: center;\r\n  color: #999999;\r\n  font-size: 10px;\r\n  line-height: 1.8;\r\n}\r\n.weui-navbar {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  position: absolute;\r\n  z-index: 500;\r\n  top: 0;\r\n  width: 100%;\r\n  background-color: #FAFAFA;\r\n}\r\n.weui-navbar:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #CCCCCC;\r\n  color: #CCCCCC;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-navbar + .weui-tab__panel {\r\n  padding-top: 50px;\r\n  padding-bottom: 0;\r\n}\r\n.weui-navbar__item {\r\n  position: relative;\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  padding: 13px 0;\r\n  text-align: center;\r\n  font-size: 15px;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-navbar__item:active {\r\n  background-color: #EDEDED;\r\n}\r\n.weui-navbar__item.weui-bar__item_on {\r\n  background-color: #EAEAEA;\r\n}\r\n.weui-navbar__item:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-right: 1px solid #CCCCCC;\r\n  color: #CCCCCC;\r\n  -webkit-transform-origin: 100% 0;\r\n          transform-origin: 100% 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-navbar__item:last-child:after {\r\n  display: none;\r\n}\r\n.weui-tab {\r\n  position: relative;\r\n  height: 100%;\r\n}\r\n.weui-tab__panel {\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n  padding-bottom: 50px;\r\n  overflow: auto;\r\n  -webkit-overflow-scrolling: touch;\r\n}\r\n.weui-tab__content {\r\n  display: none;\r\n}\r\n.weui-progress {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-progress__bar {\r\n  background-color: #EBEBEB;\r\n  height: 3px;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-progress__inner-bar {\r\n  width: 0;\r\n  height: 100%;\r\n  background-color: #09BB07;\r\n}\r\n.weui-progress__opr {\r\n  display: block;\r\n  margin-left: 15px;\r\n  font-size: 0;\r\n}\r\n.weui-panel {\r\n  background-color: #FFFFFF;\r\n  margin-top: 10px;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.weui-panel:first-child {\r\n  margin-top: 0;\r\n}\r\n.weui-panel:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-panel:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-panel__hd {\r\n  padding: 14px 15px 10px;\r\n  color: #999999;\r\n  font-size: 13px;\r\n  position: relative;\r\n}\r\n.weui-panel__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-media-box {\r\n  padding: 15px;\r\n  position: relative;\r\n}\r\n.weui-media-box:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-media-box:first-child:before {\r\n  display: none;\r\n}\r\na.weui-media-box {\r\n  color: #000000;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\na.weui-media-box:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-media-box__title {\r\n  font-weight: 400;\r\n  font-size: 17px;\r\n  width: auto;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  word-wrap: normal;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n}\r\n.weui-media-box__desc {\r\n  color: #999999;\r\n  font-size: 13px;\r\n  line-height: 1.2;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 2;\r\n}\r\n.weui-media-box__info {\r\n  margin-top: 15px;\r\n  padding-bottom: 5px;\r\n  font-size: 13px;\r\n  color: #CECECE;\r\n  line-height: 1em;\r\n  list-style: none;\r\n  overflow: hidden;\r\n}\r\n.weui-media-box__info__meta {\r\n  float: left;\r\n  padding-right: 1em;\r\n}\r\n.weui-media-box__info__meta_extra {\r\n  padding-left: 1em;\r\n  border-left: 1px solid #CECECE;\r\n}\r\n.weui-media-box_text .weui-media-box__title {\r\n  margin-bottom: 8px;\r\n}\r\n.weui-media-box_appmsg {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-media-box_appmsg .weui-media-box__hd {\r\n  margin-right: .8em;\r\n  width: 60px;\r\n  height: 60px;\r\n  line-height: 60px;\r\n  text-align: center;\r\n}\r\n.weui-media-box_appmsg .weui-media-box__thumb {\r\n  width: 100%;\r\n  max-height: 100%;\r\n  vertical-align: top;\r\n}\r\n.weui-media-box_appmsg .weui-media-box__bd {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  min-width: 0;\r\n}\r\n.weui-media-box_small-appmsg {\r\n  padding: 0;\r\n}\r\n.weui-media-box_small-appmsg .weui-cells {\r\n  margin-top: 0;\r\n}\r\n.weui-media-box_small-appmsg .weui-cells:before {\r\n  display: none;\r\n}\r\n.weui-grids {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.weui-grids:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-grids:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-grid {\r\n  position: relative;\r\n  float: left;\r\n  padding: 20px 10px;\r\n  width: 33.33333333%;\r\n  box-sizing: border-box;\r\n}\r\n.weui-grid:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-right: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 100% 0;\r\n          transform-origin: 100% 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-grid:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-grid:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-grid__icon {\r\n  width: 28px;\r\n  height: 28px;\r\n  margin: 0 auto;\r\n}\r\n.weui-grid__icon img {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.weui-grid__icon + .weui-grid__label {\r\n  margin-top: 5px;\r\n}\r\n.weui-grid__label {\r\n  display: block;\r\n  text-align: center;\r\n  color: #000000;\r\n  font-size: 14px;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n}\r\n.weui-footer {\r\n  color: #999999;\r\n  font-size: 14px;\r\n  text-align: center;\r\n}\r\n.weui-footer a {\r\n  color: #586C94;\r\n}\r\n.weui-footer_fixed-bottom {\r\n  position: fixed;\r\n  bottom: .52em;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n.weui-footer__links {\r\n  font-size: 0;\r\n}\r\n.weui-footer__link {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  margin: 0 .62em;\r\n  position: relative;\r\n  font-size: 14px;\r\n}\r\n.weui-footer__link:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #C7C7C7;\r\n  color: #C7C7C7;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n  left: -0.65em;\r\n  top: .36em;\r\n  bottom: .36em;\r\n}\r\n.weui-footer__link:first-child:before {\r\n  display: none;\r\n}\r\n.weui-footer__text {\r\n  padding: 0 .34em;\r\n  font-size: 12px;\r\n}\r\n.weui-flex {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-flex__item {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-dialog {\r\n  position: fixed;\r\n  z-index: 5000;\r\n  width: 80%;\r\n  max-width: 300px;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  background-color: #FFFFFF;\r\n  text-align: center;\r\n  border-radius: 3px;\r\n  overflow: hidden;\r\n}\r\n.weui-dialog__hd {\r\n  padding: 1.3em 1.6em 0.5em;\r\n}\r\n.weui-dialog__title {\r\n  font-weight: 400;\r\n  font-size: 18px;\r\n}\r\n.weui-dialog__bd {\r\n  padding: 0 1.6em 0.8em;\r\n  min-height: 40px;\r\n  font-size: 15px;\r\n  line-height: 1.3;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n  color: #999999;\r\n}\r\n.weui-dialog__bd:first-child {\r\n  padding: 2.7em 20px 1.7em;\r\n  color: #353535;\r\n}\r\n.weui-dialog__ft {\r\n  position: relative;\r\n  line-height: 48px;\r\n  font-size: 18px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-dialog__ft:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-dialog__btn {\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  color: #3CC51F;\r\n  text-decoration: none;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.weui-dialog__btn:active {\r\n  background-color: #EEEEEE;\r\n}\r\n.weui-dialog__btn:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-dialog__btn:first-child:after {\r\n  display: none;\r\n}\r\n.weui-dialog__btn_default {\r\n  color: #353535;\r\n}\r\n.weui-dialog__btn_primary {\r\n  color: #0BB20C;\r\n}\r\n.weui-skin_android .weui-dialog {\r\n  text-align: left;\r\n  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\r\n}\r\n.weui-skin_android .weui-dialog__title {\r\n  font-size: 21px;\r\n}\r\n.weui-skin_android .weui-dialog__hd {\r\n  text-align: left;\r\n}\r\n.weui-skin_android .weui-dialog__bd {\r\n  color: #999999;\r\n  padding: 0.25em 1.6em 2em;\r\n  font-size: 17px;\r\n  text-align: left;\r\n}\r\n.weui-skin_android .weui-dialog__bd:first-child {\r\n  padding: 1.6em 1.6em 2em;\r\n  color: #353535;\r\n}\r\n.weui-skin_android .weui-dialog__ft {\r\n  display: block;\r\n  text-align: right;\r\n  line-height: 42px;\r\n  font-size: 16px;\r\n  padding: 0 1.6em 0.7em;\r\n}\r\n.weui-skin_android .weui-dialog__ft:after {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-dialog__btn {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  padding: 0 .8em;\r\n}\r\n.weui-skin_android .weui-dialog__btn:after {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-dialog__btn:active {\r\n  background-color: rgba(0, 0, 0, 0.06);\r\n}\r\n.weui-skin_android .weui-dialog__btn:visited {\r\n  background-color: rgba(0, 0, 0, 0.06);\r\n}\r\n.weui-skin_android .weui-dialog__btn:last-child {\r\n  margin-right: -0.8em;\r\n}\r\n.weui-skin_android .weui-dialog__btn_default {\r\n  color: #808080;\r\n}\r\n@media screen and (min-width: 1024px) {\r\n  .weui-dialog {\r\n    width: 35%;\r\n  }\r\n}\r\n.weui-toast {\r\n  position: fixed;\r\n  z-index: 5000;\r\n  width: 7.6em;\r\n  min-height: 7.6em;\r\n  top: 180px;\r\n  left: 50%;\r\n  margin-left: -3.8em;\r\n  background: rgba(17, 17, 17, 0.7);\r\n  text-align: center;\r\n  border-radius: 5px;\r\n  color: #FFFFFF;\r\n}\r\n.weui-icon_toast {\r\n  margin: 22px 0 0;\r\n  display: block;\r\n}\r\n.weui-icon_toast.weui-icon-success-no-circle:before {\r\n  color: #FFFFFF;\r\n  font-size: 55px;\r\n}\r\n.weui-icon_toast.weui-loading {\r\n  margin: 30px 0 0;\r\n  width: 38px;\r\n  height: 38px;\r\n  vertical-align: baseline;\r\n}\r\n.weui-toast__content {\r\n  margin: 0 0 15px;\r\n}\r\n.weui-mask {\r\n  position: fixed;\r\n  z-index: 1000;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.6);\r\n}\r\n.weui-mask_transparent {\r\n  position: fixed;\r\n  z-index: 1000;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n}\r\n.weui-actionsheet {\r\n  position: fixed;\r\n  left: 0;\r\n  bottom: 0;\r\n  -webkit-transform: translate(0, 100%);\r\n          transform: translate(0, 100%);\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  z-index: 5000;\r\n  width: 100%;\r\n  background-color: #EFEFF4;\r\n  -webkit-transition: -webkit-transform .3s;\r\n  transition: -webkit-transform .3s;\r\n  transition: transform .3s;\r\n  transition: transform .3s, -webkit-transform .3s;\r\n}\r\n.weui-actionsheet__title {\r\n  position: relative;\r\n  height: 65px;\r\n  padding: 0 20px;\r\n  line-height: 1.4;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n  -webkit-justify-content: center;\r\n          justify-content: center;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -webkit-flex-direction: column;\r\n          flex-direction: column;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  color: #888;\r\n  background: #FCFCFD;\r\n}\r\n.weui-actionsheet__title:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-actionsheet__title .weui-actionsheet__title-text {\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 2;\r\n}\r\n.weui-actionsheet__menu {\r\n  background-color: #FCFCFD;\r\n}\r\n.weui-actionsheet__action {\r\n  margin-top: 6px;\r\n  background-color: #FCFCFD;\r\n}\r\n.weui-actionsheet__cell {\r\n  position: relative;\r\n  padding: 10px 0;\r\n  text-align: center;\r\n  font-size: 18px;\r\n}\r\n.weui-actionsheet__cell:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #e5e5e5;\r\n  color: #e5e5e5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-actionsheet__cell:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-actionsheet__cell:first-child:before {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-actionsheet {\r\n  position: fixed;\r\n  left: 50%;\r\n  top: 50%;\r\n  bottom: auto;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  width: 274px;\r\n  box-sizing: border-box;\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  background: transparent;\r\n  -webkit-transition: -webkit-transform .3s;\r\n  transition: -webkit-transform .3s;\r\n  transition: transform .3s;\r\n  transition: transform .3s, -webkit-transform .3s;\r\n}\r\n.weui-skin_android .weui-actionsheet__action {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-actionsheet__menu {\r\n  border-radius: 2px;\r\n  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\r\n}\r\n.weui-skin_android .weui-actionsheet__cell {\r\n  padding: 13px 24px;\r\n  font-size: 16px;\r\n  line-height: 1.4;\r\n  text-align: left;\r\n}\r\n.weui-skin_android .weui-actionsheet__cell:first-child {\r\n  border-top-left-radius: 2px;\r\n  border-top-right-radius: 2px;\r\n}\r\n.weui-skin_android .weui-actionsheet__cell:last-child {\r\n  border-bottom-left-radius: 2px;\r\n  border-bottom-right-radius: 2px;\r\n}\r\n.weui-actionsheet_toggle {\r\n  -webkit-transform: translate(0, 0);\r\n          transform: translate(0, 0);\r\n}\r\n.weui-loadmore {\r\n  width: 65%;\r\n  margin: 1.5em auto;\r\n  line-height: 1.6em;\r\n  font-size: 14px;\r\n  text-align: center;\r\n}\r\n.weui-loadmore__tips {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n.weui-loadmore_line {\r\n  border-top: 1px solid #E5E5E5;\r\n  margin-top: 2.4em;\r\n}\r\n.weui-loadmore_line .weui-loadmore__tips {\r\n  position: relative;\r\n  top: -0.9em;\r\n  padding: 0 .55em;\r\n  background-color: #FFFFFF;\r\n  color: #999999;\r\n}\r\n.weui-loadmore_dot .weui-loadmore__tips {\r\n  padding: 0 .16em;\r\n}\r\n.weui-loadmore_dot .weui-loadmore__tips:before {\r\n  content: \" \";\r\n  width: 4px;\r\n  height: 4px;\r\n  border-radius: 50%;\r\n  background-color: #E5E5E5;\r\n  display: inline-block;\r\n  position: relative;\r\n  vertical-align: 0;\r\n  top: -0.16em;\r\n}\r\n.weui-badge {\r\n  display: inline-block;\r\n  padding: .15em .4em;\r\n  min-width: 8px;\r\n  border-radius: 18px;\r\n  background-color: #F43530;\r\n  color: #FFFFFF;\r\n  line-height: 1.2;\r\n  text-align: center;\r\n  font-size: 12px;\r\n  vertical-align: middle;\r\n}\r\n.weui-badge_dot {\r\n  padding: .4em;\r\n  min-width: 0;\r\n}\r\n.weui-search-bar {\r\n  position: relative;\r\n  padding: 8px 10px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  background-color: #EFEFF4;\r\n}\r\n.weui-search-bar:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D7D6DC;\r\n  color: #D7D6DC;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-search-bar:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D7D6DC;\r\n  color: #D7D6DC;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn {\r\n  display: block;\r\n}\r\n.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label {\r\n  display: none;\r\n}\r\n.weui-search-bar__form {\r\n  position: relative;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: auto;\r\n          flex: auto;\r\n  background-color: #EFEFF4;\r\n}\r\n.weui-search-bar__form:after {\r\n  content: '';\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 200%;\r\n  height: 200%;\r\n  -webkit-transform: scale(0.5);\r\n          transform: scale(0.5);\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  border-radius: 10px;\r\n  border: 1px solid #E6E6EA;\r\n  box-sizing: border-box;\r\n  background: #FFFFFF;\r\n}\r\n.weui-search-bar__box {\r\n  position: relative;\r\n  padding-left: 30px;\r\n  padding-right: 30px;\r\n  height: 100%;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  z-index: 1;\r\n}\r\n.weui-search-bar__box .weui-search-bar__input {\r\n  padding: 4px 0;\r\n  width: 100%;\r\n  height: 1.42857143em;\r\n  border: 0;\r\n  font-size: 14px;\r\n  line-height: 1.42857143em;\r\n  box-sizing: content-box;\r\n  background: transparent;\r\n}\r\n.weui-search-bar__box .weui-search-bar__input:focus {\r\n  outline: none;\r\n}\r\n.weui-search-bar__box .weui-icon-search {\r\n  position: absolute;\r\n  left: 10px;\r\n  top: 0;\r\n  line-height: 28px;\r\n}\r\n.weui-search-bar__box .weui-icon-clear {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  padding: 0 10px;\r\n  line-height: 28px;\r\n}\r\n.weui-search-bar__label {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 1px;\r\n  bottom: 1px;\r\n  left: 1px;\r\n  z-index: 2;\r\n  border-radius: 3px;\r\n  text-align: center;\r\n  color: #9B9B9B;\r\n  background: #FFFFFF;\r\n}\r\n.weui-search-bar__label span {\r\n  display: inline-block;\r\n  font-size: 14px;\r\n  vertical-align: middle;\r\n}\r\n.weui-search-bar__label .weui-icon-search {\r\n  margin-right: 5px;\r\n}\r\n.weui-search-bar__cancel-btn {\r\n  display: none;\r\n  margin-left: 10px;\r\n  line-height: 28px;\r\n  color: #09BB07;\r\n  white-space: nowrap;\r\n}\r\n.weui-search-bar__input:not(:valid) ~ .weui-icon-clear {\r\n  display: none;\r\n}\r\ninput[type=\"search\"]::-webkit-search-decoration,\r\ninput[type=\"search\"]::-webkit-search-cancel-button,\r\ninput[type=\"search\"]::-webkit-search-results-button,\r\ninput[type=\"search\"]::-webkit-search-results-decoration {\r\n  display: none;\r\n}\r\n.weui-picker {\r\n  position: fixed;\r\n  width: 100%;\r\n  left: 0;\r\n  bottom: 0;\r\n  z-index: 5000;\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  -webkit-transform: translate(0, 100%);\r\n          transform: translate(0, 100%);\r\n  -webkit-transition: -webkit-transform .3s;\r\n  transition: -webkit-transform .3s;\r\n  transition: transform .3s;\r\n  transition: transform .3s, -webkit-transform .3s;\r\n}\r\n.weui-picker__hd {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  padding: 9px 15px;\r\n  background-color: #fff;\r\n  position: relative;\r\n  text-align: center;\r\n  font-size: 17px;\r\n}\r\n.weui-picker__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-picker__action {\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  color: #1AAD19;\r\n}\r\n.weui-picker__action:first-child {\r\n  text-align: left;\r\n  color: #888;\r\n}\r\n.weui-picker__action:last-child {\r\n  text-align: right;\r\n}\r\n.weui-picker__bd {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  position: relative;\r\n  background-color: #fff;\r\n  height: 238px;\r\n  overflow: hidden;\r\n}\r\n.weui-picker__group {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  position: relative;\r\n  height: 100%;\r\n}\r\n.weui-picker__mask {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0 auto;\r\n  z-index: 3;\r\n  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n  background-position: top, bottom;\r\n  background-size: 100% 102px;\r\n  background-repeat: no-repeat;\r\n  -webkit-transform: translateZ(0);\r\n          transform: translateZ(0);\r\n}\r\n.weui-picker__indicator {\r\n  width: 100%;\r\n  height: 34px;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 102px;\r\n  z-index: 3;\r\n}\r\n.weui-picker__indicator:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-picker__indicator:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-picker__content {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n}\r\n.weui-picker__item {\r\n  padding: 0;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  color: #000;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n.weui-picker__item_disabled {\r\n  color: #999999;\r\n}\r\n@-webkit-keyframes slideUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n@keyframes slideUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n.weui-animate-slide-up {\r\n  -webkit-animation: slideUp ease .3s forwards;\r\n          animation: slideUp ease .3s forwards;\r\n}\r\n@-webkit-keyframes slideDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n@keyframes slideDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n.weui-animate-slide-down {\r\n  -webkit-animation: slideDown ease .3s forwards;\r\n          animation: slideDown ease .3s forwards;\r\n}\r\n@-webkit-keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n.weui-animate-fade-in {\r\n  -webkit-animation: fadeIn ease .3s forwards;\r\n          animation: fadeIn ease .3s forwards;\r\n}\r\n@-webkit-keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n@keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n.weui-animate-fade-out {\r\n  -webkit-animation: fadeOut ease .3s forwards;\r\n          animation: fadeOut ease .3s forwards;\r\n}\r\n.weui-agree {\r\n  display: block;\r\n  padding: .5em 15px;\r\n  font-size: 13px;\r\n}\r\n.weui-agree a {\r\n  color: #586C94;\r\n}\r\n.weui-agree__text {\r\n  color: #999999;\r\n}\r\n.weui-agree__checkbox {\r\n  -webkit-appearance: none;\r\n          appearance: none;\r\n  outline: 0;\r\n  font-size: 0;\r\n  border: 1px solid #D1D1D1;\r\n  background-color: #FFFFFF;\r\n  border-radius: 3px;\r\n  width: 13px;\r\n  height: 13px;\r\n  position: relative;\r\n  vertical-align: 0;\r\n  top: 2px;\r\n}\r\n.weui-agree__checkbox:checked:before {\r\n  font-family: \"weui\";\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-variant: normal;\r\n  text-transform: none;\r\n  text-align: center;\r\n  speak: none;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  text-decoration: inherit;\r\n  content: \"\\EA08\";\r\n  color: #09BB07;\r\n  font-size: 13px;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\r\n          transform: translate(-50%, -48%) scale(0.73);\r\n}\r\n.weui-agree__checkbox:disabled {\r\n  background-color: #E1E1E1;\r\n}\r\n.weui-agree__checkbox:disabled:before {\r\n  color: #ADADAD;\r\n}\r\n.weui-loading {\r\n  width: 20px;\r\n  height: 20px;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\r\n          animation: weuiLoading 1s steps(12, end) infinite;\r\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;\r\n  background-size: 100%;\r\n}\r\n.weui-loading.weui-loading_transparent,\r\n.weui-btn_loading.weui-btn_primary .weui-loading,\r\n.weui-btn_loading.weui-btn_warn .weui-loading {\r\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\");\r\n}\r\n@-webkit-keyframes weuiLoading {\r\n  0% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n            transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\r\n            transform: rotate3d(0, 0, 1, 360deg);\r\n  }\r\n}\r\n@keyframes weuiLoading {\r\n  0% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n            transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\r\n            transform: rotate3d(0, 0, 1, 360deg);\r\n  }\r\n}\r\n.weui-slider {\r\n  padding: 15px 18px;\r\n  -webkit-user-select: none;\r\n          user-select: none;\r\n}\r\n.weui-slider__inner {\r\n  position: relative;\r\n  height: 2px;\r\n  background-color: #E9E9E9;\r\n}\r\n.weui-slider__track {\r\n  height: 2px;\r\n  background-color: #1AAD19;\r\n  width: 0;\r\n}\r\n.weui-slider__handler {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 50%;\r\n  width: 28px;\r\n  height: 28px;\r\n  margin-left: -14px;\r\n  margin-top: -14px;\r\n  border-radius: 50%;\r\n  background-color: #FFFFFF;\r\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\r\n}\r\n.weui-slider-box {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-slider-box .weui-slider {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-slider-box__value {\r\n  margin-left: .5em;\r\n  min-width: 24px;\r\n  color: #888888;\r\n  text-align: center;\r\n  font-size: 14px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\np[data-v-079bd769] {\n  font-size: 100px;\n  background-color: #0000CC;\n}\n", "", {"version":3,"sources":["D:/xampp/htdocs/angular/0410/vue&webpack/components/index.vue"],"names":[],"mappings":";AAAA;EACE,iBAAiB;EACjB,0BAA0B;CAAE","file":"index.vue","sourcesContent":["p {\n  font-size: 100px;\n  background-color: #0000CC; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\np[data-v-0e0b4f18] {\n  font-size: 50px;\n  background-color: #0000CC;\n}\n", "", {"version":3,"sources":["D:/xampp/htdocs/angular/0410/vue&webpack/components/home.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,0BAA0B;CAC3B","file":"home.vue","sourcesContent":["p {\n  font-size: 50px;\n  background-color: #0000CC;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"weui.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<p>123<span>456</span><span>789</span></p>";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('p', [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), _c('p', [_vm._v("hello world")]), _vm._v(" "), _c('p', [_vm._v("456")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-079bd769", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('p', [_vm._v("第二页")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0e0b4f18", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('article', {
    staticClass: "weui-article"
  }, [_c('h1', [_vm._v("大标题")]), _vm._v(" "), _c('section', [_c('h2', {
    staticClass: "title"
  }, [_vm._v("章标题")]), _vm._v(" "), _c('section', [_c('h3', [_vm._v("1.1 节标题")]), _vm._v(" "), _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.html)
    }
  }), _vm._v(" "), _c('p', [_vm._v("\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\t\t\t\t")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": _vm.src,
      "alt": ""
    }
  })])]), _vm._v(" "), _vm._m(0)])]), _vm._v(" "), _vm._m(1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('h3', [_vm._v("1.2 节标题")]), _vm._v(" "), _c('p', [_vm._v("\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-panel weui-panel_access"
  }, [_c('div', {
    staticClass: "weui-panel__hd"
  }, [_vm._v("图文组合列表")]), _vm._v(" "), _c('div', {
    staticClass: "weui-panel__bd"
  }, [_c('a', {
    staticClass: "weui-media-box weui-media-box_appmsg",
    attrs: {
      "href": "javascript:void(0);"
    }
  }, [_c('div', {
    staticClass: "weui-media-box__hd"
  }, [_c('img', {
    staticClass: "weui-media-box__thumb",
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "weui-media-box__bd"
  }, [_c('h4', {
    staticClass: "weui-media-box__title"
  }, [_vm._v("标题一")]), _vm._v(" "), _c('p', {
    staticClass: "weui-media-box__desc"
  }, [_vm._v("由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。")])])]), _vm._v(" "), _c('a', {
    staticClass: "weui-media-box weui-media-box_appmsg",
    attrs: {
      "href": "javascript:void(0);"
    }
  }, [_c('div', {
    staticClass: "weui-media-box__hd"
  }, [_c('img', {
    staticClass: "weui-media-box__thumb",
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "weui-media-box__bd"
  }, [_c('h4', {
    staticClass: "weui-media-box__title"
  }, [_vm._v("标题二")]), _vm._v(" "), _c('p', {
    staticClass: "weui-media-box__desc"
  }, [_vm._v("由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。")])])])]), _vm._v(" "), _c('div', {
    staticClass: "weui-panel__ft"
  }, [_c('a', {
    staticClass: "weui-cell weui-cell_access weui-cell_link",
    attrs: {
      "href": "javascript:void(0);"
    }
  }, [_c('div', {
    staticClass: "weui-cell__bd"
  }, [_vm._v("查看更多")]), _vm._v(" "), _c('span', {
    staticClass: "weui-cell__ft"
  })])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-211dc29b", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("089fc65f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/.0.28.1@css-loader/index.js?sourceMap!../node_modules/.12.0.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-079bd769\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/.6.0.3@sass-loader/lib/loader.js!../node_modules/.12.0.3@vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../node_modules/.0.28.1@css-loader/index.js?sourceMap!../node_modules/.12.0.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-079bd769\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/.6.0.3@sass-loader/lib/loader.js!../node_modules/.12.0.3@vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4a2f0063", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/.0.28.1@css-loader/index.js?sourceMap!../node_modules/.12.0.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0e0b4f18\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/.4.0.3@less-loader/dist/index.js!../node_modules/.12.0.3@vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../node_modules/.0.28.1@css-loader/index.js?sourceMap!../node_modules/.12.0.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0e0b4f18\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/.4.0.3@less-loader/dist/index.js!../node_modules/.12.0.3@vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c1235eec", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/.0.28.1@css-loader/index.js?sourceMap!../node_modules/.12.0.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-211dc29b\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/.12.0.3@vue-loader/lib/selector.js?type=styles&index=0!./weui.vue", function() {
     var newContent = require("!!../node_modules/.0.28.1@css-loader/index.js?sourceMap!../node_modules/.12.0.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-211dc29b\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/.12.0.3@vue-loader/lib/selector.js?type=styles&index=0!./weui.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(10);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(4);

var _vueRouter = __webpack_require__(9);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default; //var $ = require("jquery");
//require  module.exports
//import export

//require("weui");
//cnpm install vue
var Vue = __webpack_require__(8);
//import Vue from "vue";
//cnpm install vue-router

Vue.use(_vueRouter2.default);
//组件
var index = __webpack_require__(6);
var home = __webpack_require__(5);
var weui = __webpack_require__(7);

var router = new _vueRouter2.default({
	routes: [{
		path: "/index",
		component: index
	}, {
		path: "/home",
		component: home
	}, {
		path: "/weui",
		component: weui
	}]
});

new Vue({
	el: "#demo",
	template: "\n\t\t<div>\n\t\t\t<p>{{name}}</p>\n\t\t\t<a href=\"#/index\">a</a>\n\t\t\t<a href=\"#/home\">b</a>\n\t\t\t<a href=\"#/weui\">c</a>\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t",
	router: router,
	data: {
		name: "wscats"
	}
});

//vue vue-loader vue-resource vuex ui es6 webpack/gulp sass/less jquery/zepto

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//

//export default = module.exports
exports.default = {
	mounted: function mounted() {
		$("p").css("color", "red");
	}
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//

module.exports = {
	data: function data() {
		return {
			name: "第一页de"
		};
	},
	mounted: function mounted() {
		$("p").css("color", "red");
	}
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	data: function data() {
		return {
			src: __webpack_require__(17),
			html: __webpack_require__(16)
		};
	}
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map