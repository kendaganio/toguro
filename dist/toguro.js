(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["toguro"] = factory();
	else
		root["toguro"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;

var _renderers = _interopRequireDefault(__webpack_require__(1));

var _dom = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var whatInputType = {
  // 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
};

var createFormElement = function createFormElement(key, value) {
  var type = whatInputType[value.type];
  var rendered = (0, _renderers.default)(type)(_extends({}, value, {
    key: key,
    type: type
  }));
  return _dom.default.div({
    class: 'form-group'
  }, rendered);
};

var render = function render(el, _ref) {
  var properties = _ref.schema.properties,
      submitHandler = _ref.submitHandler;

  // init validations
  // eslint-disable-next-line
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element');
  }

  var fieldSet = _dom.default.fieldset(); // createElements


  Object.keys(properties).forEach(function (key) {
    var inputEl = createFormElement(key, properties[key]);
    fieldSet.insertAdjacentElement('beforeend', inputEl);
  });

  var submitButton = _dom.default.input({
    type: 'submit',
    class: 'button -primary'
  });

  fieldSet.appendChild(submitButton);

  var form = _dom.default.form({
    class: 'form'
  }, fieldSet);

  el.appendChild(form); // createEventHandlers

  form.onsubmit = function (event) {
    event.preventDefault();
    submitHandler('gago');
  };
};

exports.render = render;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dom = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function labelProps(props) {
  return {
    id: "".concat(props.key, "-label"),
    name: "".concat(props.key, "-label"),
    for: "".concat(props.key, "-field")
  };
}

function inputProps(props) {
  return {
    id: "".concat(props.key, "-field"),
    name: "".concat(props.key, "-field")
  };
}

function generic(props) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(_dom.default.label(_extends({}, props, labelProps(props)), props.title));
  fragment.appendChild(_dom.default.input(_extends({}, props, inputProps(props))));
  return fragment;
}

function checkbox(props) {
  var fragment = document.createDocumentFragment();

  var checkbox = _dom.default.input(_extends({}, props, labelProps(props)));

  fragment.appendChild(_dom.default.label(_extends({}, props, inputProps(props)), checkbox, props.title));
  return fragment;
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var htmlTags = ['input', 'label', 'div', 'form', 'fieldset'];

var dom = function dom(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var el = document.createElement(tag);
  Object.keys(attrs).forEach(function (attr) {
    return el.setAttribute(attr, attrs[attr]);
  });
  var fragment = document.createDocumentFragment();

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  children.forEach(function (child) {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    fragment.appendChild(child);
  });
  el.appendChild(fragment);
  return el;
};

var tagFactory = function tagFactory(tag, attrs) {
  return function (attrs) {
    for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      children[_key2 - 1] = arguments[_key2];
    }

    return dom.apply(void 0, [tag, attrs].concat(children));
  };
};

var functions = {};
htmlTags.forEach(function (tag) {
  functions[tag] = tagFactory(tag);
});
module.exports = functions;

/***/ })
/******/ ]);
});