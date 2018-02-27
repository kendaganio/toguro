(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var htmlTags = ['input', 'label', 'div', 'form', 'fieldset'];

var fragment = function fragment(children) {
  var fragment = document.createDocumentFragment();
  children.forEach(function (child) {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    fragment.appendChild(child);
  });
  return fragment;
};

var createElement = function createElement(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var el = document.createElement(tag);
  Object.keys(attrs).forEach(function (attr) {
    if (typeof attrs[attr] === 'string') {
      el.setAttribute(attr, attrs[attr]);
    } else if (typeof attrs[attr] === 'function') {
      el[attr] = attrs[attr];
    }
  });

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  el.appendChild(fragment(children));
  return el;
};

var tagFactory = function tagFactory(tag, attrs) {
  return function (attrs) {
    for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      children[_key2 - 1] = arguments[_key2];
    }

    return createElement.apply(void 0, [tag, attrs].concat(children));
  };
};

var functions = {};
htmlTags.forEach(function (tag) {
  functions[tag] = tagFactory(tag);
});
module.exports = _extends({}, functions, {
  fragment: fragment
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toguro = void 0;

var _renderers = _interopRequireDefault(__webpack_require__(/*! ./renderers */ "./src/renderers.js"));

var _dom = _interopRequireDefault(__webpack_require__(/*! ./dom */ "./src/dom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var whatInputType = {
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
};

var createFormGroup = function createFormGroup(key, value) {
  var type = whatInputType[value.type];
  var rendered = (0, _renderers.default)(type)(_extends({}, value, {
    key: key,
    type: type
  }));
  return _dom.default.div({
    class: 'form-group'
  }, rendered);
};

var Toguro =
/*#__PURE__*/
function () {
  function Toguro(options) {
    _classCallCheck(this, Toguro);

    this.schema = options.schema;
    this.submit = options.submit;
  }

  _createClass(Toguro, [{
    key: "render",
    value: function render() {
      var _this = this;

      var properties = this.schema.properties;
      var elements = Object.keys(properties).map(function (key) {
        return createFormGroup(key, properties[key]);
      });

      var form = _dom.default.form({
        class: 'form'
      }, _dom.default.fieldset.apply(_dom.default, [{}].concat(_toConsumableArray(elements), [_dom.default.input({
        type: 'submit',
        class: 'button -primary'
      })])));

      form.onsubmit = function (event) {
        event.preventDefault();

        _this.submit('gago');
      };

      return form;
    }
  }, {
    key: "renderTo",
    value: function renderTo(el) {
      // eslint-disable-next-line
      if (!(el instanceof Element)) {
        throw new Error('el should be a valid HTML Element');
      }

      el.appendChild(this.render());
    }
  }]);

  return Toguro;
}();

exports.Toguro = Toguro;

/***/ }),

/***/ "./src/renderers.js":
/*!**************************!*\
  !*** ./src/renderers.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dom = _interopRequireDefault(__webpack_require__(/*! ./dom */ "./src/dom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function labelProps(props) {
  return _extends({}, props, {
    id: "".concat(props.key, "-label"),
    name: "".concat(props.key, "-label"),
    for: "".concat(props.key, "-field")
  });
}

function inputProps(props) {
  return _extends({}, props, {
    id: "".concat(props.key, "-field"),
    name: "".concat(props.key, "-field"),
    onkeyup: function onkeyup(e) {
      console.log(e.currentTarget.value);
    }
  });
}

function generic(props) {
  return _dom.default.fragment([_dom.default.label(labelProps(props), props.title), _dom.default.input(inputProps(props))]);
}

function checkbox(props) {
  return _dom.default.label(inputProps(props), _dom.default.input(labelProps(props)), props.title);
}

var _default = function _default(type) {
  switch (type) {
    case 'checkbox':
      return checkbox;

    default:
      return generic;
  }
};

exports.default = _default;

/***/ })

/******/ });
});
//# sourceMappingURL=toguro.js.map