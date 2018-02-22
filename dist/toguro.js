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
var whatInputType = {
  // 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
};

var createFormElement = function createFormElement(key, value) {
  var label = document.createElement('label');
  label.innerText = key;
  label.setAttribute('for', key + '-field');

  var input = document.createElement('input');
  input.setAttribute('type', whatInputType[value.type]);
  input.setAttribute('id', key + '-field');

  var div = document.createElement('div');
  div.appendChild(label);
  div.appendChild(input);

  return div;
};

var render = exports.render = function render(el, _ref) {
  var properties = _ref.schema.properties,
      submitHandler = _ref.submitHandler;


  // init validations
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element');
  }

  var form = document.createElement('form');

  // createElements
  Object.keys(properties).forEach(function (key) {
    console.log(key, properties[key]);
    var inputEl = createFormElement(key, properties[key]);
    form.insertAdjacentElement('beforeend', inputEl);
  });

  // add submit button
  var submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.value = 'submit';

  form.insertAdjacentElement('beforeend', submitButton);
  //
  el.insertAdjacentElement('beforeend', form);

  // createEventHandlers
  form.onsubmit = function (event) {
    event.preventDefault();
    console.log('hijacked');
    submitHandler('walang data');
  };
};

/***/ })
/******/ ]);
});