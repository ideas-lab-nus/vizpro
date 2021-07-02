'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ScriptTag = require('react-script-tag');
var $ = require('jquery');
var Plotly = require('plotly');
require('@fontsource/ubuntu-mono');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ScriptTag__default = /*#__PURE__*/_interopDefaultLegacy(ScriptTag);
var $__default = /*#__PURE__*/_interopDefaultLegacy($);
var Plotly__default = /*#__PURE__*/_interopDefaultLegacy(Plotly);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Create html element
 * @param {String} type html element
 * @param {Object} config
 */
function createElement(type, config) {
  const htmlElement = document.createElement(type);

  if (config === undefined) {
    return htmlElement;
  }

  if (config.className) {
    htmlElement.className = config.className;
  }

  if (config.content) {
    htmlElement.textContent = config.content;
  }

  if (config.children) {
    config.children.forEach(el => {
      if (el !== null) {
        htmlElement.appendChild(el);
      }
    });
  }

  return htmlElement;
}
/**
 * @param {Object} node
 * @return {HTMLElement}
 */


function createExpandedElement(node) {
  const iElem = createElement('i');

  if (node.expanded) {
    iElem.className = 'fas fa-caret-down';
  } else {
    iElem.className = 'fas fa-caret-right';
  }

  const caretElem = createElement('div', {
    className: 'caret-icon',
    children: [iElem]
  });
  const handleClick = node.toggle.bind(node);
  caretElem.addEventListener('click', handleClick);
  const indexElem = createElement('div', {
    className: 'json-index',
    content: node.key
  });
  const typeElem = createElement('div', {
    className: 'json-type',
    content: node.type
  });
  const keyElem = createElement('div', {
    className: 'json-key',
    content: node.key
  });
  const sizeElem = createElement('div', {
    className: 'json-size'
  });

  if (node.type === 'array') {
    sizeElem.innerText = '[' + node.children.length + ']';
  } else if (node.type === 'object') {
    sizeElem.innerText = '{' + node.children.length + '}';
  }

  let lineChildren;

  if (node.key === null) {
    lineChildren = [caretElem, typeElem, sizeElem];
  } else if (node.parent.type === 'array') {
    lineChildren = [caretElem, indexElem, sizeElem];
  } else {
    lineChildren = [caretElem, keyElem, sizeElem];
  }

  const lineElem = createElement('div', {
    className: 'line',
    children: lineChildren
  });

  if (node.depth > 0) {
    lineElem.style = 'margin-left: ' + node.depth * 24 + 'px;';
  }

  return lineElem;
}
/**
 * @param {Object} node
 * @return {HTMLElement}
 */


function createNotExpandedElement(node) {
  const caretElem = createElement('div', {
    className: 'empty-icon'
  });
  const keyElem = createElement('div', {
    className: 'json-key',
    content: node.key
  });
  const separatorElement = createElement('div', {
    className: 'json-separator',
    content: ':'
  });
  const valueType = ' json-' + typeof node.value;
  const valueContent = String(node.value);
  const valueElement = createElement('div', {
    className: 'json-value' + valueType,
    content: valueContent
  });
  const lineElem = createElement('div', {
    className: 'line',
    children: [caretElem, keyElem, separatorElement, valueElement]
  });

  if (node.depth > 0) {
    lineElem.style = 'margin-left: ' + node.depth * 24 + 'px;';
  }

  return lineElem;
}
/**
 * create tree node
 * @return {Object}
 */


function createNode() {
  return {
    key: null,
    parent: null,
    value: null,
    expanded: false,
    type: null,
    children: null,
    elem: null,
    depth: 0,

    setCaretIconRight() {
      const icon = this.elem.querySelector('.fas');
      icon.classList.replace('fa-caret-down', 'fa-caret-right');
    },

    setCaretIconDown() {
      const icon = this.elem.querySelector('.fas');
      icon.classList.replace('fa-caret-right', 'fa-caret-down');
    },

    hideChildren() {
      if (this.children !== null) {
        this.children.forEach(item => {
          item.elem.classList.add('hide');

          if (item.expanded) {
            item.hideChildren();
          }
        });
      }
    },

    showChildren() {
      if (this.children !== null) {
        this.children.forEach(item => {
          item.elem.classList.remove('hide');

          if (item.expanded) {
            item.showChildren();
          }
        });
      }
    },

    toggle: function () {
      if (this.expanded) {
        this.expanded = false;
        this.hideChildren();
        this.setCaretIconRight();
      } else {
        this.expanded = true;
        this.showChildren();
        this.setCaretIconDown();
      }
    }
  };
}
/**
 * Return variable type
 * @param {*} val
 */


function getType(val) {
  let type = typeof val;

  if (Array.isArray(val)) {
    type = 'array';
  } else if (val === null) {
    type = 'null';
  }

  return type;
}
/**
 * Recursively traverse json object
 * @param {Object} obj parsed json object
 * @param {Object} parent of object tree
 */


function traverseObject(obj, parent) {
  for (let key in obj) {
    const child = createNode();
    child.parent = parent;
    child.key = key;
    child.type = getType(obj[key]);
    child.depth = parent.depth + 1;
    child.expanded = false;

    if (typeof obj[key] === 'object') {
      child.children = [];
      parent.children.push(child);
      traverseObject(obj[key], child);
      child.elem = createExpandedElement(child);
    } else {
      child.value = obj[key];
      child.elem = createNotExpandedElement(child);
      parent.children.push(child);
    }
  }
}
/**
 * Create root of a tree
 * @param {Object} obj Json object
 * @return {Object}
 */


function createTree(obj) {
  const tree = createNode();
  tree.type = getType(obj);
  tree.children = [];
  tree.expanded = true;
  traverseObject(obj, tree);
  tree.elem = createExpandedElement(tree);
  return tree;
}
/**
 * Recursively traverse Tree object
 * @param {Object} node
 * @param {Callback} callback
 */


function traverseTree(node, callback) {
  callback(node);

  if (node.children !== null) {
    node.children.forEach(item => {
      traverseTree(item, callback);
    });
  }
}
/**
 * Render Tree object
 * @param {Object} tree
 * @param {String} targetElem
 */


function render(tree, targetElem) {
  let rootElem;

  if (targetElem) {
    rootElem = document.querySelector(targetElem);
  } else {
    rootElem = document.body;
  }

  traverseTree(tree, node => {
    if (!node.expanded) {
      node.hideChildren();
    }

    rootElem.appendChild(node.elem);
  });
}
/* Export jsonView object */


var jsonView = {
  /**
   * Render JSON into DOM container
   * @param {String} jsonData
   * @param {String} targetElem
   */
  format: function (jsonData, targetElem) {
    const parsedData = JSON.parse(jsonData);
    const tree = createTree(parsedData);
    render(tree, targetElem);
  }
};

/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████──██████─██████████████─██████─────────██████─────────██████████████─██████──────────██████─
─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██─────────██░░░░░░░░░░██─██░░██──────────██░░██─
─██░░██████████─██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██─────────██░░██████░░██─██░░██──────────██░░██─
─██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──────────██░░██─
─██░░██████████─██░░██████░░██─██░░██████░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██████──██░░██─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─
─██████████░░██─██░░██████░░██─██░░██████░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─
─────────██░░██─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██████░░██████░░██─
─██████████░░██─██░░██──██░░██─██░░██──██░░██─██░░██████████─██░░██████████─██░░██████░░██─██░░░░░░░░░░░░░░░░░░██─
─██░░░░░░░░░░██─██░░██──██░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████░░██████░░██─
─██████████████─██████──██████─██████──██████─██████████████─██████████████─██████████████─██████──██████──██████─
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/
var shallow_functions = {
  //Basics
  // Arithmetic functions
  Average: average,
  Add: add,
  Multiply: multiply,
  'Add 2': add2,
  'Multiply 2': multiply2,
  'divide 2': divide2,
  'Difference 2': subtract2,
  'power 2': exponent2,
  '&&': and,
  '||': or,
  '==': equal,
  '>': greater,
  '<': less,
  // String operations
  Split: split,
  Join: join,
  Includes: includes,
  Replace: replace,
  'String to Json': str2Json,
  // List
  String_to_List: str2lst,
  Max: max,
  Min: min,
  // Json objects
  'Json Navigator': jsonNavigator,
  // Plotting
  'Plot Panel': plot_panel_comp,
  // 3D viewer
  'Draw 3d Model': draw3dModel,
  // OSI Soft
  'OSI Extract TimeSeries Data': osiExtractTimeSeriesData,
  '3dVisualizer': draw3dObject,
  'Image Display': imDisplay,
  'YouTube Display': youTubeDisplay
};
/**
 * Function to check if numeric or string input is a valid number after parsing
 * @return {boolean} True if n is a valid number and False otherwise
 */

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * @return {boolean} True if n is boolean and False otherwise
 */


function isBoolean(n) {
  return typeof n === 'boolean';
}
/**
 * @return {JSON} if param n is a valid Javascript object
 */


function parseString(n) {
  try {
    if (typeof n === 'string' || n instanceof String) {
      n = JSON.parse(n);
    }

    return n;
  } catch (error) {
    console.log(error);
  }
}
/*
 * Preconditions to check that args is an array and array.length is not
 * less than number of inputs n
 */


function inputPreconditions(args, n) {
  // args = parseString(args); // args is always a normal list
  if (!(args instanceof Array)) {
    throw new TypeError('args must be an array ');
  }
}
/*
ARITHMETIC OPERATORS
*/
// dictionary to store basic math operators


var operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '^': (a, b) => a ** b,
  '&&': (a, b) => a && b,
  '||': (a, b) => a || b,
  '==': (a, b) => a === b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  split: (a, b) => a.split(b),
  join: (a, b) => a.concat(b),
  includes: (a, b) => a.includes(b)
};
/**
 * @param {array} args - An array of inputs to an object where
 *                 args[0] is an array of floats/string
 * @param {function} operator - Mathematical operator to apply to array
 * @return {float} the result of applying operator to the array args
 */

function accumulator(args, operator) {
  args = parseString(args); // --> this line is not needed as agrs will always be a list from the backend
  // preconditions
  // Assume args[0] is the input of interest and only args[0] is used

  inputPreconditions(args); // args = parseString(args); ---> args is always a normal list, no need to validate it.
  // initialize variables

  var InputList = parseString(args[0]); // I would prefer to name it as the component name.

  var output = null;
  var log = 'Success!';
  var n;
  var i;

  for (i = 0; i < InputList.length; i++) {
    console.log(InputList[i]);
    n = parseFloat(InputList[i]); // convert string to float

    if (!isNumeric(n)) {
      log = n + ' is not numeric';
      return {
        type: ['text', 'text'],
        value: [null, log]
      };
    }

    if (i > 0) {
      output = operator(output, n);
      console.log(output);
    } else {
      output = n;
    }
  }

  return {
    type: ['text', 'text'],
    value: [output, log]
  };
}
/**
 * Mathematical operation between two numbers.
 * @param {array} args - An array of inputs to an object where
 *                 args[0] and args[1] are numbers
 * @param {function} operator - Mathematical operator to apply in the form
 *                           args[0] (operator) args[1]
 * @return {float} the result of applying operator
 */


function mathOperator(args, operator) {
  // preconditions
  // assumes args[0] and args[1] are accesible and are numeric
  inputPreconditions(args); // args = parseString(args);
  // initialize variables

  var log = 'Success!';
  var arg0 = parseFloat(args[0]);
  var arg1 = parseFloat(args[1]);
  var output;

  if (!isNumeric(arg0) || !isNumeric(arg1)) {
    log = arg0 + ' or ' + arg1 + ' is not numeric';
    output = null;
  }

  output = operator(arg0, arg1);
  return {
    type: ['text', 'text'],
    value: [output, log]
  };
} // TODO: test functions add/subtract/multiply/average
// TODO: include docstrings for functions add/subtract/multiply/average

/**
 * @return sum of all numbers in an Array
 */


function add(args) {
  return accumulator(args, operations['+']);
}
/**
 * @return product of all numbers in an Array
 */


function multiply(args) {
  return accumulator(args, operations['*']);
}
/**
 * @return args[0] + args[1]
 */


function add2(args) {
  return mathOperator(args, operations['+']);
}
/**
 * @return args[0] - args[1]
 */


function subtract2(args) {
  return mathOperator(args, operations['-']);
}
/**
 * @return args[0] * args[1]
 */


function multiply2(args) {
  return mathOperator(args, operations['*']);
}
/**
 * @return args[0] / args[1]
 */


function divide2(args) {
  return mathOperator(args, operations['/']);
}
/**
 * @return args[0] ** args[1]
 */


function exponent2(args) {
  return mathOperator(args, operations['^']);
}

function numericalListValidator(inputList) {
  for (let i = 0; i < inputList.length; i++) {
    var n = inputList[i];

    if (typeof n === 'string' || n instanceof String) {
      console.log('Someproblem here');
      inputList[i] = parseFloat(n);
    }
  }

  return inputList;
}

function sum(inputList) {
  inputList = parseString(inputList);
  inputList = numericalListValidator(inputList);
  var sum = 0;

  for (let i = 0; i < inputList.length; i++) {
    sum += inputList[i];
  }

  return sum;
}

function average(args) {
  var inputList = args[0];
  var average_output = null;
  var log_output = 'Success';

  try {
    //Validation:
    inputList = parseString(inputList);
    inputList = numericalListValidator(inputList);
    average_output = sum(inputList) / inputList.length;
  } catch (error) {
    log_output = error;
    average_output = null;
  }

  return {
    type: ['text', 'text'],
    value: [average_output, log_output]
  };
}
/*
LOGICAL and COMPARISON OPERATORS
*/

/**
 * @param {array} args - An array of inputs to an object where
 *                 args[0] and args[1] are inputs
 * @param {function} operator - logical/comparison operator to apply in the form
 *                           args[0] (operator) args[1]
 * @return {boolean} the result of applying operator
 */


function logCompareOperator(args, operator) {
  // preconditions
  // assumes args[0] and args[1] are accesible and are numeric
  inputPreconditions(args);
  args = parseString(args); // initialize variables

  var log = 'Success!';
  var arg0 = parseString(args[0]);
  var arg1 = parseString(args[1]);
  var output = operator(arg0, arg1);

  if (!isBoolean(output)) {
    log = output + ' is not boolean';
    output = null;
  }

  return {
    type: ['text', 'text'],
    value: [output, log]
  };
}
/*
 * logical AND with short circuit
 * @return args[0] && args[0]
 */


function and(args) {
  return logCompareOperator(args, operations['&&']);
}
/*
 * logical OR with short circuit
 * @return args[0] && args[0]
 */


function or(args) {
  return logCompareOperator(args, operations['||']);
}
/*
COMPARISON OPERATORS
*/
// TODO: docstrings


function equal(args) {
  return logCompareOperator(args, operations['==']);
}

function greater(args) {
  return logCompareOperator(args, operations['>']);
}

function less(args) {
  return logCompareOperator(args, operations['<']);
}
/*
String functions
*/

/**
 * @param {array} args - An array of inputs to an object where
 * @return  {array} an array containing the split values
 */


function strOperator(args, operator) {
  args = parseString(args); // initialize variables

  var log = 'Success!';
  var arg0 = String(args[0]);
  var arg1 = String(args[1]);
  var output;

  try {
    output = operator(arg0, arg1);
  } catch (error) {
    output = NaN;
    log = error;
  }

  return {
    type: ['text', 'text'],
    value: [output, log]
  };
}
/**
 * @param {array} args - An array of inputs to an object where
 *                 args[0] is the string and args[1] is the dilimter
 * @return  {array} an array containing the split values
 */


function split(args) {
  return strOperator(args, operations['split']);
}
/**
 * @return  {String} A new String containing the text of the combined strings
 */


function join(args) {
  return strOperator(args, operations['join']);
}
/**
 * @return {boolean} true if the string contains the value,
 *                    otherwise it returns false
 */


function includes(args) {
  return strOperator(args, operations['includes']);
}
/**
 * @param {array} args - An array of inputs to an object where
 * @return {array} A new String, where the specified value(s)
 *               has been replaced by the new value
 */


function replace(args) {
  // initialize variables
  // inputs 3
  var main_text = String(args[0]);
  var old_string = String(args[1]);
  var new_string = String(args[2]); // outputs 3

  var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component replaces all the occurences of a specific string in a text with newer one</div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">main_text</div>
            <div id="help_p">The text body</div>

            <div id="help_t4">old_string</div>
            <div id="help_p">String to be replaced</div>

            <div id="help_t4">new_string</div>
            <div id="help_p">String to replace the old string</div>
    `;
  var new_text = null;
  var log = 'Success!';

  try {
    new_text = main_text.split(old_string).join(new_string); // This process replaces all the occurences of the old string in the text.
  } catch (error) {
    new_text = null;
    log = error;
  }

  return {
    type: ['html', 'text', 'text'],
    value: [help_, new_text, log]
  };
} // this comments seems not updated

/**
 * This function returns the sum of two numbers.
 * @param    {array} args Inputs as a list of floats.
 * @return   {float} the average between two numbers args[0] and args[1].
 */


function str2lst(args) {
  //inputs
  var inputString = String(args[0]); //outputs

  var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component converts a string-like list into a list eg : 
    <span id='code'>"[1, 2, 3, 4]"</span> will return <span id='code'>[1, 2, 3, 4]</span></div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">inputString</div>
            <div id="help_p">a string-like list</div>

        <div id="help_t3">Outputs: </div>

            <div id="help_t4">list_</div>
            <div id="help_p">the parsed list</div>

    `;
  var log = 'Success';
  var list_ = null;

  try {
    list_ = JSON.parse(inputString);
  } catch (error) {
    list_ = NaN;
    log = error;
  }

  return {
    type: ['html', 'text', 'text'],
    value: [help_, list_, log]
  };
}

function str2Json(args) {
  //inputs
  var inputString = String(args[0]); //outputs

  var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component converts a string-like json object into a json object eg : 
    <span id='code'>"{'name': 'SDE4' , 'height' : 24.0}"</span> will return <span id='code'>{'name': 'SDE4' , 'height' : 24.0}</span></div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">inputString</div>
            <div id="help_p">a string-like json object</div>

        <div id="help_t3">Outputs: </div>

            <div id="help_t4">json_</div>
            <div id="help_p">the parsed json object</div>

    `;
  var json_ = null;
  var log = 'Success';

  try {
    json_ = JSON.parse(inputString);
  } catch (error) {
    json_ = NaN;
    log = error;
  }

  return {
    type: ['html', 'text', 'text'],
    value: [help_, json_, log]
  };
}
/**
 * This function returns the maximum value between a list of inputs.
 * @param {array} args - An array of Numbers (float/int).
 * @return {float} the average of all numbers in an array.
 */


function max(args) {
  // initialize variables
  var log = 'Success!';
  var output;

  try {
    if (typeof args[0] === 'string' || args[0] instanceof String) {
      args[0] = JSON.parse(args[0]);
    }

    console.log(args[0]);
    output = Math.max(...args[0]);
  } catch (error) {
    log = error;
    output = null;
  }

  return {
    type: ['text', 'text'],
    value: [output, log]
  };
}
/**
 * This function returns the minimum value between a list of inputs.
 * @param {array} args
 * @return {float} the average of all numbers in an array.
 */


function min(args) {
  console.log(args); // initialize variables

  var log = 'Success!';
  var output;

  try {
    if (typeof args[0] === 'string' || args[0] instanceof String) {
      args[0] = JSON.parse(args[0]);
    }

    console.log(args[0]);
    output = Math.min(...args[0]);
  } catch (error) {
    log = error;
    output = null;
  }

  return {
    type: ['text', 'text'],
    value: [output, log]
  };
}

function draw3dModel(args) {
  /**
   * This function returns the minimum value between a list of inputs.
   * @param {array} args
   * @return {json} json string indicating the 3d geometry
   */
  var tracking = args[0];
  var result_3d = null;
  var log = 'success';
  var project_id = parseInt(tracking.split('-')[0]);
  var branch_id = parseInt(tracking.split('-')[1]);
  var commit_id = parseInt(tracking.split('-')[2]);

  if (tracking == null || tracking === 'null') {
    log = 'drawing';
    result_3d = '<a href = "https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' + project_id + '&branch_id=' + branch_id + '&commit_id=' + commit_id + '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true">Open in new window</a>';
    $__default['default']('div#propertiesBarContents').html('<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' + project_id + '&branch_id=' + branch_id + '&commit_id=' + commit_id + '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>');
    return {
      type: ['html', 'text'],
      value: [result_3d, log]
    };
  } else {
    try {
      project_id = parseInt(tracking.split('-')[0]);
      branch_id = parseInt(tracking.split('-')[1]);
      commit_id = parseInt(tracking.split('-')[2]);
      result_3d = '<a href = "https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' + project_id + '&branch_id=' + branch_id + '&commit_id=' + commit_id + '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true">Open in new window</a>';
      $__default['default']('div#propertiesBarContents').html('<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' + project_id + '&branch_id=' + branch_id + '&commit_id=' + commit_id + '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>');
      $__default['default']('div#propertiesBarContents').html('<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' + project_id + '&branch_id=' + branch_id + '&commit_id=' + commit_id + '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>');
      return {
        type: ['html', 'text'],
        value: [result_3d, log]
      };
    } catch (error) {
      result_3d = null;
      log = error;
      $__default['default']('div#propertiesBarContents').html('<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' + project_id + '&branch_id=' + branch_id + '&commit_id=' + commit_id + '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>');
      return {
        type: ['html', 'text'],
        value: [result_3d, log]
      };
    }
  }
}
/**
 * This function allow user to select specific branch of a json object
 * @param {array} args
 * @param args[0]: input_json [string], the json input e.g. {0: "Google", 1: "Facebook", 2:{"data": "no-data", "value": 123}}
 * @param args[1]: path [list], a list or a list-like string that represents the path to the requird object . eg: [2, "data"]
 * @return {json} json string indicating the 3d geometry
 */


function jsonNavigator(args) {
  var input_json = args[0];
  var path = args[1];
  var output = null;
  var log = 'Success';

  try {
    input_json = parseString(input_json);
    path = parseString(path);

    if (path.length > 1) {
      output = path.reduce((a, b) => {
        return input_json[a][b];
      });
    } else {
      output = input_json[path[0]];
      console.log(output);
    }

    return {
      type: ['json', 'text'],
      value: [JSON.stringify(output), log]
    };
  } catch (error) {
    log = error;
    return {
      type: ['text', 'text'],
      value: [output, log]
    };
  }
}
/**
 * This function draws iframe
 * @param {array} args
 * @return {json}
 */


function draw3dObject(args) {
  var input_url = args[0];
  var outpur_iframe = '<iframe src="' + input_url + '"></iframe>';
  return {
    type: ['html'],
    value: [outpur_iframe]
  };
}
/**
 * This function accepts the OSI-soft data record and return a plot-ly
 * @param {array} args
 * @return {json}
 */


function osiExtractTimeSeriesData(args) {
  var input_data = args[0];
  var x = [];
  var y = [];
  var uniquePlotId = uuidv4('plot_');
  var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component extracts the plotting data from OSIsoft end point</div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">plot_</div>
            <div id="help_p">Timeseries plot </div>

            <div id="help_t4">to_html</div>
            <div id="help_p">table representing the data </div>

            <div id="help_t4">to_dict</div>
            <div id="help_p">data as json object </div>

            <div id="help_t4">time_stamps</div>
            <div id="help_p">list of time stamps </div>

            <div id="help_t4">data</div>
            <div id="help_p">list of data </div>

            <div id="help_t4">log_</div>
            <div id="help_p">Timeseries plot </div>

     `;
  var output_dataframe = null;
  var plot_ = null;
  var to_html = null;
  var to_dict = null;
  var time_stamps = null;
  var data = null;
  var log_ = 'Success';

  try {
    input_data = parseString(input_data);

    if (input_data != null) {
      for (const key in input_data['Items']) {
        if (input_data['Items'].hasOwnProperty(key)) {
          const element = input_data['Items'][key];
          x.push(element.Timestamp);
          y.push(element.Value);
        }
      }
    }

    time_stamps = JSON.stringify(x);
    data = JSON.stringify(y);
    var objDict = {
      timestamp: x,
      data: y
    };
    to_html = objToHtmlTable(objDict);
    to_dict = JSON.stringify(objDict);
    output_dataframe = JSON.stringify(objDict);
    plot_ = "<div id='" + uniquePlotId + "' style='width:100%; height:100%'></div>" + `<script>
        x_values = ` + JSON.stringify(x).split('"').join("'") + `;
        y_values = ` + JSON.stringify(y).split('"').join("'") + `;
        var data = [{x: x_values,y: y_values,type: 'scatter'}];
        Plotly.newPlot('` + uniquePlotId + `', data, {responsive: true});`;
    console.log(plot_);
    return {
      type: ['html', 'html', 'html', 'json', 'json', 'json', 'text'],
      value: [help_, plot_, to_html, to_dict, time_stamps, data, log_]
    };
  } catch (error) {
    console.log(error);
    log_ = error;
    return {
      type: ['html', 'html', 'html', 'json', 'json', 'json', 'text'],
      value: [help_, plot_, to_html, to_dict, time_stamps, data, log_]
    };
  }
}

function imDisplay(args) {
  /**
   * This function draws iframe
   * @param {array} args
   * @return {html}
   */
  var _url = args[0]; // console.log(_url);
  // console.log(typeof _url);

  var image_ = null;

  if (_url == null) {
    image_ = `<img src="https://user-images.githubusercontent.com/6969514/60951247-4bac1200-a32b-11e9-8b66-02bc19953461.png" style="width:100%; height:100%">`;
    return {
      type: ['html'],
      value: [image_]
    };
  } else {
    if (typeof _url === 'string') {
      image_ = `<img src="` + _url + `" style="width:100%; height:100%">`;
    } else {
      image_ = `<img src="` + URL.createObjectURL(_url) + `" style="width:100%; height:100%">`;
    }

    return {
      type: ['html'],
      value: [image_]
    };
  }
} //<iframe width="560" height="315" src="https://www.youtube.com/embed/05d6yEsfuNw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


function youTubeDisplay(args) {
  /**
   * This function draws iframe
   * @param {array} args
   * @return {html}
   */
  console.log('You are on this function youTubeDisplay');
  var _url = args[0];
  var youTube_ = null;

  if (_url == null) {
    youTube_ = `<img src="https://user-images.githubusercontent.com/6969514/60952698-50be9080-a32e-11e9-9aba-b5380f5cda01.png" style="width:100%; height:100%">`;
    return {
      type: ['html'],
      value: [youTube_]
    };
  } else {
    try {
      var videoId = _url.split('watch?v=')[1].split('&')[0];

      console.log(videoId);
      youTube_ = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/` + videoId + `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      return {
        type: ['html'],
        value: [youTube_]
      };
    } catch {
      youTube_ = `<img src="https://user-images.githubusercontent.com/6969514/60952698-50be9080-a32e-11e9-9aba-b5380f5cda01.png" style="width:100%; height:100%">`;
      return {
        type: ['html'],
        value: [youTube_]
      };
    }
  }
}

function plot_panel_comp(args) {
  var inputs = args[0];
  return {
    type: ['plot', 'text'],
    value: [inputs, 'to be stated later .. ']
  };
}
/**
 * This is the core function that runs all the calculations and return the outputs to the components.
 * @param    {string} compId The component GUID.
 */


function calculateShallow(compId) {
  var thisComp = selectComp(compId); // selects the component that is under test.

  var inputGroup = []; // reads the inputs from the component and put them in a list to be mapped to the corresponding shallow function.

  thisComp.inputs.forEach(input => {
    console.log(input);

    if (typeof input !== 'string' && input.file !== undefined) {
      inputGroup.push(input.file);
    } else {
      inputGroup.push(input.value);
    }
  });
  var d = shallow_functions[thisComp.Name](inputGroup);
  console.log(d);
  console.log(d.length);

  if (d.type.length !== thisComp.outputs.length || d.value.length !== thisComp.outputs.length) {
    alert("The number of outputs does not match the number of values in the return function. Please check again");
  } else {
    thisComp.outputs.forEach(function (output, i) {
      output.value = d['value'][i];
      output.type = d['type'][i];
    });
  }
}

var d3$d = require('d3');

function calculateCloud(compId) {
  d3$d.select('div#PleaseWaitOverLay').style('display', 'block');
  var cloudComp = selectComp(compId);
  cloudComp.Name;
  var args = cloudComp.inputs.map(input => input.value);
  var url = cloudComp.url;
  const result = absolute(args, url);

  try {
    cloudComp.outputs.forEach(function (output, i) {
      output.type = result['type'][i];
      output.value = result['value'][i];
      console.log(result);
    });
    d3$d.select('div#PleaseWaitOverLay').style('display', 'none');
  } catch (error) {
    console.log(error);
    alert(error);
    d3$d.select('div#PleaseWaitOverLay').style('display', 'none');
  }
}

function absolute(args, url) {
  var log_ = 'Success';
  var queryStr = '';

  for (let i = 1; i <= args.length; i++) {
    queryStr += '&p' + i + '=' + args[i - 1];
  } //Replace first  & with  ?


  var urlCall = url + queryStr.replace('&', '?'); // var data = { parameters: p1 };

  const req = $__default['default'].ajax({
    type: 'POST',
    dataType: 'json',
    async: false,
    url: urlCall,
    // data: JSON.stringify(data),
    // "headers": headers,
    beforeSend: function (xhr, settings) {}
  });
  console.log(req, req.responseText);
  return {
    type: ['text', 'text'],
    value: [req.responseText, log_]
  };
}

var d3$c = require('d3');

var reactContext$1;
var allComp;
var ACTIVE_COLOR;
var ERROR_COLOR;
var allEdges;
var comp_input_edges;
var comp_output_edges;
var edge_comp_matrix;
var parent_child_matrix;
var parent_child_matrix_fast_check;
var components_selection_data;
var runDeep;

function dummyToSetState() {
  reactContext$1 = this;
  allComp = reactContext$1.state.allComp;
  ACTIVE_COLOR = reactContext$1.state.ACTIVE_COLOR;
  ERROR_COLOR = reactContext$1.state.ERROR_COLOR;
  allEdges = reactContext$1.state.allEdges;
  comp_input_edges = reactContext$1.state.comp_input_edges;
  comp_output_edges = reactContext$1.state.comp_output_edges;
  edge_comp_matrix = reactContext$1.state.edge_comp_matrix;
  parent_child_matrix = reactContext$1.state.parent_child_matrix;
  parent_child_matrix_fast_check = reactContext$1.state.parent_child_matrix_fast_check;
  components_selection_data = reactContext$1.state.components_selection_data;
  runDeep = reactContext$1.state.runDeep;
}

function uuidv4(ini) {
  return ini + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function addCircle() {
  var initCircle = {
    GUID: uuidv4('C'),
    element: null,
    CX: 0,
    CY: 0,
    Comp: null,
    type: 'data',
    path: null
  };
  return initCircle;
}

function addcomponent(guid) {
  var n_inputs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var n_outputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var inputsIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5 * ['input'];
  var outputsIn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5 * ['output'];
  var inputs = [];
  var outputs = [];

  for (var index = 0; index < n_inputs; index++) {
    try {
      inputs.push({
        id: index,
        circle: null,
        textObj: null,
        Name: inputsIn[index].name,
        ShortName: inputsIn[index].shortName,
        Description: inputsIn[index].desc,
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: inputsIn[index].default_value
      });
    } catch (_unused) {
      inputs.push({
        id: index,
        circle: null,
        textObj: null,
        Name: '',
        ShortName: '',
        Description: '',
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: ''
      });
    }
  }

  for (var _index = 0; _index < n_outputs; _index++) {
    try {
      outputs.push({
        id: _index,
        circle: null,
        textObj: null,
        Name: outputsIn[_index],
        ShortName: outputsIn[_index],
        Description: outputsIn[_index].desc,
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: null
      });
    } catch (_unused2) {
      outputs.push({
        id: _index,
        circle: null,
        textObj: null,
        Name: '',
        ShortName: '',
        Description: '',
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: null
      });
    }
  }

  var initComp = {
    GUID: guid,
    X: 0,
    Y: 0,
    width: 120,
    height: 50,
    Name: 'Component',
    ShortName: 'Comp',
    Description: 'Dummy component',
    Message: 'short description',
    numInputs: 3,
    numOutputs: 2,
    typeName: null,
    logo: null,
    type: 'component',
    state: 'unbound',
    status: 'idle',
    selection: 'selectable',
    view: 'visible',
    // hidden , disabled
    fill: '#303952',
    rect: null,
    inputs: inputs,
    outputs: outputs,
    dftype: 'dp',
    value: 'no value',
    child: false,
    log: {
      logText: ' Log message output.. '
    },
    optionListValues: {
      Option_0: 0,
      Option_1: 1,
      Option_2: 2.0
    }
  };
  return initComp;
} //End of addcomponent

/**
 * Gets the detail of a component given that the "by" value of that component equal to "value"
 * @param {*} value the value of the component need to be searched
 * @param {*} by the search field, by default, this field is the GUID of the component
 * @returns
 */


function selectComp(value) {
  var by = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GUID';
  var toreturn = null;
  allComp.forEach(function (element) {
    if (element[by] === value) {
      toreturn = element;
    }
  });
  return toreturn;
} // End of selectComp


function addEdgeCircle(theEdge, thisD) {
  var circ = d3$c.select('g#allPaths').append('rect').attr('id', 'pathCircle' + theEdge.path_id).attr('rx', 100).attr('ry', 100).attr('width', 15).attr('height', 15).attr('fill', 'red').attr('opacity', 0.3).attr('style', 'display:none').on('mousemove', function (event) {
    d3$c.select(event.currentTarget).attr('opacity', 0.8);
    d3$c.select('path#' + theEdge.path_id).attr('stroke', 'red').attr('stroke-width', 4).attr('stroke-dasharray', '5 5');
  }).on('mouseout', function (event) {
    d3$c.select(event.currentTarget).attr('opacity', 0.3);
    d3$c.select('path#' + theEdge.path_id).attr('stroke', 'black').attr('stroke-width', 5).attr('stroke-dasharray', 4);
  }).on('mousedown', function (event) {
    deleteEdge(theEdge.path_id);
    console.log(theEdge.path_id);
    d3$c.select(event.currentTarget).remove();
    d3$c.select('path#' + theEdge.path_id).remove();
  });
  d3$c.select('#' + theEdge.path_id).attr('stroke-width', '5').attr('d', function () {
    return thisD.replace('L', 'C');
  }).attr('stroke', 'black').attr('stroke-linecap', 'round').attr('stroke-opacity', '0.5').lower();

  try {
    handleEdgeMovement(theEdge.toComp[1]);
  } catch (error) {}

  try {
    handleEdgeMovement(theEdge.fromComp[1]);
  } catch (error) {}

  return circ;
}

function updateAll() {
  allEdges.forEach(function (element) {
    var thisD = $__default['default']('path#' + element.path_id).attr('d');
    addEdgeCircle(element, thisD);
  });
} // End of updateAll


function returnCurveString(x1, y1, x2, y2) {
  var coalignValue;

  if (x2 < x1) {
    coalignValue = Math.abs(y2 - y1) / 5.0 + Math.abs(x2 - x1) * 1.5;
  } else {
    coalignValue = Math.abs(y2 - y1) / 5.0;
  }

  return 'M ' + x1 + ',' + y1 + ' ' + 'C ' + ((x1 + x2) / 2.0 + coalignValue).toString() + ',' + y1 + ' ' + ((x1 + x2) / 2.0 - coalignValue).toString() + ',' + y2 + ' ' + x2 + ',' + y2;
} // End of returnCurveString


function getlocationFromTransform(trnsformText) {
  return trnsformText.replace('translate(', '').replace(')', '').split(',').map(function (item) {
    return parseFloat(item, 10);
  });
} // End of getlocationFromTransform


function ViewListRedrawing() {
  d3$c.selectAll('option#someSelection').on('click', function (e) {
    var id = this.classList[1];
    var selectedItems = [];
    var componentValue = [];
    var selectedOptions = $__default['default']('option.listViewOption.' + id);

    for (var i = 0; i < selectedOptions.length; i++) {
      var currentValue = selectedOptions[i].value;
      var parsedcurrentValue;

      if (selectedOptions[i].selected) {
        if (isNaN(currentValue)) {
          parsedcurrentValue = currentValue;
        } else if (currentValue.indexOf('.') === -1) {
          parsedcurrentValue = parseInt(currentValue);
        } else {
          parsedcurrentValue = parseFloat(currentValue);
        }

        componentValue.push([parsedcurrentValue, 1]);
        selectedItems.push(parsedcurrentValue);
      } else {
        if (isNaN(currentValue)) {
          parsedcurrentValue = currentValue;
        } else if (currentValue.indexOf('.') === -1) {
          parsedcurrentValue = parseInt(currentValue);
        } else {
          parsedcurrentValue = parseFloat(currentValue);
        }

        componentValue.push([parsedcurrentValue, 0]);
      }
    }

    var the_selected_optionList_component = selectComp(id);
    the_selected_optionList_component.outputs[0].value = JSON.stringify(selectedItems);
    the_selected_optionList_component.value = componentValue;
    redrawDependents(id);
  });
} // End of ViewListRedrawing


function addOptionDropdownList(compId) {
  var optionListComp = selectComp(compId);
  var n = 0;
  d3$c.select('g#comp-' + compId);
  var optionsGroup = d3$c.select('g#optionListOption-' + compId);
  optionsGroup.html('');

  for (var option in optionListComp.optionListValues) {
    if (optionListComp.optionListValues.hasOwnProperty(option)) {
      n += 1;
      optionsGroup.append('text').attr('fill', 'black').attr('class', 'optionListoptiontext ' + optionListComp.GUID + ' ' + optionListComp.optionListValues[option] + ' ' + option).attr('value', option).attr('key', optionListComp.optionListValues[option]).attr('width', '180').text(option).attr('y', 15 + 20 * n).attr('x', 5);
    }
  }

  n = 0;

  for (var _option in optionListComp.optionListValues) {
    if (optionListComp.optionListValues.hasOwnProperty(_option)) {
      n += 1;
      optionsGroup.append('rect').attr('fill', 'white').attr('class', 'optionListoption ' + optionListComp.GUID + ' ' + optionListComp.optionListValues[_option] + ' ' + _option).attr('value', _option).attr('key', optionListComp.optionListValues[_option]).attr('id', 'optionListoption').attr('width', '180').attr('height', '20').attr('y', 20 * n).attr('opacity', '0.3').attr('stroke', 'gray').on('mousemove', function () {
        reactContext$1.setState({
          mouseInsideOption: true
        });
      }).on('mouseout', function () {
        reactContext$1.setState({
          mouseInsideOption: false
        });
      }).on('click', function () {
        changeOptionListFinalValue(this);
      });
    }
  }
} // End of addOptionDropdownList


function changeOptionListFinalValue(el) {
  console.log(el.attributes.value.value);
  var thisComp = selectComp(el.classList[1]);
  thisComp.value = el.attributes.key.value;
  thisComp.Name = el.attributes.value.value;
  thisComp.outputs[0].value = el.classList[2];
  d3$c.select('text#option-' + el.classList[1]).text(el.classList[3]).attr('fill', 'black');
  redrawDependents(el.classList[1]);
} // End of changeOptionListFinalValue


function showDropDownList(hh) {
  addOptionDropdownList(hh);
} // End of showDropDownList

/**
 * on a parent changes, only draws all the children tree .
 * all the components --- inputs outpts object (to be sent later to the backend should be modified as well)
 * shallow values should be updated instantaneously
 * @param {String} parentComp the id of parent component
 */


function redrawDependents(parentComp) {
  console.log('redrawing dependents');
  var parent = selectComp(parentComp);

  if (parent_child_matrix[parentComp].length === 0) {
    // This means that this parent has no children
    return;
  }

  if (parent.dftype === 'shlow') {
    parent_child_matrix[parentComp].forEach(function (element, i) {
      //iterate through all those childs.
      var ch = selectComp(element[1]);

      if (parent.type === 'slider') {
        ch.inputs[element[2]].value = parent.value;
      } else if (parent.type === 'string') {
        ch.inputs[element[2]].value = parent.outputs[element[0]].value;
      } else if (parent.type === 'listView') {
        ch.inputs[element[2]].value = parent.outputs[element[0]].value;
        console.log(ch.inputs[element[2]]);
        ch.inputs[element[2]].type = 'json';
      } else if (parent.type === 'toggle' || parent.type === 'optionList') {
        ch.inputs[element[2]].value = parent.value;
      } else if (parent.type === 'component' || parent.type === 'cloud') {
        try {
          calculateShallow(parent.GUID);
          ch.inputs[element[2]].value = parent.outputs[element[0]].value;
          ch.inputs[element[2]].type = parent.outputs[element[0]].type;
          componentStatus(parent.GUID, ACTIVE_COLOR);
        } catch (error) {
          console.log(error);
          componentStatus(parent.GUID, ERROR_COLOR);
        }
      } else if (parent.type === 'fileUpload') {
        ch.inputs[element[2]].value = parent.outputs[element[0]].value === null ? null : parent.outputs[element[0]].Description.Name;
        ch.inputs[element[2]].file = parent.outputs[element[0]].value;
      }

      updatShallowCompRender(ch);
      redrawDependents(ch.GUID);
    });
  } else if (parent.dftype === 'dp') {
    console.log('Cloud comp');
    parent.state = 'unbound';
    parent_child_matrix[parentComp].forEach(function (element, i) {
      //iterate through all those childs.
      var ch = selectComp(element[1]);

      if (parent.type === 'cloud' && runDeep === true) {
        reactContext$1.setState({
          runDeep: false
        });

        if (parent.state === 'unbound') {
          //Previously calculate deep
          calculateCloud(parent.GUID);
          parent.state = 'active';
        }
      }

      ch.inputs[element[2]].value = parent.outputs[element[0]].value;
      ch.inputs[element[2]].type = parent.outputs[element[0]].type;
      componentStatus(parent.GUID, ACTIVE_COLOR);
      updatShallowCompRender(ch);
      redrawDependents(ch.GUID);
    });
  } else if (parent.dftype === 'cloud') ;
} // End of redrawDependents


function updatShallowCompRender(ch) {
  if (ch.type === 'string') {
    if (ch.inputs[0].type === 'html') {
      $__default['default']('foreignObject#textbody_' + ch.GUID).html(ch.inputs[0].value);
    } else if (ch.inputs[0].type === 'json') {
      $__default['default']('foreignObject#textbody_' + ch.GUID).html('<div id="jsonTreeViewer' + ch.GUID + '"></div>');
      jsonView.format(ch.inputs[0].value, 'div#jsonTreeViewer' + ch.GUID);
    } else if (ch.inputs[0].type === 'text') {
      $__default['default']('foreignObject#textbody_' + ch.GUID).html('<pre>' + ch.inputs[0].value + '</pre>');
    } else if (ch.inputs[0].type === 'htmlLoad') {
      $__default['default']('foreignObject#textbody_' + ch.GUID).html('<div id="3DViewer' + ch.GUID + '"></div>');
      $__default['default']('div#3DViewer' + ch.GUID).load(ch.inputs[0].value, function (data) {
        console.log(data);
      });
    } else if (ch.inputs[0].type === 'plot') {
      var data = JSON.parse(ch.inputs[0].value);
      drawPlotComponent(data, ch);
    } else if (ch.inputs[0].type === 'spatial') {
      var _data = JSON.parse(ch.inputs[0].value);

      var unparseData = ch.inputs[0].value;
      visualizeSpatialComponent(_data, unparseData, ch);
    }

    $__default['default']('foreignObject#panel_status_' + ch.GUID).text('type : ' + ch.inputs[0].type);
    ch.outputs[0].value = ch.inputs[0].value;
    ch.outputs[0].type = ch.inputs[0].type;
  } else if (ch.type === 'optionList') {
    ch.optionListValues = JSON.parse(ch.inputs[0].value);
  } else if (ch.type === 'listView') {
    var newValues = [];

    for (var i = 0; i < JSON.parse(ch.inputs[0].value).length; i++) {
      var element = JSON.parse(ch.inputs[0].value)[i];
      newValues.push([element, 0]);
    }

    console.log(newValues);
    ch.value = newValues;
    ch.inputs[0].value = newValues;
    ch.outputs[0].value = newValues;
    updateListViewDrawing(ch);
  }
} // End of updatShallowCompRender


function visualizeSpatialComponent(data, unparseData, comp) {
  $__default['default']('foreignObject#textbody_' + comp.GUID).html('<div id="vis_area' + comp.GUID + '" style="height:4%"></div><div id="vis_canvas' + comp.GUID + '" style="height:92%">vis</div>');
  var options = "<select id='spatial_select_" + comp.GUID + "' onchange= 'displaySelection(" + unparseData + ", \"" + comp.GUID + "\")'>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      options += "<option  value=\"" + key + "\">" + key + "</option>";
    }
  }

  options += "</select>";
  $__default['default']('div#vis_area' + comp.GUID).html(options);
} // End of visualizeSpatialComponent


function drawPlotComponent(data, comp) {
  $__default['default']('foreignObject#textbody_' + comp.GUID).html('<div id="plot_area' + comp.GUID + '" style="width:100%; height:100%;"></div>');

  if (data != null && Array.isArray(data)) {
    if (data[0].type === 'scatter') {
      if ('layout' in data[0]) {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data[0].data, data[0].layout, {
          responsive: true
        });
      } else {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data[0].data, {
          responsive: true
        });
      }
    } else if (data[0].type === 'bar') {
      data[0].data.forEach(function (dataElement) {
        var maxValue = Math.max.apply(Math, _toConsumableArray(dataElement.y));
        dataElement['marker'] = {
          color: []
        };
        dataElement.y.forEach(function (dataValue) {
          dataElement.marker.color.push(d3$c.interpolateGnBu(dataValue / maxValue));
        });
      });

      if ('layout' in data[0]) {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data[0].data, data[0].layout, {
          responsive: true
        });
      } else {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data[0].data, {
          responsive: true
        });
      }
    } else {
      if ('layout' in data[0]) {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data[0].data, data.layout, {
          responsive: true
        });
      } else {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data[0].data, {
          responsive: true
        });
      }
    }
  } else if (data != null) {
    if (data.type === 'scatter') {
      if ('layout' in data) {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data.data, data.layout, {
          responsive: true
        });
      } else {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data.data, {
          responsive: true
        });
      }
    } else if (data.type === 'bar') {
      data.data.forEach(function (dataElement) {
        var maxValue = Math.max.apply(Math, _toConsumableArray(dataElement.y));
        dataElement['marker'] = {
          color: []
        };
        dataElement.y.forEach(function (dataValue) {
          dataElement.marker.color.push(d3$c.interpolateGnBu(dataValue / maxValue));
        });
      });

      if ('layout' in data) {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data.data, data.layout, {
          responsive: true
        });
      } else {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data.data, {
          responsive: true
        });
      }
    } else {
      if ('layout' in data) {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data.data, data.layout, {
          responsive: true
        });
      } else {
        Plotly__default['default'].newPlot('plot_area' + comp.GUID, data.data, {
          responsive: true
        });
      }
    }
  } else {
    Plotly__default['default'].newPlot('plot_area' + comp.GUID, [{
      x: ['1', '2', '3'],
      y: [1.0, 2.0, 3.0],
      type: 'bar'
    }], {
      title: 'Dummy plot'
    }, {
      responsive: true
    });
  }
} // End of drawPlotComponent


function updateListViewDrawing(comp) {
  d3$c.select('foreignObject#listView-' + comp.GUID).html(function () {
    var selectedOptions = [];
    var ListItemsvalueReturn = "<select id=\"listviewSelect\" class=\"listView " + comp.GUID + "\" size=\"5\"  multiple>";
    comp.value.forEach(function (option) {
      if (option[1] === 0) {
        ListItemsvalueReturn += "<option id=\"someSelection\" class=\"listViewOption " + comp.GUID + "\" value=\"" + option[0] + "\">" + option[0] + "</option>";
      } else {
        ListItemsvalueReturn += "<option id=\"someSelection\" class=\"listViewOption " + comp.GUID + "\" value=\"" + option[0] + "\" selected>" + option[0] + "</option>";
        selectedOptions.push(option[0]);
      }
    });
    comp.outputs[0].value = JSON.stringify(selectedOptions);
    ListItemsvalueReturn += "</select>";
    return ListItemsvalueReturn;
  });
  ViewListRedrawing();
} // End of updateListViewDrawing


function handleEdgeMovement(objID) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var element = selectComp(objID);

  if (element != null && element.GUID === objID) {
    if (x !== null && y !== null) {
      element.X = x;
      element.Y = y;
    }

    var _loop = function _loop(index) {
      if (comp_input_edges[objID][index] !== undefined && comp_input_edges[objID][index] !== null) {
        comp_input_edges[objID][index].forEach(function (inputElement) {
          var circleindex = index;
          var rectId = objID;
          var rectpos = $__default['default']('#comp-' + rectId).attr('transform').replace('translate(', '').replace(')', '').split(',').map(function (item) {
            return parseFloat(item, 10);
          });
          var xy2 = $__default['default']('#' + inputElement).attr('d').split(' ')[1].split(',').map(function (item) {
            return parseFloat(item, 10);
          });
          var padding = 20;
          var titleMargin = 30;
          d3$c.select('#' + inputElement).attr('d', function () {
            if (element.type === 'component' || element.type === 'cloud') {
              var itisthelocation = returnCurveString(xy2[0], xy2[1], rectpos[0], rectpos[1] + (circleindex * padding + titleMargin));
              handlePathDeleteMovement(inputElement, xy2, [rectpos[0], rectpos[1] + (circleindex * padding + titleMargin)]);
            } else if (element.type === 'string' || element.type === 'toggle' || element.type === 'fileUpload' || element.type === 'slider' || element.type === 'optionList' || element.type === 'listView') {
              itisthelocation = returnCurveString(xy2[0], xy2[1], rectpos[0], rectpos[1] + element.height / 2);
              handlePathDeleteMovement(inputElement, xy2, [rectpos[0], rectpos[1] + element.height / 2]);
            }

            return itisthelocation;
          });
        });
      }
    };

    for (var index = 0; index < comp_input_edges[objID].length; index++) {
      _loop(index);
    }

    var _loop2 = function _loop2(_index2) {
      if (comp_output_edges[objID][_index2] !== undefined && comp_output_edges[objID][_index2] !== null) {
        comp_output_edges[objID][_index2].forEach(function (outputElement) {
          var circleindex = _index2;
          var rectId = objID;
          var rectpos = $__default['default']('#comp-' + rectId).attr('transform').replace('translate(', '').replace(')', '').split(',').map(function (item) {
            return parseFloat(item, 10);
          });
          var rectwidth = $__default['default']('rect#dummyRect_' + rectId).attr('width');
          var xy2 = $__default['default']('#' + outputElement).attr('d').split(' ')[5].split(',').map(function (item) {
            return parseFloat(item, 10);
          });
          var padding = 20;
          var titleMargin = 30;
          d3$c.select('#' + outputElement).attr('d', function () {
            if (element.type === 'component' || element.type === 'cloud') {
              var itisthelocation = returnCurveString(rectpos[0] + parseFloat(rectwidth), rectpos[1] + (circleindex * padding + titleMargin), xy2[0], xy2[1]);
              handlePathDeleteMovement(outputElement, [rectpos[0] + parseFloat(rectwidth), rectpos[1] + (circleindex * padding + titleMargin)], [xy2[0], xy2[1]]);
            } else if (element.type === 'slider') {
              itisthelocation = returnCurveString(rectpos[0] + parseFloat(250), rectpos[1] + 10, xy2[0], xy2[1]);
              handlePathDeleteMovement(outputElement, [rectpos[0] + parseFloat(250), rectpos[1] + 10], [xy2[0], xy2[1]]);
            } else if (element.type === 'string' || element.type === 'toggle' || element.type === 'optionList' || element.type === 'listView' || element.type === 'fileUpload') {
              itisthelocation = returnCurveString(rectpos[0] + parseFloat(rectwidth), rectpos[1] + element.height / 2, xy2[0], xy2[1]);
              handlePathDeleteMovement(outputElement, [rectpos[0] + parseFloat(rectwidth), rectpos[1] + element.height / 2], [xy2[0], xy2[1]]);
            }

            return itisthelocation;
          });
        });
      }
    };

    for (var _index2 = 0; _index2 < comp_output_edges[objID].length; _index2++) {
      _loop2(_index2);
    }
  }
} // End of handleEdgeMovement


function handlePathDeleteMovement(pathId, xy1, xy2) {
  var circleX = ((xy1[0] + xy2[0]) / 2.0).toString() - 7.5;
  var circleY = ((xy1[1] + xy2[1]) / 2.0).toString() - 7.5;
  d3$c.select('rect#pathCircle' + pathId).attr('x', circleX).attr('y', circleY).attr('style', 'display:block');
} // End of handlePathDeleteMovement


function objToHtmlTable(object) {
  var col_length = 0;
  var keys = [];
  var htmlQuery = "<table border=\"1\" class=\"dataframe\">" + "<thead> <tr style=\"text-align: right;\"><th></th>";

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      htmlQuery += "<th>" + key + "</th>";
      keys.push(key);
      col_length = object[key].length;
    }
  }

  htmlQuery += "</tr></thead><tbody>";

  var _loop3 = function _loop3(i) {
    htmlQuery += "<tr><th>" + i.toString() + "</th>";
    keys.forEach(function (element) {
      htmlQuery += "<td>" + object[element][i] + "</td>";
    });
    htmlQuery += "</tr>";
  };

  for (var i = 0; i < col_length; i++) {
    _loop3(i);
  }

  return htmlQuery;
} // End of objToHtmlTable


function deleteComponent(component_to_be_deleted) {
  console.log('deleting component now');
  var component_to_be_reset = selectComp(component_to_be_deleted);

  if (component_to_be_reset.type === 'optionList') {
    reactContext$1.setState({
      optionListStarted: false
    });
  }

  console.log(component_to_be_reset.type);
  component_to_be_reset.value = null;
  console.log(parent_child_matrix_fast_check);
  component_to_be_reset.inputs.forEach(function (input) {
    input.value = null;
  });
  component_to_be_reset.outputs.forEach(function (output) {
    output.value = null;
  });
  delete components_selection_data[component_to_be_deleted];
  redrawDependents(component_to_be_deleted);

  for (var i = 0; i < parent_child_matrix_fast_check.length; i++) {
    var current_parent_child_object_asList = parent_child_matrix_fast_check[i].split(' ');

    if (current_parent_child_object_asList[1] === component_to_be_deleted) {
      parent_child_matrix_fast_check.splice(i, 1);
    }
  }

  comp_input_edges[component_to_be_deleted].forEach(function (element) {
    try {
      var _loop4 = function _loop4(_i) {
        element.forEach(function (thisEdgeId) {
          d3$c.select('path#' + thisEdgeId).remove();
          d3$c.select('rect#pathCircle' + thisEdgeId).remove();

          if (thisEdgeId === allEdges[_i]['path_id']) {
            allEdges.splice(_i, 1);
            reactContext$1.setState({
              allEdges: allEdges
            });
          }

          var otherComp = edge_comp_matrix[thisEdgeId]['from'];
          var otherCompIndex = edge_comp_matrix[thisEdgeId]['from_index'];
          comp_output_edges[otherComp][otherCompIndex] = undefined;
          parent_child_matrix[otherComp] = [];
        });
      };

      for (var _i = 0; _i < allEdges.length; _i++) {
        _loop4(_i);
      }
    } catch (err) {
      console.log(err);
    }
  });
  comp_output_edges[component_to_be_deleted].forEach(function (element) {
    try {
      var _loop5 = function _loop5(_i2) {
        element.forEach(function (thisEdgeId) {
          d3$c.select('path#' + thisEdgeId).remove();
          d3$c.select('rect#pathCircle' + thisEdgeId).remove();

          if (thisEdgeId === allEdges[_i2]['path_id']) {
            allEdges.splice(_i2, 1);
            reactContext$1.setState({
              allEdges: allEdges
            });
          }

          var otherComp = edge_comp_matrix[thisEdgeId]['to'];
          var otherCompIndex = edge_comp_matrix[thisEdgeId]['to_index'];
          comp_input_edges[otherComp][otherCompIndex] = undefined;
        });
      };

      for (var _i2 = 0; _i2 < allEdges.length; _i2++) {
        _loop5(_i2);
      }
    } catch (err) {
      console.log(err);
    }
  });
  reactContext$1.setState({
    comp_input_edges: comp_input_edges,
    comp_output_edges: comp_output_edges,
    parent_child_matrix: parent_child_matrix
  });

  for (var _i3 = 0; _i3 < allComp.length; _i3++) {
    if (allComp[_i3].GUID === component_to_be_deleted) {
      allComp.splice(_i3, 1);
      reactContext$1.setState({
        allComp: allComp
      });
    }
  }

  d3$c.select('#' + component_to_be_deleted).remove();
} // End of deleteComponent


function deleteEdge(edge_to_be_deleted) {
  console.log('deleteEdge');
  var components_of_the_edge = edge_comp_matrix[edge_to_be_deleted];
  var fromComp = selectComp(components_of_the_edge['from']); //.outputs[components_of_the_edge["from_index"]])

  var toComp = selectComp(components_of_the_edge['to']); //.inputs[components_of_the_edge["to_index"]].value = null;

  toComp.inputs[components_of_the_edge['to_index']].value = null;
  toComp.value = null;
  comp_input_edges[toComp.GUID][components_of_the_edge['to_index']] = undefined;
  comp_output_edges[fromComp.GUID][components_of_the_edge['from_index']] = comp_output_edges[fromComp.GUID][components_of_the_edge['from_index']].filter(function (pathId) {
    return pathId !== edge_to_be_deleted;
  });

  for (var i = 0; i < parent_child_matrix[fromComp.GUID].length; i++) {
    if (parent_child_matrix[fromComp.GUID][i][2] === components_of_the_edge['to_index'] && parent_child_matrix[fromComp.GUID][i][1] === toComp.GUID) {
      parent_child_matrix[fromComp.GUID].splice(i, 1);
    }
  }

  updatShallowCompRender(toComp);
  updatShallowCompRender(fromComp);
  redrawDependents(components_of_the_edge['to']);
  allEdges = allEdges.filter(function (edge) {
    return edge['path_id'] !== edge_to_be_deleted;
  });

  for (var _i4 = 0; _i4 < parent_child_matrix_fast_check.length; _i4++) {
    var parent_child_info = parent_child_matrix_fast_check[_i4].split(' ');

    if (parent_child_info[0] === components_of_the_edge['from_index'] && parent_child_info[1] === fromComp.GUID) {
      // && parent_child_info[3] === toComp.GUID
      parent_child_matrix_fast_check.splice(_i4, 1);
    }
  }

  redrawDependents(components_of_the_edge['to']);
  delete edge_comp_matrix[edge_to_be_deleted];
  reactContext$1.setState({
    comp_input_edges: comp_input_edges,
    comp_output_edges: comp_output_edges,
    parent_child_matrix: parent_child_matrix,
    edge_comp_matrix: edge_comp_matrix,
    allEdges: allEdges,
    parent_child_matrix_fast_check: parent_child_matrix_fast_check
  });
} // End of deleteEdge


function popupMessage(message) {
  d3$c.select('div#buttonClickedname').text(message).style('opacity', function () {
    reactContext$1.setState({
      messageshown: true
    });
    return 0.8;
  });
} // End of popupMessage

/**
 * Set the status of a generic component (idle, active, error) based on its color
 * @param {*} id the id of the component
 * @param {*} Compstatus the text color of the component
 */


function componentStatus(id, Compstatus) {
  if (Compstatus === 'green') {
    d3$c.select('rect#statusRect' + id).attr('fill', '#02521b');
    d3$c.select('text#statusText' + id).text('Active').attr('fill', '#6cff13');
  } else if (Compstatus === '#ffca28') {
    d3$c.select('rect#statusRect' + id).attr('fill', Compstatus);
    d3$c.select('text#statusText' + id).text('Idle ...').attr('fill', 'black');
  } else if (Compstatus === 'red') {
    d3$c.select('rect#statusRect' + id).attr('fill', '#fceecc');
    d3$c.select('text#statusText' + id).text('Error').attr('fill', 'red');
  }
} // End of componentStatus


function moveComponent(id, x, y) {
  d3$c.select('#comp-' + id).attr('transform', function () {
    return 'translate(' + x + ',' + y + ')';
  });
  handleEdgeMovement(id, x, y);
} // End of moveComponent


function runDeepFunction(compId) {
  reactContext$1.setState({
    runDeep: true
  });
  redrawDependents(compId);
  reactContext$1.setState({
    runDeep: false
  });
}

var globalVars = {
  initEdgex1: 0,
  initEdgey1: 0,
  fromCircle: addCircle(),
  toCircle: addCircle(),
  selection_rectangle_group_rect: null,
  doubleClicked: false,
  date: 'km now',
  IDLE_COLOR: '#dfd4b1',
  ACTIVE_COLOR: 'green',
  ERROR_COLOR: 'red',
  COMPONENT_RADIUS: 1,
  allComp: [],
  allEdges: [],
  comp_input_edges: {},
  comp_output_edges: {},
  edge_comp_matrix: {},
  parent_child_matrix: {},
  parent_child_matrix_fast_check: [],
  root_components: {},
  components_selection_data: {},
  selected_components: [],
  runDeep: false,
  StringAnchorclicked: false,
  StringAnchorType: null,
  StringAnchorId: '',
  XANCHOR: 0,
  YANCHOR: 1,
  XYANCHOR: 2,
  ANCHOR_WIDTH: 10,
  SLIDER_START_POSITION: 60 - 60,
  SLIDER_END_POSITION: 238 - 60,
  anchorMouseXpos: 0,
  anchorMouseYpos: 0,
  SliderAnchorclicked: false,
  selectedSliderComponent: null,
  dragX: 0,
  dragY: 0,
  sliderRectId: '',
  componentClickX: 0,
  componentClickY: 0,
  initPos: null,
  startDrag: false,
  clickedId: '',
  rectType: '',
  deltaX: 0,
  deltaY: 0,
  clicked: false,
  edgeStarted: false,
  targetcircleIN: false,
  selectedcircleId: '',
  targetcircleId: '',
  selectedSliderAnchorId: '',
  xGrid: 0,
  yGrid: 0,
  mousex: 0,
  mousey: 0,
  // text global variables.
  textareaStarted: false,
  textAreaRectId: '',
  optionListStarted: false,
  optionlistRectid: '',
  justSelected: null,
  mouseInsideOption: false,
  //selected component variables.
  is_component_selected: false,
  selected_component_id: '',
  rightColumnIsSelected: false,
  leftColumnIsSelected: false,
  topColumnIsSelected: false,
  rightColIsdisplayed: true,
  leftColIsdisplayed: true,
  is_edge_selected: false,
  currentTopBarHeight: 30,
  currentLeftColWidth: 225,
  currentRightColWidth: 50,
  messageshown: false,
  dataLoad: 0
};

/*
───────────────────────────────────────────────────────────────────────────────────────────────
─██████─────────██████████████─████████──████████─██████████████─██████──██████─██████████████─
─██░░██─────────██░░░░░░░░░░██─██░░░░██──██░░░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─
─██░░██─────────██░░██████░░██─████░░██──██░░████─██░░██████░░██─██░░██──██░░██─██████░░██████─
─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██████░░██───████░░░░░░████───██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░░░░░░░░░██─────████░░████─────██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██████░░██───────██░░██───────██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██───────██░░██───────██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██████████─██░░██──██░░██───────██░░██───────██░░██████░░██─██░░██████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██──██░░██───────██░░██───────██░░░░░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████──██████───────██████───────██████████████─██████████████─────██████─────
───────────────────────────────────────────────────────────────────────────────────────────────
*/

var d3$b = require('d3');

function onMinimizeClick() {
  d3$b.select('#maximizeUpperBar').transition().style('display', 'block');
  d3$b.select('#minimizeUpperBar').style('display', 'none');
  d3$b.select('#TopPropertiesBar').transition().duration(200).style('top', '-60px');
  d3$b.select('#LeftPropertiesBar').transition().duration(200).style('top', '0px');
  d3$b.select('#PropertiesBar').transition().duration(200).style('top', '0px');
  d3$b.select('#LeftPropertiesBarSelector').transition().duration(200).style('top', '0px');
  d3$b.select('#PropertiesBarSelector').transition().duration(200).style('top', '0px');
  d3$b.select('.canvas_container').transition().duration(200).style('top', '0px');
  d3$b.select('#maximizeUpperBar').transition().duration(200).style('right', '300px').style('top', '61px');
  d3$b.select('#minimizeUpperBar').transition().duration(200).style('right', '300px').style('top', '61px');
}

function onMaximizeClick() {
  d3$b.select('#maximizeUpperBar').style('display', 'none');
  d3$b.select('#minimizeUpperBar').style('display', 'block');
  d3$b.select('#TopPropertiesBar').transition().duration(200).style('top', '0px');
  d3$b.select('#LeftPropertiesBar').transition().duration(200).style('top', '30px');
  d3$b.select('#PropertiesBar').transition().duration(200).style('top', '30px');
  d3$b.select('#LeftPropertiesBarSelector').transition().duration(200).style('top', '30px');
  d3$b.select('#PropertiesBarSelector').transition().duration(200).style('top', '30px');
  d3$b.select('.canvas_container').transition().duration(200).style('top', '30px');
  d3$b.select('#maximizeeUpperBar').transition().duration(200).style('right', '0px').style('top', '38px');
  d3$b.select('#minimizeUpperBar').transition().duration(200).style('right', '0px').style('top', '0px');
  d3$b.select('i#tomaximize').transition().duration(200).style('transform', 'rotate(180deg)');
}

function manageCanvas() {
  var reactContext = this;
  var svgContainer = d3$b.select('svg');
  var allContents = svgContainer.append('g').attr('id', 'allCanvasContents');
  var currentLeftColWidth = reactContext.state.currentLeftColWidth;
  var currentTopBarHeight = reactContext.state.currentTopBarHeight;
  var currentRightColWidth = reactContext.state.currentRightColWidth;
  var messageshown = reactContext.state.messageshown;
  var leftColumnIsSelected = reactContext.state.leftColumnIsSelected;
  var rightColIsdisplayed = reactContext.state.rightColIsdisplayed;
  var rightColumnIsSelected = reactContext.state.rightColumnIsSelected;
  var leftColIsdisplayed = reactContext.state.leftColIsdisplayed;
  allContents.append('rect').attr('fill', 'url(#img122)').attr('x', -1000).attr('y', -1000).attr('width', 6000).attr('height', 6000).style('cursor', 'default');
  allContents.append('g').attr('id', 'allPaths');
  svgContainer.call(d3$b.zoom().filter(function (event) {
    return !(reactContext.state.startDrag || reactContext.state.StringAnchorclicked || reactContext.state.SliderAnchorclicked || reactContext.state.edgeStarted || reactContext.state.selection_groud_selected) && event.button === 0;
  }).on('zoom', function (event) {
    if (!reactContext.state.startDrag) {
      reactContext.setState({
        canvasX: event.transform.x,
        canvasY: event.transform.y
      });
      allContents.attr('transform', event.transform);
    }
  }));
  svgContainer.on('dblclick.zoom', null);
  $__default['default']('div#definedComp').html(function () {
    var somearr = reactContext.state.udo_names;
    var text = '';

    var _loop = function _loop(cat) {
      if (reactContext.state.cats.hasOwnProperty(cat)) {
        text += '<div id="catcard">';
        text += '<div id="catHead" style="background-color:' + reactContext.state.cats[cat] + '">' + cat + '</div>';
        text += '<div id="catbody">'; // eslint-disable-next-line no-loop-func

        somearr.forEach(function (element, i) {
          if (reactContext.state.udo_cats[i] === cat) {
            text += '<button id="addComp" name="' + element + '" shName="' + reactContext.state.udo_shortNames[i] + '" desc=\'' + reactContext.state.udo_desc[i] + '\' type="' + reactContext.state.udo_types[i] + '" dftype="' + reactContext.state.udo_dftypes[i] + '" class="standardcat button" ><span style="background-color:' + reactContext.state.udo_fill[i] + ';color:' + reactContext.state.udo_fill[i] + ';border-radius:3px;">||</span> ' + element + '</button>';
          }
        });
        text += '</div></div>';
      }
    };

    for (var cat in reactContext.state.cats) {
      _loop(cat);
    }

    return text;
  });
  d3$b.select('div#LeftPropertiesBar').style('width', function () {
    return currentLeftColWidth + 'px';
  }).style('top', function () {
    return currentTopBarHeight.toString() + 'px';
  });
  d3$b.select('div#LeftPropertiesBarSelector').style('top', function () {
    return currentTopBarHeight.toString() + 'px';
  }).style('left', currentLeftColWidth + 'px');
  d3$b.select('div#PropertiesBarSelector').style('top', function () {
    return currentTopBarHeight.toString() + 'px';
  }).style('right', currentRightColWidth + 'px');
  d3$b.select('div#TopPropertiesBar').style('height', function () {
    return currentTopBarHeight + 'px';
  });
  d3$b.select('div#PropertiesBarSelector').on('mousedown', function () {
    currentRightColWidth = parseInt($__default['default']('div#PropertiesBar').css('width').replace('px', ''));
    rightColumnIsSelected = true;
  });
  d3$b.select('div#LeftPropertiesBarSelector').on('mousedown', function () {
    currentLeftColWidth = parseInt($__default['default']('div#LeftPropertiesBar').css('width').replace('px', ''));
    leftColumnIsSelected = true;
  });
  d3$b.select('body').on('mousemove', function (event) {
    d3$b.select(event.currentTarget).style('cursor', 'auto');
    currentRightColWidth = window.innerWidth - 16 - event.clientX;
    currentLeftColWidth = event.clientX;

    if (rightColumnIsSelected) {
      d3$b.select('div#PropertiesBar').style('width', function () {
        if (currentRightColWidth >= 50) {
          if (!rightColIsdisplayed) d3$b.select('div#PropertiesBar').style('display', 'block');
          d3$b.select('div#PropertiesBarSelector').style('background-color', '#252525');
          rightColIsdisplayed = true;
          return currentRightColWidth.toString() + 'px';
        } else {
          rightColIsdisplayed = false;
          d3$b.select('div#PropertiesBar').style('display', 'none');
          d3$b.select('div#PropertiesBarSelector').style('background-color', '#1abc9c');
        }
      });
      d3$b.select('div#PropertiesBarSelector').style('right', function () {
        if (currentRightColWidth >= 50) {
          return currentRightColWidth.toString() + 'px';
        } else {
          return 0 .toString() + 'px';
        }
      });
    }

    if (leftColumnIsSelected) {
      d3$b.select('body').style('cursor', 'ew-resize');
      d3$b.select('div#LeftPropertiesBar').style('width', function () {
        if (currentLeftColWidth >= 50) {
          if (!leftColIsdisplayed) d3$b.select('div#LeftPropertiesBar').style('display', 'block');
          d3$b.select('div#LeftPropertiesBarSelector').style('background-color', '#252525');
          leftColIsdisplayed = true;
          return currentLeftColWidth.toString() + 'px';
        } else {
          leftColIsdisplayed = false;
          d3$b.select('div#LeftPropertiesBar').style('display', 'none');
          d3$b.select('div#LeftPropertiesBarSelector').style('background-color', '#1abc9c');
        }
      });
      d3$b.select('div#LeftPropertiesBarSelector').style('left', function () {
        if (currentLeftColWidth >= 50) {
          return currentLeftColWidth.toString() + 'px';
        } else {
          return 0 .toString() + 'px';
        }
      });
    }

    if (messageshown) {
      var trns = d3$b.transition().duration(500).ease(d3$b.easeLinear);
      d3$b.select('div#Addedmessage').transition(trns).style('opacity', function () {
        messageshown = false;
        return 0;
      });
      d3$b.select('div#buttonClickedname').transition(trns).style('opacity', function () {
        messageshown = false;
        return 0;
      });
    }
  }).on('mouseup', function () {
    if (rightColumnIsSelected) rightColumnIsSelected = false;
    if (leftColumnIsSelected) leftColumnIsSelected = false;
  });
}

var d3$a = require('d3');

var selection_box_x = 0;
var selection_box_y = 0;
var temp_selected_xs = [];
var temp_selected_ys = [];
var min_selected_x = 0;
var min_selected_y = 0;
var max_selected_x = 0;
var max_selected_y = 0;
var selection_rectangle_group = null;
var selection_rectangle_group_rect = null;
var horizontal_alignment_box = null;
var vertical_alignment_box = null;
var horizontal_align_box = {
  W: 150.0,
  H: 30.0,
  color: '#373f46',
  opacity: 0.8,
  radius: 5.0
};
var vertical_align_box = {
  W: 30.0,
  H: 150.0,
  color: '#373f46',
  opacity: 0.8,
  radius: 5.0
};
var selection_box_started = false;
var selection_box = null;
var reactContext;

function manageGrid() {
  reactContext = this;
  var allContents = d3$a.select('#allCanvasContents');
  var optionListStarted = reactContext.state.optionListStarted;
  var startDrag = reactContext.state.startDrag;
  var mouseInsideOption = reactContext.state.mouseInsideOption;
  var selected_component_id = reactContext.state.selected_component_id;
  allContents.style('backgroud-color', function () {
    this.offsetLeft;
    this.offsetTop;
    return 'white';
  }).on('mousedown', function () {
    if (optionListStarted && !startDrag && !mouseInsideOption) {
      d3$a.selectAll('rect.optionListoption').style('display', 'none');
      d3$a.selectAll('text.optionListoptiontext').style('display', 'none');
      reactContext.setState({
        optionListStarted: false,
        mouseInsideOption: false
      });
    }
  }).on('keydown', function (event) {
    console.log('deleting');

    if (event.keyCode === 46) {
      //delete
      if (reactContext.state.selected_components.length > 1) {
        console.log('You will delete ');
      }

      var elem = selectComp(selected_component_id);

      if (elem == null) {
        console.log('Something went wrong, invalid selected component');
        return;
      }

      if (elem.type === 'fileUpload') {
        if (window.confirm('Are you sure you want to delete this file from the database? ')) {
          console.log('You should delete the file from the database now... ');
          deleteComponent(selected_component_id);
        } else {
          console.log('not deleted. ');
        }
      } else {
        deleteComponent(selected_component_id);
      }
    }
  }).on('dblclick', function (event) {
    d3$a.select('div#buttonClickedname').text('dblclick').style('opacity', function () {
      reactContext.setState({
        messageshown: true
      });
      return 1;
    });
    reactContext.setState({
      mousex: d3$a.pointer(event, allContents.node())[0],
      mousey: d3$a.pointer(event, allContents.node())[1]
    });
    d3$a.select('body').append('option');
  }).on('contextmenu', function (event) {
    //context menu event raised on right click
    event.preventDefault();
    popupMessage('RMB');
    selection_box_started = true;
    selection_box_x = d3$a.pointer(event, allContents.node())[0];
    selection_box_y = d3$a.pointer(event, allContents.node())[1];
    selection_box = allContents.append('polyline');
  }).on('mousemove', function (event) {
    var mousex = d3$a.pointer(event, allContents.node())[0];
    var mousey = d3$a.pointer(event, allContents.node())[1];
    reactContext.setState({
      mousex: mousex,
      mousey: mousey
    });

    if (reactContext.state.startDrag) {
      var x = mousex - reactContext.state.componentClickX;
      var y = mousey - reactContext.state.componentClickY;
      moveComponent(reactContext.state.clickedId, x, y);
    }

    if (reactContext.state.edgeStarted) {
      d3$a.select('#' + reactContext.state.selectedcircleId).attr('d', function () {
        return returnCurveString(reactContext.state.initEdgex1, reactContext.state.initEdgey1, mousex, mousey);
      }).attr('fill', 'none').attr('stroke-opacity', '0.2').attr('interpolate', 'basis');
    }

    var textAreaRectId = reactContext.state.textAreaRectId;
    var optionlistRectid = reactContext.state.optionlistRectid;

    if (reactContext.state.textareaStarted) {
      var selectedRect = getlocationFromTransform(d3$a.select('g#comp-' + textAreaRectId).attr('transform'));
      d3$a.select('#TextAreaSelector').style('position', 'absolute').style('height', (parseFloat(d3$a.select('rect#' + textAreaRectId).attr('height')) - 50).toString() + 'px').style('left', selectedRect[0] + 4 + 'px').style('top', selectedRect[1] + 17 + 'px').style('border', 'none');
    }

    if (reactContext.state.optionListStarted) {
      selectedRect = getlocationFromTransform(d3$a.select('g#comp-' + optionlistRectid).attr('transform'));
      d3$a.select('#optionListSelectItems' + optionlistRectid).style('position', 'absolute').style('height', (parseFloat(d3$a.select('rect#' + optionlistRectid).attr('height')) - 50).toString() + 'px').style('left', selectedRect[0] + 20 + 'px').style('top', selectedRect[1] + 1 + 'px');
    } // if (reactContext.state.StringAnchorclicked) {
    //     if (StringAnchorType === YANCHOR) {
    //         //TODO : encabsulate this in a function.
    //         var newHeight = mousey - anchorMouseYpos;
    //         if (newHeight > 20)
    //             newHeight = mousey - anchorMouseYpos;
    //         else
    //             newHeight = 22;
    //         var thisComp = selectComp(allComp, StringAnchorId)
    //         thisComp.height = newHeight;
    //         d3.select("rect#dummyRect_" + StringAnchorId)
    //             .attr("height",newHeight);
    //         d3.select("rect#"+StringAnchorId)
    //         .attr("height",newHeight );
    //         d3.select("rect#statusRect"+StringAnchorId)
    //         .attr("y", newHeight-20)
    //         d3.select("foreignObject#panel_status_"+StringAnchorId)
    //         .attr("y",newHeight+2);
    //         d3.select("rect#overlaySelector"+StringAnchorId)
    //         .attr("height", newHeight-5)
    //         d3.select("rect.yAnchor." + StringAnchorId)
    //         .attr("y", newHeight-ANCHOR_WIDTH);
    //         d3.select("rect.xAnchor." + StringAnchorId)
    //         .attr("height", thisComp.height-ANCHOR_WIDTH);
    //         d3.select("rect.xyAnchor." + StringAnchorId)
    //         .attr("x", thisComp.width-ANCHOR_WIDTH)
    //         .attr("y", thisComp.height-ANCHOR_WIDTH);
    //         d3.select("foreignObject#textbody_" + StringAnchorId)
    //         .attr("height", thisComp.height-ANCHOR_WIDTH-5)
    //         d3.select("foreignObject#panel_edit_mode"+StringAnchorId)
    //         .attr("y", newHeight + 2)
    //         d3.select("g#logCirGroup_" + StringAnchorId)
    //         .attr("transform", () => {
    //             x = thisComp.width;
    //             y = thisComp.height;
    //             return "translate(" + (x).toString() + "," + (y - 10).toString() + ")";
    //         });
    //         d3.select("circle#outputCir"+StringAnchorId+"_0")
    //         .attr("cy", thisComp.height / 2);
    //         d3.select("circle#inputCir"+StringAnchorId+"_0")
    //         .attr("cy", thisComp.height / 2);
    //     } else if (reactContext.state.StringAnchorType === XANCHOR) {
    //         //TODO : encabsulate this in a function.
    //         var newWidth = mousex - anchorMouseXpos;
    //         if (newWidth > 200)
    //             newWidth = mousex - anchorMouseXpos;
    //         else
    //             newWidth = 201;
    //         thisComp = selectComp(allComp, StringAnchorId)
    //         thisComp.width = newWidth;
    //         d3.select("rect#dummyRect_"+StringAnchorId)
    //             .attr("width",newWidth);
    //         d3.select("rect#statusRect"+StringAnchorId)
    //         .attr("width",newWidth-50);
    //         d3.select("rect.CompBody."+StringAnchorId+".a")
    //         .attr("width",newWidth);
    //         d3.select("foreignObject#panel_status_"+StringAnchorId)
    //         .attr("width",newWidth-50);
    //         d3.select("rect.xAnchor."+StringAnchorId)
    //         .attr("x", newWidth-ANCHOR_WIDTH);
    //         d3.select("rect.yAnchor."+StringAnchorId)
    //         .attr("width", thisComp.width-ANCHOR_WIDTH);
    //         d3.select("rect.xyAnchor."+StringAnchorId)
    //         .attr("x", thisComp.width-ANCHOR_WIDTH)
    //         .attr("y", thisComp.height-ANCHOR_WIDTH);
    //         d3.select("foreignObject#textbody_"+StringAnchorId)
    //         .attr("width", thisComp.width - 4 - ANCHOR_WIDTH )
    //         d3.select("g#logCirGroup_"+StringAnchorId)
    //         .attr("transform", () => {
    //             x = thisComp.width;
    //             y = thisComp.height;
    //             return "translate(" + (x).toString() + "," + (y - 10).toString() + ")";
    //         });
    //         d3.select("foreignObject#panel_edit_mode"+StringAnchorId)
    //         .attr("x", newWidth - 30)
    //         d3.select("circle#outputCir"+StringAnchorId+"_0")
    //         .attr("cx", thisComp.width);
    //     }
    // }


    if (selection_box_started) {
      var x1 = selection_box_x;
      var y1 = selection_box_y;
      var x2 = d3$a.pointer(event, allContents.node())[0];
      var y2 = selection_box_y;
      var x3 = d3$a.pointer(event, allContents.node())[0];
      var y3 = d3$a.pointer(event, allContents.node())[1];
      var x4 = selection_box_x;
      var y4 = d3$a.pointer(event, allContents.node())[1];
      selection_box.attr('x', selection_box_x).attr('points', function () {
        return x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x3 + ',' + y3 + ' ' + x4 + ',' + y4 + ' ' + x1 + ',' + y1 + ' ';
      }).attr('fill', function () {
        if (x1 > x2) return '#2a2a48';else return '#a95b54';
      }).attr('stroke', 'black').attr('stroke-dasharray', '4 4').attr('stroke-width', 1).attr('fill-opacity', 0.1);
    }

    handleEdgeMovement(reactContext.state.StringAnchorId);
  }).on('mouseup', function () {
    if (reactContext.state.startDrag) {
      try {
        //This needs to move to a separate function .
        var clickedId = reactContext.state.clickedId;
        var just_moved_component = selectComp(clickedId);

        var current_components_selection = _objectSpread2({}, reactContext.state.components_selection_data);

        current_components_selection[clickedId] = {
          x0: just_moved_component.X,
          y0: just_moved_component.Y,
          x1: just_moved_component.X + just_moved_component.width,
          y1: just_moved_component.Y + just_moved_component.height
        };
        reactContext.setState({
          components_selection_data: current_components_selection
        });
        just_moved_component = null;
      } catch (error) {
        console.log(error);
      }

      reactContext.setState({
        startDrag: false
      });
    }

    if (reactContext.state.edgeStarted) {
      reactContext.setState({
        edgeStarted: false
      });
      d3$a.select('#' + reactContext.state.selectedcircleId).remove();
    }

    if (reactContext.state.StringAnchorclicked) {
      var StringAnchorId = reactContext.state.StringAnchorId;
      var modified_string_comp = selectComp(StringAnchorId);
      current_components_selection = _objectSpread2({}, reactContext.state.components_selection_data);
      current_components_selection[StringAnchorId] = {
        x0: modified_string_comp.X,
        y0: modified_string_comp.Y,
        x1: modified_string_comp.X + modified_string_comp.width,
        y1: modified_string_comp.Y + modified_string_comp.height
      };
      reactContext.setState({
        components_selection_data: current_components_selection,
        StringAnchorclicked: false
      });
    }

    if (reactContext.state.SliderAnchorclicked) {
      reactContext.setState({
        SliderAnchorclicked: false
      });
    }

    if (selection_box_started) {
      selection_box.remove();
      reactContext.setState({
        selected_components: []
      });
      temp_selected_xs = [];
      temp_selected_ys = [];
      min_selected_x = 0;
      min_selected_y = 0;
      max_selected_x = 0;
      max_selected_y = 0;

      var components_selection_data = _objectSpread2({}, reactContext.state.components_selection_data);

      var current_selected_comps = reactContext.state.selected_components;

      for (var key in components_selection_data) {
        if (components_selection_data.hasOwnProperty(key)) {
          if (components_selection_data[key].x0 > selection_box_x && components_selection_data[key].y0 > selection_box_y && components_selection_data[key].x1 < d3$a.pointer(allContents.node())[0] && components_selection_data[key].y1 < d3$a.pointer(allContents.node())[1]) {
            temp_selected_xs.push(components_selection_data[key].x0);
            temp_selected_xs.push(components_selection_data[key].x1);
            temp_selected_ys.push(components_selection_data[key].y0);
            temp_selected_ys.push(components_selection_data[key].y1);
            reactContext.setState({
              selected_components: current_selected_comps.push(key)
            });
          }
        }
      }

      highlightSelection(current_selected_comps, temp_selected_xs, temp_selected_ys);
      selection_box_started = false;
    }

    if (reactContext.state.selection_groud_selected) {
      reactContext.setState({
        selection_groud_selected: false
      });
    }
  });
} //END


var someCircle;

function highlightSelection(components_list, temp_selected_xs, temp_selected_ys) {
  var allContents = d3$a.select('#allCanvasContents');

  if (selection_rectangle_group != null) {
    selection_rectangle_group.remove();
    selection_rectangle_group = null;
    horizontal_alignment_box.remove();
    horizontal_alignment_box = null;
    vertical_alignment_box.remove();
    vertical_alignment_box = null;
    selection_rectangle_group_rect.remove();
    selection_rectangle_group_rect = null;
    someCircle.remove();
  }

  if (components_list.length > 0) {
    min_selected_x = Math.min.apply(Math, _toConsumableArray(temp_selected_xs));
    max_selected_x = Math.max.apply(Math, _toConsumableArray(temp_selected_xs)) - min_selected_x;
    min_selected_y = Math.min.apply(Math, _toConsumableArray(temp_selected_ys));
    max_selected_y = Math.max.apply(Math, _toConsumableArray(temp_selected_ys)) - min_selected_y;
    someCircle = allContents.append('circle').attr('cx', (min_selected_x + min_selected_x + max_selected_x) / 2.0).attr('cy', (min_selected_y + min_selected_y + max_selected_y) / 2.0).attr('r', 10).attr('fill', 'red');
    selection_rectangle_group = allContents.append('g').attr('transform', 'translate(' + (min_selected_x - 20) + ',' + (min_selected_y - 20) + ')').attr('width', max_selected_x + 40).attr('height', max_selected_y + 40);
    selection_rectangle_group_rect = selection_rectangle_group.append('rect').attr('width', max_selected_x + 40).attr('height', max_selected_y + 40).attr('fill', 'gray').attr('rx', 25).attr('ry', 25).attr('fill-opacity', 0.3).attr('stroke', 'black').attr('stroke-width', 2).attr('stroke-opacity', 0.5).style('cursor', 'pointer').on('mousedown', function () {
      reactContext.setState({
        selection_groud_selected: true
      });
      console.log('you are in now .... ... ');
    });
    horizontal_alignment_box = showHorizontalAlignment(selection_rectangle_group);
    vertical_alignment_box = showVerticalAlignment(selection_rectangle_group);
  }
}

function showHorizontalAlignment(selectionBox) {
  var horizAlignBox = selectionBox.append('rect').attr('x', (selectionBox.attr('width') - horizontal_align_box.W) / 2.0).attr('y', -horizontal_align_box.H - 5).attr('width', horizontal_align_box.W).attr('height', horizontal_align_box.H).attr('fill', horizontal_align_box.color).attr('rx', horizontal_align_box.radius).attr('opacity', horizontal_align_box.opacity);
  selectionBox.append('foreignObject').attr('id', 'halign_box').attr('x', (selectionBox.attr('width') - horizontal_align_box.W) / 2.0).attr('width', horizontal_align_box.W).attr('height', horizontal_align_box.H).attr('y', -horizontal_align_box.H - 5).html("&nbsp;<a href=\"#\" onclick=\"alignComponent('left')\"><i class=\"fa fa-align-left\"></i></a>\n            <a href=\"#\" onclick=\"alignComponent('center')\" ><i class=\"fa fa-align-center\"></i></a>\n            <a href=\"#\"  onclick=\"alignComponent('right')\"><i class=\"fa fa-align-right\"></i></a>\n            <a href=\"#\"><i class=\"fa fa-pause\" aria-hidden=\"true\"></i><i class=\"fa fa-pause\" aria-hidden=\"true\" style=\"margin-left: 3px;\"></i></a>\n            ");
  return horizAlignBox;
}

function showVerticalAlignment(selectionBox) {
  var vertAlignBox = selectionBox.append('rect').attr('y', (selectionBox.attr('height') - vertical_align_box.H) / 2.0).attr('x', -vertical_align_box.W - 5).attr('width', vertical_align_box.W).attr('height', vertical_align_box.H).attr('fill', vertical_align_box.color).attr('opacity', vertical_align_box.opacity).attr('rx', vertical_align_box.radius);
  selectionBox.append('foreignObject').attr('id', 'valign_box').attr('y', (selectionBox.attr('height') - vertical_align_box.H) / 2.0).attr('width', vertical_align_box.W).attr('height', vertical_align_box.H).attr('x', -vertical_align_box.W - 5).html("<a id=\"valign_icon\" href=\"#\"><i class=\"fa fa-align-left fa-rotate-90\"></i></a>\n            <a  id=\"valign_icon\" href=\"#\"><i class=\"fa fa-align-center fa-rotate-90\"></i></a>\n            <a id=\"valign_icon\"  href=\"#\"><i class=\"fa fa-align-right fa-rotate-90\"></i></a>\n            <a id=\"valign_icon\"  href=\"#\" style=\"margin-left: 5px;\" ><i class=\"fa fa-pause fa-rotate-90\" aria-hidden=\"true\"></i>\n            <i class=\"fa fa-pause fa-rotate-90\" aria-hidden=\"true\"></i></a>\n            ");
  return vertAlignBox;
}

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAAG80e8cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB+FJREFUeNrswQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAnJoAA7MIBCQAAAICg/6/7EYoCAAAAAAAAAAAAAAAAAAAzCcAuHNMAAAAACOrf2hZeMAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4JwC4ckAAAAAAI+v+6HYGiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArCWAAOzCAQkAAACAoP+vG5KiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwFoCsFPHJgAAIRAEwRbsv1dbOMyUGT68SNhPX9vZ2d3dlT8M/hM6CB0QOiB0QOiA0AGhA0IHhA5CB4QOCB0QOiB0QOiA0AGhg9ABoQNCB4QOCB0QOiB0QOggdCcAoQNCB4QOCB0QOiB0QOiA0EHogNABoQNCB4QOCB0QOiB0EDogdEDogNABoQNCB4QOCB2EDggdEDogdEDogNABoQNCB4QOQgeEDggdEDogdEDogNABoYPQAaEDQgeEDggdEDogdEDoIHRA6IDQAaEDQgeEDggdEDogdBA6IHRA6IDQAaEDQgeEDggdhA4IHRA6IHRA6IDQAaEDQgehA0IHhA4IHRA6IHRA6IDQAaGD0AGhA0IHhA4IHRA6IHRA6CB0QOiA0AGhA0IHhA4IHRA6CB0QOiB0QOiA0AGhA0IHhA4IHYQOCB0QOiB0QOiA0AGhA0IHoQNCB4QOCB0QOiB0QOiA0EHogNABoQNCB4QOCB0QOiB0QOggdEDogNABoQNCB4QOCB0QOggdEDogdEDogNABoQNCB4QOQgeEDggdEDogdEDogNABoQNCB6EDQgeEDggdEDogdEDogNBB6IDQAaEDQgeEDggdEDogdBA6IHRA6IDQAaEDQgeEDggdEDoIHRA6IHRA6IDQAaEDQgeEDkIHhA4IHRA6IHRA6IDQAaGD0AGhA0IHhA4IHRA6IHRA6IDQQeiA0AGhA0IHhA4IHRA6IHQQOiB0QOiA0AGhA0IHNkYAAdq5YxMGoiCGgr4a3H+vLmBTccJiBscv1fHBm/599fT09PT09N7v+XIHgAEGHQAMOgBg0AEAgw4AGHQAMOgAgEEHAIKeT/7P7QDAn3PpR09PT09Pr9Dz5A4AAww6ABh0AMCgAwAGHQAw6ABg0AEAgw4ABLkUBwAcLv3o6enp6ekVep7cAWCAQQcAgw4AGHQAwKADAAYdAAw6AGDQAYAgl+IAgMOlHz09PT09vULPkzsADDDoAGDQAQCDDgAYdADAoAOAQQcADDoAEORSHABwuPSjp6enp6dX6HlyB4ABBh0ADDoAYNABAIMOABh0ADDoAIBBBwCCXIoDAA6XfvT09PT09Ao9T+4AMMCgA4BBBwAMOgBg0AEAgw4ABh0AMOgAQJBLcQDA4dKPnp6enp5eoefJHQAGGHQAMOgAgEEHAAw6AGDQAcCgAwAGHQAIcikOADhc+tHT09PT0yv0PLkDwACDDgAGHQAw6ACAQQcADDoAGHQAwKADAEEuxQEAh0s/enp6enp6hZ4ndwAYYNABwKADAAYdADDoAIBBBwCDDgAYdAAgyKU4AOBw6UdPT09PT6/Q8+QOAAMMOgAYdADAoAMABh0AMOgAYNABAIMOAAS5FAcAHC796Onp6enpFXqe3AFggEEHAIMOABh0AMCgAwAGHQAMOgBg0AGAIJfiAIDDpR89PT09Pb1Cz5M7AAww6ABg0AEAgw4AGHQAwKADgEEHAAw6ABDkUhwAcLj0o6enp6enV+h5cgeAAQYdAAw6AGDQAQCDDgAYdAAw6ACAQQcAglyKAwAOl3709PT09PQKPU/uADDAoAOAQQcADDoAYNABAIMOAAYdADDoAECQS3EAwOHSj56enp6eXqHnyR0ABhh0ADDoAIBBBwAMOgBg0AHAoAMABh0ACHIpDgA4XPrR09PT09Mr9Dy5A8AAgw4ABh0AMOgAgEEHAAw6ABh0AMCgAwBBLsUBAIdLP3p6enp6eoWeJ3cAGGDQAcCgAwAGHQAw6ACAQQcAgw4AGHQAIMilOADgcOlHT09PT0+v0PPkDgADDDoAGHQAwKADAAYdADDoAGDQAQCDDgAEuRQHABwu/ejp6enp6RV6ntwBYIBBBwCDDgAYdADAoAMABh0ADDoAYNABgCCX4gCAw6UfPT09PT29Qs+TOwAMMOgAYNABAIMOABh0AMCgA4BBBwAMOgAQ5FIcAHC49KOnp6enp1foeXIHgAEGHQAMOgBg0AEAgw4AGHQAMOgAgEEHAIJcigMADpd+9PT09PT0Cj1P7gAwwKADgEEHAAw6AGDQAQCDDgAGHQAw6ABAkEtxAMDh0o+enp6enl6h58kdAAYYdAAw6ACAQQcADDoAYNABwKADAAYdAAhyKQ4AOFz60dPT09PTK/Q8uQPAAIMOAAYdADDoAIBBBwAMOgAYdADAoAMAQS7FAQCHSz96enp6enqFnid3ABhg0AHAoAMABh0AMOgAgEEHAIMOABh0ACDIpTgAGPADp1M1teRFeWkAAAAASUVORK5CYII=";

var Grid = /*#__PURE__*/function (_Component) {
  _inherits(Grid, _Component);

  var _super = _createSuper(Grid);

  function Grid() {
    _classCallCheck(this, Grid);

    return _super.apply(this, arguments);
  }

  _createClass(Grid, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "canvas_container canvas_container_inner main_canvas_container canvas_body_container"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "ui-designer-grid",
        id: "mainGrid"
      }, /*#__PURE__*/React__default['default'].createElement("svg", {
        height: "10000",
        width: "10000"
      }, /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("pattern", {
        id: "img122",
        patternUnits: "userSpaceOnUse",
        width: "500",
        height: "500"
      }, /*#__PURE__*/React__default['default'].createElement("image", {
        className: "rep",
        xlinkHref: img,
        x: "0",
        y: "0",
        width: "500",
        height: "500"
      })), /*#__PURE__*/React__default['default'].createElement("filter", {
        id: this.props.filter_id,
        x: "-40",
        y: "-40",
        width: "150%",
        height: "150%",
        filterUnits: "userSpaceOnUse"
      }, /*#__PURE__*/React__default['default'].createElement("feOffset", {
        result: "offOut",
        in: "SourceGraphics",
        dx: "0",
        dy: "0"
      }), /*#__PURE__*/React__default['default'].createElement("feGaussianBlur", {
        result: "blurOut",
        in: "offOut",
        stdDeviation: "1"
      }), /*#__PURE__*/React__default['default'].createElement("feBlend", {
        in: "SourceGraphic",
        in2: "blurOut",
        mode: "normal"
      })), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "grad1ient",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          'stopColour': '#dddddd',
          'stopOpacity': '100%'
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "50%",
        style: {
          "stopColour": "#eeeeee",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "100%",
        style: {
          "stopColour": "#dddddd",
          "stopOpacity": "100%"
        }
      }))), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "fileUploadGradient",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          "stopColour": "#344b62",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "10%",
        style: {
          "stopColour": "#344b62",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "12%",
        style: {
          "stopColour": "#2b3d50",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "88%",
        style: {
          "stopColour": "#2b3d50",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "90%",
        style: {
          "stopColour": "#23364a",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "100%",
        style: {
          "stopColour": "#23364a",
          "stopOpacity": "100%"
        }
      }))), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "gradientlsider",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          "stopColour": "#eeeeee",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "20%",
        style: {
          "stopColour": "#eeeeee",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "30%",
        style: {
          "stopColour": "#dddddd",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "70%",
        style: {
          "stopColour": "#dddddd",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "80%",
        style: {
          "stopColour": "#cccccc",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "100%",
        style: {
          "stopColour": "#cccccc",
          "stopOpacity": "100%"
        }
      }))), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "gradient2",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "10%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "30%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "60%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "80%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "60%"
        }
      }))), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "gradient2_2",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "50%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "0%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "70%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "0%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "100%",
        style: {
          "stopColour": "#ffffff",
          "stopOpacity": "30%"
        }
      }))), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "gradient3",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          "stopColour": "#555555",
          "stopOpacity": "0%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "28%",
        style: {
          "stopColour": "#555555",
          "stopOpacity": "0%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "30%",
        style: {
          "stopColour": "#555555",
          "stopOpacity": "20%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "80%",
        style: {
          "stopColour": "#555555",
          "stopOpacity": "50%"
        }
      }))), /*#__PURE__*/React__default['default'].createElement("defs", null, /*#__PURE__*/React__default['default'].createElement("linearGradient", {
        id: "gradient4",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "0%",
        style: {
          "stopColour": "#373939",
          "stopOpacity": "100%"
        }
      }), /*#__PURE__*/React__default['default'].createElement("stop", {
        offset: "100%",
        style: {
          "stopColour": "#023939",
          "stopOpacity": "100%"
        }
      })))))));
    }
  }]);

  return Grid;
}(React.Component);

/*
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████──────────██████─██████████████─██████████████─██████──────────██████─██████████████─██████──────────██████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████████████░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─
─██░░██████████─██░░██████░░██─██░░░░░░░░░░░░░░░░░░██─██░░██████░░██─██░░██████░░██─██░░░░░░░░░░██──██░░██─██░░██████████─██░░░░░░░░░░██──██░░██─██████░░██████─
─██░░██─────────██░░██──██░░██─██░░██████░░██████░░██─██░░██──██░░██─██░░██──██░░██─██░░██████░░██──██░░██─██░░██─────────██░░██████░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████░░██─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████████─██░░██──██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──██████──██░░██─██░░██████████─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████████─██░░██──██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──────────██░░██─██░░██─────────██░░██──██░░██─██░░██──██░░██████░░██─██░░██─────────██░░██──██░░██████░░██─────██░░██─────
─██░░██████████─██░░██████░░██─██░░██──────────██░░██─██░░██─────────██░░██████░░██─██░░██──██░░░░░░░░░░██─██░░██████████─██░░██──██░░░░░░░░░░██─────██░░██─────
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──────────██░░██─██░░██─────────██░░░░░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██─██░░██──██████████░░██─────██░░██─────
─██████████████─██████████████─██████──────────██████─██████─────────██████████████─██████──────────██████─██████████████─██████──────────██████─────██████─────
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

var d3$9 = require('d3');
/**
 * Create a new generic component (everything except slider, option list, panel, file upload, toogle, list view).
 * Example of calling this function for Average component:
 * CreateNewComponent(null, "Average", {"shortName": "AVG", "dfType": "shlow"}, [{"name": "InputList", "shortName": "in_01", "desc": "first input", "default_value": "1.0"}], ["average", "log_"], "#F23322")}
 * @param {*} FromExisting
 * @param {*} type the type of the component, either shallow or deep
 * @param {*} kwargs
 * @param {*} inputList a list of dictionary containing the name, short name, description and default value of the inputs.
 * This can be obtained by print out the udo_inputs in the Django version.
 * @param {*} outputList a list of string containing the name of the outputs. This can be obtained by print out the udo_outputs in the Django version.
 * @param {*} color the color of the component. The default color is #F23322 (orange). This can be obtained by print out the udo_fill in the Django version.
 */


function CreateNewComponent(reactContext, FromExisting = null, type = null, kwargs = null, inputList, outputList, color = '#F23322') {
  var IDLE_COLOR = reactContext.state.IDLE_COLOR;
  var COMPONENT_RADIUS = reactContext.state.COMPONENT_RADIUS;
  var one_character_width = 8;
  var padding = 20;
  var titleMargin = 30;
  var titleMarginLeft = 30;
  var newcomp;

  if (FromExisting != null) {
    newcomp = FromExisting;
  } else {
    var longestInput = '';

    for (let index = 0; index < inputList.length; index++) {
      const curr = inputList[index].name;

      if (curr.length > longestInput.length) {
        longestInput = curr;
      }
    }

    var longestOutput = outputList.reduce(function (a, b) {
      return a.length > b.length ? a : b;
    }, '');
    var ThisComponentName = type;
    let n_inputs = inputList.length;
    let n_outputs = outputList.length;
    newcomp = addcomponent(uuidv4('C'), n_inputs, n_outputs, inputList, outputList);

    if (type == null) {
      ThisComponentName = $__default['default']('div#addComp').attr('type');
    } else {
      ThisComponentName = type;
      newcomp.dftype = kwargs.dfType;
      newcomp.ShortName = kwargs.shortName;
      popupMessage(ThisComponentName + ' Component added');
    }

    newcomp.fill = color;
    newcomp.Name = ThisComponentName;
    newcomp.height = titleMargin + Math.max(newcomp.inputs.length, newcomp.outputs.length + 1) * padding;
    newcomp.width = (longestInput.length + longestOutput.length) * one_character_width + titleMarginLeft; // initiate the parent_children_matrix

    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
  }

  var allContents = d3$9.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var genX;
  var genY;
  var node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      if (kwargs.X !== undefined && kwargs.Y !== undefined) {
        newcomp.X = kwargs.X;
        newcomp.Y = kwargs.Y;
      } else {
        genX = Math.random() * 500 + 200;
        genY = Math.random() * 500 + 200;
        newcomp.X = genX;
        newcomp.Y = genY;
      }

      return 'translate(' + newcomp.X + ', ' + newcomp.Y + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  });
  var statusBar = node.append('g').attr('transform', 'translate(0,' + (newcomp.height - 25) + ')');
  statusBar.append('rect').attr('id', 'statusRect' + newcomp.GUID).attr('width', newcomp.width + 2).attr('x', -1.0).attr('height', 40).attr('fill', IDLE_COLOR).attr('stroke-width', 1).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('opacity', 0.5);
  statusBar.append('text').attr('class', 'statusTextClass').attr('id', 'statusText' + newcomp.GUID).attr('fill', 'black').attr('x', 5).attr('y', 37).text('Idle...');
  var InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('r', '7').attr('stroke', newcomp.fill).attr('stroke-width', '2').attr('id', 'inputCirViual' + newcomp.GUID + '_' + index).attr('class', 'inputCirVisual ' + newcomp.GUID + ' ' + index).attr('type', function () {
      if (FromExisting == null) {
        return 'text';
      } else {
        return FromExisting.inputs[index].type;
      }
    });
  }

  InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('fill-opacity', '0.3').attr('r', '15').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      if (FromExisting == null) {
        return 'text';
      } else {
        return FromExisting.inputs[index].type;
      }
    });
  }

  var OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('r', '7').attr('stroke', newcomp.fill).attr('stroke-width', '2').attr('id', 'outputCirVisual' + newcomp.GUID + '_' + index).attr('class', 'outputCirVisual ' + newcomp.GUID + ' ' + index).attr('type', function () {
      if (FromExisting == null) {
        return 'text';
      } else {
        return FromExisting.outputs[index].type;
      }
    }).lower();
  }

  OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('fill-opacity', '0.5').attr('r', '12').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      if (FromExisting == null) {
        return 'text';
      } else {
        return FromExisting.outputs[index].type;
      }
    });
  }

  node.append('rect').attr('class', 'CompCBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', COMPONENT_RADIUS + 1).attr('ry', COMPONENT_RADIUS + 1).attr('stroke-width', '3').attr('stroke', newcomp.fill).attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', '#E8E8E8').on('mousedown', () => {
    reactContext.setState({
      rectType: 'component'
    });
  });
  node.append('g').attr('transform', () => {
    var x = newcomp.width;
    var y = newcomp.height;
    return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
  });
  var Titlegroup = node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  }); //Title rectangle

  Titlegroup.append('rect').attr('width', newcomp.width - 2).attr('height', 20).attr('fill', newcomp.fill).attr('x', 1.0).attr('y', -14).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS);
  Titlegroup.append('rect').attr('width', newcomp.width - 2).attr('height', 8).attr('fill', newcomp.fill).attr('x', 1.0).attr('y', -2);
  node.append('rect').attr('width', newcomp.width - 2).attr('height', newcomp.height - 2).attr('x', 1.0).attr('y', 1).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('stroke', newcomp.fill).attr('fill-opacity', 0.0);
  Titlegroup.append('foreignObject').attr('class', 'nodetitle node_title' + newcomp.GUID).attr('id', 'node_title' + newcomp.GUID).attr('x', 0).attr('y', -10).attr('width', newcomp.width).attr('height', '20').text(newcomp.Name);
  var InputGroupText = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroupText.append('text').attr('id', 'input-' + newcomp.GUID + '_' + index).attr('class', 'inputTxt ' + newcomp.GUID + ' ' + index).attr('transform', 'translate(' + 10 + ' , ' + (index * padding + titleMargin + 5).toString() + ')').text(newcomp.inputs[index].Name).attr('fill', 'black').attr('type', function () {
      newcomp.inputs[index].textObj = this.id;

      if (FromExisting == null) {
        return 'text';
      } else {
        return FromExisting.inputs[index].type;
      }
    });
  }

  var OutputGroupText = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroupText.append('text').attr('id', 'output-' + newcomp.GUID + '_' + index).attr('class', 'outputTxt ' + newcomp.GUID + ' ' + index).attr('transform', 'translate(' + (newcomp.width - newcomp.outputs[index].ShortName.length * 8 - 5).toString() + ' , ' + (index * padding + titleMargin + 5).toString() + ')').text(newcomp.outputs[index].ShortName).attr('fill', 'black').attr('type', function () {
      newcomp.outputs[index].circle = this;

      if (FromExisting == null) {
        return 'text';
      } else {
        newcomp.outputs[index].type = FromExisting.outputs[index].type;
        return FromExisting.outputs[index].type;
      }
    }).attr('type', function () {
      newcomp.outputs[index].textObj = this.id;

      if (FromExisting == null) {
        return 'text';
      } else {
        return FromExisting.outputs[index].type;
      }
    });
  }

  node.append('rect').attr('class', 'CompCBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill).attr('fill-opacity', '0.01').on('mousemove', function (event) {
    d3$9.select(event.currentTarget).attr('cursor', 'pointer');
  }).on('mouseout', function (event) {
    d3$9.select(event.currentTarget).attr('fill', newcomp.fill);
  }).on('dblclick', () => {}).on('mousedown', () => {
    reactContext.setState({
      rectType: 'component'
    });
  });
  var icon = node.append('g').attr('transform', 'translate(' + (newcomp.width - 20).toString() + ',1)');
  icon.append('foreignObject').attr('width', 18).attr('height', 18).attr('style', () => {
    return `background-image:url(src/img/` + newcomp.Name + `.png);background-size: 15px;background-repeat: no-repeat;background-position: center;`;
  });

  if (newcomp.dftype === 'dp') {
    node.append('rect').attr('class', 'play ' + newcomp.GUID).attr('id', 'play_' + newcomp.GUID).attr('x', newcomp.width / 2.0 - 10).attr('y', newcomp.height - 10).attr('height', 20).attr('width', 20).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('fill', newcomp.fill).attr('stroke', newcomp.fill).attr('stroke-width', '6').style('cursor', 'pointer').on('click', function () {
      console.log('start calculation');
      runDeepFunction(newcomp.GUID);
    });
    node.append('svg').attr('role', 'img').attr('xmlns', 'http://www.w3.org/2000/svg').attr('width', 20).attr('height', 20).attr('x', newcomp.width / 2.0 - 10).attr('y', newcomp.height - 10).attr('viewBox', '0 0 512 512').append('path').attr('class', 'play ' + newcomp.GUID).attr('fill', 'white').attr('d', 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z').on('click', function () {
      console.log('start calculation');
      runDeepFunction(newcomp.GUID);
    });
  }

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a generic comp' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
}

/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████─██████████████─██████──────────██████────██████─────────██████████─██████████████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░██████░░██─██████░░██████─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██────██░░██─────────████░░████─██░░██████████─██████░░██████─
─██░░██──██░░██─██░░██──██░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██████░░██──██░░██────██░░██───────────██░░██───██░░██─────────────██░░██─────
─██░░██──██░░██─██░░██████░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░██████████─────██░░██─────
─██░░██──██░░██─██░░░░░░░░░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░░░░░░░░░██─────██░░██─────
─██░░██──██░░██─██░░██████████─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██████████░░██─────██░░██─────
─██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██████░░██────██░░██───────────██░░██───────────██░░██─────██░░██─────
─██░░██████░░██─██░░██─────────────██░░██─────████░░████─██░░██████░░██─██░░██──██░░░░░░░░░░██────██░░██████████─████░░████─██████████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██─────────────██░░██─────██░░░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██────██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████─────────────██████─────██████████─██████████████─██████──────────██████────██████████████─██████████─██████████████─────██████─────
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

var d3$8 = require('d3');

var optionListComp;
var OptionListValues;

function CreateNewOptionList(reactContext, FromExisting = null, optionlist_predefined_items = null) {
  var newcomp;

  if (FromExisting == null) {
    newcomp = addcomponent(uuidv4('C'), 1, 1);
    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
    newcomp.Name = 'Select item';

    if (optionlist_predefined_items != null) {
      newcomp.optionListValues = JSON.parse(optionlist_predefined_items);
    }
  } else {
    newcomp = FromExisting;
  }

  newcomp.fill = 'white';
  var padding = 20;
  var titleMargin = 30;
  newcomp.height = 20;
  newcomp.type = 'optionList';
  newcomp.dftype = 'shlow'; // TODO : get the longest text in the component. and set the width based on this.

  var allContents = d3$8.select('#allCanvasContents');
  newcomp.width = 200;
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var genX;
  var genY;
  var node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      genX = Math.random() * 500 + 200;
      genY = Math.random() * 500 + 200;
      newcomp.X = genX;
      newcomp.Y = genY;
      return 'translate(' + genX + ', ' + genY + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  }).data([{
    x: FromExisting ? FromExisting.X : genX,
    y: FromExisting ? FromExisting.Y : genY
  }]);
  var InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.inputs[index].circle = addCircle();
      newcomp.inputs[index].circle.element = this.id;
      newcomp.inputs[index].circle.CX = 0;
      newcomp.inputs[index].circle.CY = index * padding + titleMargin;
      newcomp.inputs[index].type = 'input';
      return 'input';
    });
  }

  var OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.outputs[index].circle = this;
      newcomp.outputs[index].type = 'output';
      return 'output';
    }).lower();
  }

  node.append('rect').attr('class', 'CompOBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('stroke-width', '1').attr('stroke', 'black').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill);
  var cirGroup = node.append('g').attr('transform', () => {
    let x = newcomp.width;
    let y = newcomp.height;
    return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
  });
  cirGroup.append('text').attr('id', 'nodeLog' + newcomp.GUID).attr('class', 'nodeLog ' + newcomp.GUID).attr('transform', 'translate(10, 10)').text(newcomp.log.logText).attr('fill', 'black').style('display', 'none');
  node.append('rect').attr('class', 'CompOBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', '1').on('mousemove', function (event) {
    d3$8.select(event.currentTarget).attr('cursor', 'pointer');
  });
  var Titlegroup = node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  });
  Titlegroup.append('text').attr('class', 'nodetitle node_title' + newcomp.GUID).attr('id', 'option-' + newcomp.GUID).text(newcomp.Name).attr('fill', 'black').attr('transform', 'translate(' + 20 + ', 0)');
  node.append('g').attr('id', 'optionListOption-' + newcomp.GUID);

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding an option list' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
}

function submitOptionListEdit(compKey) {
  optionListComp = selectComp(compKey);
  OptionListValues = optionListComp['optionListValues'];
  $__default['default']('textarea.textarea.optionlistProperties').text(function () {
    let optionListOptionsfromTextarea = '';
    let forTheHTMLpreview = '';

    for (const option in optionListComp['optionListValues']) {
      if (optionListComp['optionListValues'].hasOwnProperty(option)) {
        optionListOptionsfromTextarea += '<option value="' + optionListComp['optionListValues'][option] + '">' + option + '</option>';
        forTheHTMLpreview += option + '-->' + optionListComp['optionListValues'][option] + '<br>';
      }
    }

    $__default['default']('div#propertiesBarLog').html('<div id="success">Success:<br>' + forTheHTMLpreview + '</div>');
    $__default['default']('select#propertisBarSelecId').html(optionListOptionsfromTextarea);
    return JSON.stringify(optionListComp['optionListValues']);
  });
  $__default['default']('textarea.textarea.optionlistProperties').on('focusout', function (e) {
    try {
      let thedict = JSON.parse($__default['default'](this).val());
      OptionListValues = thedict;
      $__default['default']('select#propertisBarSelecId').html(function () {
        let optionListOptionsfromTextarea = '';
        let forTheHTMLpreview = '';

        for (const option in thedict) {
          if (thedict.hasOwnProperty(option)) {
            optionListOptionsfromTextarea += '<option value="' + thedict[option] + '">' + option + '</option>';
            forTheHTMLpreview += option + '-->' + thedict[option] + '<br>';
          }
        }

        $__default['default']('div#propertiesBarLog').html('<div id="success">Success:<br>' + forTheHTMLpreview + '</div>');
        return optionListOptionsfromTextarea;
      });
    } catch {
      $__default['default']('div#propertiesBarLog').html('<div id="error">Error: check Dictionary syntax,<br>example : {"key1":value1, "key2":value2}</div>');
    }
  });
}

function readyToGoSubmit(compKey) {
  optionListComp['optionListValues'] = OptionListValues;
  $__default['default']('div#propertiesBarContents').html('');
  addOptionDropdownList(compKey);
}

/*
───────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████─────────██████████─████████████───██████████████─████████████████───
─██░░░░░░░░░░██─██░░██─────────██░░░░░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██░░██████████─██░░██─────────████░░████─██░░████░░░░██─██░░██████████─██░░████████░░██───
─██░░██─────────██░░██───────────██░░██───██░░██──██░░██─██░░██─────────██░░██────██░░██───
─██░░██████████─██░░██───────────██░░██───██░░██──██░░██─██░░██████████─██░░████████░░██───
─██░░░░░░░░░░██─██░░██───────────██░░██───██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██████████░░██─██░░██───────────██░░██───██░░██──██░░██─██░░██████████─██░░██████░░████───
─────────██░░██─██░░██───────────██░░██───██░░██──██░░██─██░░██─────────██░░██──██░░██─────
─██████████░░██─██░░██████████─████░░████─██░░████░░░░██─██░░██████████─██░░██──██░░██████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░██──██░░░░░░██─
─██████████████─██████████████─██████████─████████████───██████████████─██████──██████████─
*/

var d3$7 = require('d3');

function addSlider(guid, min = 0, max = 100, step = 1.0) {
  var initSlider = {
    GUID: guid,
    X: 0,
    Y: 0,
    width: 150,
    height: 30,
    Name: 'Slider',
    ShortName: 'Num',
    Description: 'Dummy Slider',
    Message: 'short description',
    inputs: [],
    outputs: [],
    min: min,
    max: max,
    value: 0,
    step: step,
    typeName: null,
    selection: 'selectable',
    view: 'visible',
    // hidden , disabled
    fill: 'url(#grad1ient)',
    rect: null,
    type: 'slider',
    dftype: 'shlow',
    child: false
  };
  return initSlider;
} //End of addSlider
//TODO : save and retrieve the slider values.


function CreateNewSlider(reactContext, FromExisting = null) {
  var SLIDER_END_POSITION = reactContext.state.SLIDER_END_POSITION;
  var SLIDER_START_POSITION = reactContext.state.SLIDER_START_POSITION;
  var newSlider;

  if (FromExisting != null) {
    newSlider = FromExisting;
  } else {
    newSlider = addSlider(uuidv4('S'), 0, 100, 1.0); //Fix dict creation

    var guid = newSlider.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
    newSlider.Name = 'Numeric';
    newSlider.value = 50.0;
    newSlider.anchorValue = (SLIDER_END_POSITION - SLIDER_START_POSITION) / 2;
  }

  newSlider.fill = '#bdc4c8';
  var titleMarginLeft = 5;
  newSlider.height = 20;
  newSlider.width = 250;
  newSlider.dftype = 'shlow';
  var allContents = d3$7.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'slider').attr('id', newSlider.GUID);
  var genX;
  var genY;
  var node = cont.append('g').attr('class', 'SliderGroup ' + newSlider.selection + ' ' + newSlider.view + ' ' + newSlider.GUID).attr('id', 'comp-' + newSlider.GUID).attr('transform', () => {
    if (FromExisting == null) {
      genX = Math.random() * 500 + 200;
      genY = Math.random() * 500 + 200;
      newSlider.X = genX;
      newSlider.Y = genY;
      return 'translate(' + genX + ', ' + genY + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  }).data([{
    x: FromExisting ? FromExisting.X : genX,
    y: FromExisting ? FromExisting.Y : genY
  }]).on('mousedown', () => {
    reactContext.setState({
      rectType: 'slider'
    });
  });
  var OutputGroup = node.append('g');
  OutputGroup.append('circle').attr('cx', newSlider.width).attr('cy', '10').attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'outputCir' + newSlider.GUID).attr('class', 'outputCir ' + newSlider.GUID + ' 0').on('mousemove', function () {
    reactContext.setState({
      targetcircleIN: true
    });
  }).on('mouseout', function () {
    reactContext.setState({
      targetcircleIN: false
    });
  });
  var rect = node.append('rect').attr('class', 'CompSBody ' + newSlider.GUID).attr('id', newSlider.GUID).attr('rx', '3').attr('ry', '3').attr('stroke-width', '2').attr('stroke', '#3a4c69').attr('width', newSlider.width).attr('height', newSlider.height).attr('fill', '#dddddd').on('mousemove', function () {
    var current_slider = { ...reactContext.state.selectedSliderComponent
    };
    current_slider.rect = this;
    reactContext.setState({
      selectedSliderComponent: current_slider
    });
    d3$7.select(current_slider.rect).attr('cursor', 'pointer');
  }).on('mouseout', function () {
    newSlider.rect = this;
  }).on('dblclick', () => {}).on('mousedown', () => {
    reactContext.setState({
      rectType: 'slider'
    });
  });
  var ValueTextGroup = node.append('g').attr('transform', () => {
    return 'translate(-80, 0)';
  });
  ValueTextGroup.append('rect').attr('cx', '0').attr('cy', '0').attr('rx', '3').attr('ry', '3').attr('fill', 'black').attr('width', '80').attr('height', '20').attr('opacity', '0.5');
  ValueTextGroup.append('text').attr('id', 'sliderValueText_' + newSlider.GUID).attr('class', 'sliderValueText ' + newSlider.GUID).attr('transform', 'translate(2, 14)').attr('fill', 'white').text(newSlider.value.toString());
  var Titlegroup = node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  });
  Titlegroup.append('text').attr('class', 'sliderTitle slider_title' + newSlider.GUID).text(newSlider.Name).attr('fill', 'black').attr('transform', 'translate(' + titleMarginLeft / 2.0 + ', 0)');
  var SlidingGroup = node.append('g').attr('transform', 'translate(60, 0)');
  SlidingGroup.append('rect').attr('height', '3').attr('width', '185').attr('rx', '2').attr('ry', '2').attr('transform', 'translate(0, 8)').attr('stroke', '#677184');
  SlidingGroup.append('line').attr('x1', '2').attr('y1', '11').attr('x2', '184').attr('y2', '11').attr('stroke', 'gray').attr('stroke-width', '1');

  function anchorUpdate() {
    slidingAnchor.attr('transform', d => `translate(${d.x},3)`);
  }

  var anchorDragHandler = d3$7.drag().on('start', (event, d) => rect.attr('stroke', 'red')).on('drag', (event, d) => {
    var selectedSliderComponent = reactContext.state.selectedSliderComponent;
    var sliderRectId = reactContext.state.sliderRectId;
    var slider_anchor_value;
    var slider_value;
    var the_slider_slope = (selectedSliderComponent.max - selectedSliderComponent.min) / (SLIDER_END_POSITION - SLIDER_START_POSITION);
    var y_intersection = selectedSliderComponent.min - the_slider_slope * SLIDER_START_POSITION;

    if (event.x <= SLIDER_START_POSITION) {
      slider_anchor_value = 0;
      slider_value = selectedSliderComponent.min;
    } else if (event.x >= SLIDER_END_POSITION) {
      slider_anchor_value = SLIDER_END_POSITION - SLIDER_START_POSITION;
      slider_value = selectedSliderComponent.max;
    } else {
      slider_anchor_value = event.x - SLIDER_START_POSITION;
      slider_value = event.x * the_slider_slope + y_intersection;
    }

    selectedSliderComponent.anchorValue = slider_anchor_value;
    d.x = slider_anchor_value;
    d3$7.select('#sliderValueText_' + sliderRectId.replace('SliderAnchor_', '')).text(slider_value.toFixed(6));
    selectedSliderComponent.value = slider_value;
    reactContext.setState({
      selectedSliderComponent: selectedSliderComponent
    });
    redrawDependents(selectedSliderComponent.GUID);
  }).on('end', (event, d) => rect.attr('stroke', '#3a4c69')).on('start.update drag.update end.update', anchorUpdate);
  var slidingAnchor = SlidingGroup.append('rect').attr('id', 'SliderAnchor_' + newSlider.GUID).attr('width', '10').attr('height', '15').attr('rx', '5').attr('ry', '5').attr('fill', '#3a4d69').style('cursor', 'pointer').attr('transform', 'translate(' + newSlider.anchorValue.toString() + ', 3)').data([{
    x: newSlider.anchorValue,
    y: 3
  }]).on('mousemove', function (event) {
    d3$7.select(event.currentTarget).attr('fill', 'url(#gradientlsider)').attr('cursor', 'pointer').attr('stroke', 'black');
  }).on('mouseleave', function (event) {
    d3$7.select(event.currentTarget).attr('fill', '#3a4d69').attr('stroke', 'none');
  }).on('mousedown', function () {
    reactContext.setState({
      sliderRectId: this.id,
      // SliderAnchorclicked: true,
      selectedSliderComponent: newSlider
    });
  }).on('mouseup', function () {
    reactContext.setState({
      // SliderAnchorclicked: false,
      selectedSliderComponent: null
    });
  }).call(anchorDragHandler); //Make a copy of the current states

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newSlider.GUID] = new Array(1);
  current_comp_in[newSlider.GUID] = new Array(1);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });

  if (FromExisting == null) {
    //Make a copy of the array
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a slider' + newSlider);
    current_all_comp.push(newSlider);
    reactContext.setState({
      allComp: current_all_comp
    });
  } //Moving the slider body


  d3$7.selectAll('g.SliderGroup').on('mousedown', function (d, i) {
    reactContext.setState({
      rectType: 'slider'
    });
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newSlider.GUID] = {
    x0: newSlider.X,
    y0: newSlider.Y,
    x1: newSlider.X + newSlider.width,
    y1: newSlider.Y + newSlider.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
}
/**
 * Double click the slider => the property bar appears
 * Handles the event when the Save button on the property bar is clicked
 * @param {String} compKey The ID of the clicked components
 */


function submitSliderEdit(compKey) {
  var slider_component = selectComp(compKey);
  const SLIDER_START_POSITION = 60;
  const SLIDER_END_POSITION = 238;
  slider_component.min = parseFloat($__default['default']('input#new_slider_min_value').val());
  slider_component.max = parseFloat($__default['default']('input#new_slider_max_value').val());
  slider_component.value = parseFloat($__default['default']('input#new_slider_current_value').val());
  var slider_anchor_slope = (SLIDER_END_POSITION - SLIDER_START_POSITION) / (slider_component.max - slider_component.min);
  var slider_anchor_y_intersection = SLIDER_END_POSITION - SLIDER_START_POSITION - slider_anchor_slope * slider_component.max;
  var slider_anchor_currrent_position = slider_anchor_slope * slider_component.value + slider_anchor_y_intersection;
  d3$7.select('rect#SliderAnchor_' + slider_component.GUID).attr('transform', function () {
    return 'translate(' + slider_anchor_currrent_position.toString() + ',3)';
  });
  d3$7.select('#sliderValueText_' + slider_component.GUID.replace('SliderAnchor_', '')).text(slider_component.value.toFixed(6));
  redrawDependents(slider_component.GUID);
  $__default['default']('div#propertiesBarContents').html('');
}
/**
 * Double click the slider => the property bar appears
 * Handles the event when the Cancel button on the property bar is clicked
 */


function cancelSliderEdit() {
  $__default['default']('div#propertiesBarContents').html('');
}

/*
───────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─████████████████───██████████─██████──────────██████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───██░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─
─██░░██████████─██████░░██████─██░░████████░░██───████░░████─██░░░░░░░░░░██──██░░██─██░░██████████─
─██░░██─────────────██░░██─────██░░██────██░░██─────██░░██───██░░██████░░██──██░░██─██░░██─────────
─██░░██████████─────██░░██─────██░░████████░░██─────██░░██───██░░██──██░░██──██░░██─██░░██─────────
─██░░░░░░░░░░██─────██░░██─────██░░░░░░░░░░░░██─────██░░██───██░░██──██░░██──██░░██─██░░██──██████─
─██████████░░██─────██░░██─────██░░██████░░████─────██░░██───██░░██──██░░██──██░░██─██░░██──██░░██─
─────────██░░██─────██░░██─────██░░██──██░░██───────██░░██───██░░██──██░░██████░░██─██░░██──██░░██─
─██████████░░██─────██░░██─────██░░██──██░░██████─████░░████─██░░██──██░░░░░░░░░░██─██░░██████░░██─
─██░░░░░░░░░░██─────██░░██─────██░░██──██░░░░░░██─██░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██─
─██████████████─────██████─────██████──██████████─██████████─██████──────────██████─██████████████─
*/

var d3$6 = require('d3'); //TODO : check this for the text overflow : https://bl.ocks.org/mbostock/1424037


function CreateNewPanel(reactContext, FromExisting = null) {
  var COMPONENT_RADIUS = reactContext.state.COMPONENT_RADIUS;
  var ANCHOR_WIDTH = reactContext.state.ANCHOR_WIDTH;
  var newcomp;

  if (FromExisting == null) {
    newcomp = addcomponent(uuidv4('C'), 1, 1);
    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
    newcomp.Name = 'Panel';
    newcomp.width = 300;
  } else {
    newcomp = FromExisting;
    newcomp.value = newcomp.outputs[0].value;
  }

  newcomp.fill = 'white'; //"#fbedcc";

  newcomp.type = 'string';
  newcomp.dftype = 'shlow';
  newcomp.inputs[0].value = newcomp.value;
  var allContents = d3$6.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var genX;
  var genY;
  var node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      genX = Math.random() * 500 + 200;
      genY = Math.random() * 500 + 200;
      newcomp.X = genX;
      newcomp.Y = genY;
      return 'translate(' + genX + ', ' + genY + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  }).data([{
    x: FromExisting ? FromExisting.X : genX,
    y: FromExisting ? FromExisting.Y : genY
  }]);
  node.append('rect').attr('class', 'CompPBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('y', '-15').attr('width', () => {
    return 10 + newcomp.Name.length * 6;
  }).attr('height', newcomp.height + 10).attr('fill', '#525252').attr('fill-opacity', '1.0').on('mouseover', function (event) {
    d3$6.select(event.currentTarget).attr('cursor', 'pointer');
  });
  var InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', newcomp.height / 2).attr('fill', 'gray') //newcomp.fill)
    .attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.inputs[index].circle = this;

      if (FromExisting == null) {
        newcomp.inputs[index].type = 'text';
      }

      return 'input';
    }).on('mousemove', function () {
      reactContext.setState({
        targetcircleIN: true
      });
    }).on('mouseout', function () {
      reactContext.setState({
        targetcircleIN: false
      });
    }).lower();
  }

  var OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.outputs[index].circle = this;
      newcomp.outputs[index].type = 'output';
      return 'output';
    }).on('mousemove', function () {
      reactContext.setState({
        targetcircleIN: true
      });
    }).on('mouseout', function () {
      reactContext.setState({
        targetcircleIN: false
      });
    }).lower();
  }

  node.append('rect').attr('class', 'CompPBody statusRect ' + newcomp.GUID).attr('id', 'statusRect' + newcomp.GUID).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('x', '50').attr('y', newcomp.height - 20).attr('width', newcomp.width - 50).attr('height', 35).attr('fill', '#525252').attr('fill-opacity', '1.0');
  node.append('foreignObject').attr('id', 'panel_status_' + newcomp.GUID).attr('class', 'panel_status ' + newcomp.GUID).html('Type : ' + newcomp.inputs[0].type).attr('x', '55').attr('y', newcomp.height + 2).attr('width', newcomp.width - 50).attr('height', 15).attr('fill', 'white');
  node.append('foreignObject').attr('id', 'panel_edit_mode' + newcomp.GUID).attr('class', 'panel_edit_mode ' + newcomp.GUID).html(() => {
    return '<h5 id="changeEditMoveMode_' + newcomp.GUID + '" style="color:white; margin-top:1px" ">Edit</h5>';
  }).attr('x', newcomp.width - 30).attr('y', newcomp.height + 2).attr('width', 30).attr('height', 15).attr('fill', 'white').on('click', () => edit_move_mode(newcomp.GUID)).attr('style', 'cursor: pointer;');
  var Dummyrect = node.append('rect').attr('class', 'CompPBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS) //.attr("filter", "url(#f2")
  .attr('stroke-width', '1').attr('stroke', 'black').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill);
  var Titlegroup = node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  });
  Titlegroup.append('text').attr('class', 'nodetitle node_title' + newcomp.GUID).attr('id', 'nodeTitle' + newcomp.GUID).text(newcomp.Name).attr('fill', 'white').attr('x', 5).attr('y', -18);
  node.append('foreignObject').attr('id', 'textbody_' + newcomp.GUID).attr('class', 'textbody ' + newcomp.GUID).attr('height', newcomp.height - ANCHOR_WIDTH - 5).html(function () {
    if (newcomp.inputs[0].type === 'html' || newcomp.inputs[0].type === 'input') {
      return newcomp.inputs[0].value;
    } else if (newcomp.inputs[0].type === 'text') {
      return '<pre>' + newcomp.inputs[0].value + '</pre>';
    }
  }).attr('transform', 'translate(5, 5)').attr('width', newcomp.width - 4 - ANCHOR_WIDTH);
  var data2;

  if (newcomp.inputs[0].type === 'json') {
    $__default['default']('foreignObject#textbody_' + newcomp.GUID).html('<div id="jsonTreeViewer' + newcomp.GUID + '"></div>');
    jsonView.format(newcomp.inputs[0].value, 'div#jsonTreeViewer' + newcomp.GUID);
  } else if (newcomp.inputs[0].type === 'plot') {
    data2 = JSON.parse(newcomp.inputs[0].value);
    drawPlotComponent(data2, newcomp);
  } else if (newcomp.inputs[0].type === 'spatial') {
    data2 = JSON.parse(newcomp.inputs[0].value);
    var unparseData = newcomp.inputs[0].value;
    visualizeSpatialComponent(data2, unparseData, newcomp);
  } //White Text Box


  node.append('rect').attr('class', 'CompPBody ' + newcomp.GUID + ' a').attr('id', 'overlaySelector' + newcomp.GUID).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('y', '0').attr('width', newcomp.width - 5).attr('height', newcomp.height - 5).attr('fill', 'white') //"#ffeec7")
  .attr('fill-opacity', '0.15').on('mousemove', function (event) {
    d3$6.select(event.currentTarget).attr('cursor', 'pointer');
  });
  var resize = d3$6.drag().on('start', (event, d) => Dummyrect.attr('stroke', 'red')).on('end', (event, d) => Dummyrect.attr('stroke', '#3a4c69')).on('drag', function (event, d) {
    var anchorMouseYpos = reactContext.state.anchorMouseYpos;
    var anchorMouseXpos = reactContext.state.anchorMouseXpos;
    var StringAnchorId = reactContext.state.StringAnchorId;
    var newHeight = event.y - anchorMouseYpos;

    if (newHeight <= 50) {
      newHeight = 52;
    }

    var newWidth = event.x - anchorMouseXpos;

    if (newWidth <= 300) {
      newWidth = 301;
    }

    d.x = newWidth;
    d.y = newHeight;
    d.width = newWidth;
    d.height = newHeight;
    var thisComp = selectComp(StringAnchorId);
    thisComp.height = newHeight;
    thisComp.width = newWidth;
    d3$6.select('rect#dummyRect_' + StringAnchorId).attr('height', newHeight).attr('width', newWidth);
    d3$6.select('rect#' + StringAnchorId).attr('height', newHeight);
    d3$6.select('rect.CompPBody.' + StringAnchorId + '.a').attr('width', newWidth);
    d3$6.select('rect#statusRect' + StringAnchorId).attr('y', newHeight - 20).attr('width', newWidth - 50);
    d3$6.select('foreignObject#panel_status_' + StringAnchorId).attr('y', newHeight + 2).attr('width', newWidth - 50);
    d3$6.select('rect#overlaySelector' + StringAnchorId).attr('height', newHeight - 5);
    d3$6.select('rect.xyAnchor.' + StringAnchorId).attr('x', thisComp.width - ANCHOR_WIDTH).attr('y', thisComp.height - ANCHOR_WIDTH);
    d3$6.select('foreignObject#textbody_' + StringAnchorId).attr('height', thisComp.height - ANCHOR_WIDTH - 5).attr('width', thisComp.width - 4 - ANCHOR_WIDTH);
    d3$6.select('foreignObject#panel_edit_mode' + StringAnchorId).attr('y', newHeight + 2).attr('x', newWidth - 30);
    d3$6.select('g#logCirGroup_' + StringAnchorId).attr('transform', () => {
      var x = thisComp.width;
      var y = thisComp.height;
      return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
    });
    d3$6.select('circle#outputCir' + StringAnchorId + '_0').attr('cy', thisComp.height / 2).attr('cx', thisComp.width);
    d3$6.select('circle#inputCir' + StringAnchorId + '_0').attr('cy', thisComp.height / 2);
  });
  node.append('rect').attr('class', 'xyAnchor ' + newcomp.GUID).data([{
    x: newcomp.width - ANCHOR_WIDTH,
    y: newcomp.height - ANCHOR_WIDTH,
    width: ANCHOR_WIDTH,
    height: ANCHOR_WIDTH
  }]).attr('width', ANCHOR_WIDTH).attr('height', ANCHOR_WIDTH).attr('x', newcomp.width - ANCHOR_WIDTH).attr('y', newcomp.height - ANCHOR_WIDTH).attr('fill-opacity', 0.01).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).on('mousedown', event => {
    reactContext.setState({
      anchorMouseXpos: d3$6.pointer(event)[0] - newcomp.width,
      anchorMouseYpos: d3$6.pointer(event)[1] - newcomp.height,
      StringAnchorId: newcomp.GUID
    });
  }).call(resize);

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a panel' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
} //Need to save the new information?
//Plot errors. in operator not recognized -> not json


function submitPanelEdit(compKey) {
  var StringComp = selectComp(compKey);
  var textVal = $__default['default']('textarea.textarea.stringProperties').val();
  StringComp.inputs[0].type = $__default['default']("input[name='type']:checked").val();
  $__default['default']('foreignObject#panel_status_' + StringComp.GUID).text('Type : ' + StringComp.inputs[0].type);

  if (StringComp.inputs[0].type === 'json') {
    $__default['default']('foreignObject#textbody_' + StringComp.GUID).html('<div id="jsonTreeViewer' + StringComp.GUID + '"></div>');
    jsonView.format(JSON.stringify(StringComp.inputs[0].value), 'div#jsonTreeViewer' + StringComp.GUID);
  } else if (StringComp.inputs[0].type === 'html') {
    d3$6.select('foreignObject#textbody_' + compKey).html(textVal).attr('fill', 'black');
  } else if (StringComp.inputs[0].type === 'plot') {
    var data = JSON.parse(JSON.stringify(textVal));
    drawPlotComponent(data, StringComp);
  } else {
    d3$6.select('foreignObject#textbody_' + compKey).text(textVal).attr('fill', 'black');
  }

  StringComp.outputs[0].value = textVal;
  StringComp.inputs[0].value = textVal;
  StringComp.value = textVal;
  StringComp.Name = $__default['default']('input.stringPnanel.Name').val();
  redrawDependents(compKey);
  $__default['default']('div#propertiesBarContents').html('');
}

function cancelPanelEdit() {
  $__default['default']('div#propertiesBarContents').html('');
}

function edit_move_mode(compId, mode) {
  var disp = $__default['default']('rect#overlaySelector' + compId).attr('style');

  if (disp === 'display: block;') {
    d3$6.select('rect#overlaySelector' + compId).style('display', 'none');
    d3$6.select('h5#changeEditMoveMode_' + compId).text('Edit Mode');
  } else {
    d3$6.select('rect#overlaySelector' + compId).style('display', 'block');
    d3$6.select('h5#changeEditMoveMode_' + compId).text('Drag Mode');
  }
}

/*
───────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████████─██████─────────██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─
─██████░░██████─██░░██████░░██─██░░██████████─██░░██████████─██░░██─────────██░░██████████─
─────██░░██─────██░░██──██░░██─██░░██─────────██░░██─────────██░░██─────────██░░██─────────
─────██░░██─────██░░██──██░░██─██░░██─────────██░░██─────────██░░██─────────██░░██████████─
─────██░░██─────██░░██──██░░██─██░░██──██████─██░░██──██████─██░░██─────────██░░░░░░░░░░██─
─────██░░██─────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██████████─
─────██░░██─────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██─────────
─────██░░██─────██░░██████░░██─██░░██████░░██─██░░██████░░██─██░░██████████─██░░██████████─
─────██░░██─────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─────██████─────██████████████─██████████████─██████████████─██████████████─██████████████─
───────────────────────────────────────────────────────────────────────────────────────────
*/

var d3$5 = require('d3');

function CreateNewToggle(reactContext, FromExisting = null) {
  var newcomp;

  if (FromExisting == null) {
    newcomp = addcomponent(uuidv4('C'), 0, 1);
    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
  } else {
    newcomp = FromExisting;
  }

  newcomp.fill = '#2c3e50';
  newcomp.Name = 'False';
  var padding = 20;
  var titleMargin = 30;
  newcomp.height = 20;
  newcomp.type = 'toggle';
  newcomp.dftype = 'shlow'; // TODO : get the longest text in the component. and set the width based on this.

  newcomp.width = 80; //newcomp.Name.length * one_character_width + titleMarginLeft;

  var allContents = d3$5.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var genX;
  var genY;
  var node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      genX = Math.random() * 500 + 200;
      genY = Math.random() * 500 + 200;
      newcomp.X = genX;
      newcomp.Y = genY;
      return 'translate(' + genX + ', ' + genY + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  }).data([{
    x: FromExisting ? FromExisting.X : genX,
    y: FromExisting ? FromExisting.Y : genY
  }]);
  var InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.inputs[index].circle = reactContext.state.fromCircle;
      newcomp.inputs[index].circle.element = this.id;
      newcomp.inputs[index].circle.CX = 0;
      newcomp.inputs[index].circle.CY = index * padding + titleMargin;
      newcomp.inputs[index].type = 'input';
      return 'input';
    });
  }

  var OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.outputs[index].circle = this;
      newcomp.outputs[index].type = 'output';
      return 'output';
    }).lower();
  }

  node.append('rect').attr('class', 'CompTBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('stroke-width', '1').attr('stroke', 'black').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill);
  var cirGroup = node.append('g').attr('transform', () => {
    var x = newcomp.width;
    var y = newcomp.height;
    return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
  });
  cirGroup.append('text').attr('id', 'nodeLog' + newcomp.GUID).attr('class', 'nodeLog ' + newcomp.GUID).attr('transform', 'translate(10, 10)').text(newcomp.log.logText).attr('fill', 'black').style('display', 'none');
  var Titlegroup = node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  });
  Titlegroup.append('text').attr('class', 'nodetitle node_title' + newcomp.GUID).text(newcomp.Name).attr('fill', '#ecf0f1').attr('transform', 'translate(' + (newcomp.width / 2.0 - newcomp.Name.length * 4.0).toString() + ', 0)');
  node.append('rect').attr('class', 'CompTBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill).attr('fill-opacity', '0.01') // .attr("filter", "url('#svgshadow')")
  .on('mousemove', function (event) {
    // newcomp.rect = this;
    d3$5.select(event.currentTarget) // .attr("fill", "#303952")
    .attr('cursor', 'pointer');
  }).on('mouseout', function (event) {
    // newcomp.rect = this;
    d3$5.select(event.currentTarget).attr('fill', newcomp.fill);
  });
  newcomp.value = newcomp.Name;

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a toggle' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
}

/*
──────────────────────────────────────────────────────────────────────────────────────────
─────────────██████████████─██████████─██████─────────██████████████──────────────────────
─────────────██░░░░░░░░░░██─██░░░░░░██─██░░██─────────██░░░░░░░░░░██──────────────────────
─────────────██░░██████████─████░░████─██░░██─────────██░░██████████──────────────────────
─────────────██░░██───────────██░░██───██░░██─────────██░░██──────────────────────────────
─────────────██░░██████████───██░░██───██░░██─────────██░░██████████──────────────────────
─────────────██░░░░░░░░░░██───██░░██───██░░██─────────██░░░░░░░░░░██──────────────────────
─────────────██░░██████████───██░░██───██░░██─────────██░░██████████──────────────────────
─────────────██░░██───────────██░░██───██░░██─────────██░░██──────────────────────────────
─────────────██░░██─────────████░░████─██░░██████████─██░░██████████──────────────────────
─────────────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██──────────────────────
─────────────██████─────────██████████─██████████████─██████████████──────────────────────
──────────────────────────────────────────────────────────────────────────────────────────
───────────────────────────────────────────────────────────────────────────────────────────
─██████──██████─██████████████─██████─────────██████████████─██████████████─████████████───
─██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░████─
─██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██████░░██─██░░██████░░██─██░░████░░░░██─
─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─
─██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██──██░░██─██░░██████░░██─██░░██──██░░██─
─██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██─
─██░░██──██░░██─██░░██████████─██░░██─────────██░░██──██░░██─██░░██████░░██─██░░██──██░░██─
─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─
─██░░██████░░██─██░░██─────────██░░██████████─██░░██████░░██─██░░██──██░░██─██░░████░░░░██─
─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░████─
─██████████████─██████─────────██████████████─██████████████─██████──██████─████████████───
───────────────────────────────────────────────────────────────────────────────────────────

*/

var d3$4 = require('d3');

function CreateNewFileUpload(reactContext, FromExisting = null, kwargs = null) {
  var newcomp;

  if (FromExisting == null) {
    newcomp = addcomponent(uuidv4('C'), 0, 1);
    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
  } else {
    newcomp = FromExisting;
  }

  newcomp.fill = '#5e6b7a';
  newcomp.Name = 'False';
  var padding = 20;
  var titleMargin = 30;
  newcomp.height = 25;
  newcomp.type = 'fileUpload';
  newcomp.dftype = 'shlow'; // TODO : get the longest text in the component. and set the width based on this.

  newcomp.width = 300;
  var allContents = d3$4.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      var mousex = reactContext.state.mousex;
      var mousey = reactContext.state.mousey;
      newcomp.X = mousex + Math.random() * 500;
      newcomp.Y = mousey + Math.random() * 500;
      return 'translate(' + newcomp.X + ', ' + newcomp.Y + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  }).data([{
    x: FromExisting ? FromExisting.X : newcomp.X,
    y: FromExisting ? FromExisting.Y : newcomp.Y
  }]);
  var InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.inputs[index].circle = reactContext.state.fromCircle;
      newcomp.inputs[index].circle.element = this.id;
      newcomp.inputs[index].circle.CX = 0;
      newcomp.inputs[index].circle.CY = index * padding + titleMargin;
      newcomp.inputs[index].type = 'input';
      return 'input';
    });
  }

  var OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', newcomp.height / 2).attr('fill', 'gray').attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.outputs[index].circle = this;
      newcomp.outputs[index].type = 'output';
      return 'output';
    }).lower();
  }

  node.append('rect').attr('class', 'CompFBody statusRect ' + newcomp.GUID).attr('id', 'statusRect' + newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('x', '50').attr('y', newcomp.height - 5).attr('width', newcomp.width - 50).attr('height', 20).attr('fill', '#242424').attr('fill-opacity', '1.0');
  node.append('foreignObject').attr('id', 'fileUpload_status_' + newcomp.GUID).attr('class', 'fileUpload_status ' + newcomp.GUID).html(() => {
    if (newcomp.outputs[0].value == null || newcomp.outputs[0].value === undefined) {
      return 'File Size : None';
    } else {
      return 'File Size : ' + (newcomp.outputs[0].Description.size / (1024 * 1024)).toString() + " MB <a class='open_uploadedFile_link' href='" + newcomp.outputs[0].Description.url + "' target='blank'>open</a>";
    }
  }).attr('x', '55').attr('y', newcomp.height + 2).attr('width', newcomp.width - 50).attr('height', 15).attr('fill', 'white');
  node.append('rect').attr('class', 'CompFBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('stroke-width', '1').attr('stroke', 'black').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill);
  var cirGroup = node.append('g').attr('transform', () => {
    var x = newcomp.width;
    var y = newcomp.height;
    return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
  });
  cirGroup.append('text').attr('id', 'nodeLog' + newcomp.GUID).attr('class', 'nodeLog ' + newcomp.GUID).attr('transform', 'translate(10, 10)').text(newcomp.log.logText).attr('fill', 'black').style('display', 'none');
  node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  });
  node.append('rect').attr('width', newcomp.width - 2).attr('height', 10).attr('x', 1).attr('y', 1).attr('rx', 2).attr('ry', 2).attr('fill', 'url(#gradient2)').attr('fill-opacity', 0.4);
  node.append('foreignObject').attr('id', 'foreignObject_fileUpload' + newcomp.GUID).attr('class', 'foreignObject_fileUpload').attr('width', newcomp.width).attr('height', newcomp.height).attr('y', '-1.1px').html(() => {
    if (newcomp.outputs[0].value == null || newcomp.outputs[0].value === undefined) {
      var form = `
                    <form method="post" enctype="multipart/form-data" id="form_` + newcomp.GUID + `">
                    <input id="fileUploadFormToTheCloud" class="` + newcomp.GUID + `" type="file" name="myFile">
                    </form>
                    `;
      return form;
    } else {
      return `
                        <div id="TheContainedFile">` + newcomp.outputs[0].Description.Name + `</div>
                        <div id="TheContainedFile">Size :` + (newcomp.outputs[0].Description.size / (1024 * 1024)).toFixed(4).toString() + ` MB</div>
                    `;
    }
  });
  node.append('rect').attr('class', 'CompFBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('x', 90).attr('width', newcomp.width - 90).attr('height', newcomp.height).attr('fill', newcomp.fill).attr('fill-opacity', '0.01').on('mousemove', function (event) {
    d3$4.select(event.currentTarget).attr('cursor', 'pointer');
  }).on('mouseout', function (event) {
    d3$4.select(event.currentTarget).attr('fill', newcomp.fill);
  });
  newcomp.value = newcomp.Name;

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a fileUpload' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
  $__default['default']('input#fileUploadFormToTheCloud').on('change', function (e) {
    var selectedFile = e.target.files[0];
    var thisFormId = $__default['default'](this).attr('class');
    var fileName = selectedFile.name;
    var fileSize = selectedFile.size;
    var theCurrentComp = selectComp(thisFormId);
    theCurrentComp.outputs[0].Name = fileName;
    theCurrentComp.outputs[0].Description = {
      Name: fileName,
      size: fileSize
    };
    theCurrentComp.outputs[0].value = selectedFile;
    console.log(theCurrentComp);
    d3$4.select('#fileUpload_status_' + thisFormId).html('File Size : ' + (selectedFile.size / (1024 * 1024)).toString() + " MB");
    d3$4.select('#foreignObject_fileUpload' + thisFormId).html(() => {
      return `
                <div id="TheContainedFile">` + fileName + `</div>
                <div id="TheContainedFile">Size :` + (selectedFile.size / (1024 * 1024)).toFixed(4).toString() + ` MB</div>
                `;
    });
    redrawDependents(thisFormId);
  });
}

/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████─██████████████─██████──────────██████────██████─────────██████████─██████████████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░██████░░██─██████░░██████─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██────██░░██─────────████░░████─██░░██████████─██████░░██████─
─██░░██──██░░██─██░░██──██░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██████░░██──██░░██────██░░██───────────██░░██───██░░██─────────────██░░██─────
─██░░██──██░░██─██░░██████░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░██████████─────██░░██─────
─██░░██──██░░██─██░░░░░░░░░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░░░░░░░░░██─────██░░██─────
─██░░██──██░░██─██░░██████████─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██████████░░██─────██░░██─────
─██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██████░░██────██░░██───────────██░░██───────────██░░██─────██░░██─────
─██░░██████░░██─██░░██─────────────██░░██─────████░░████─██░░██████░░██─██░░██──██░░░░░░░░░░██────██░░██████████─████░░████─██████████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██─────────────██░░██─────██░░░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██────██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████─────────────██████─────██████████─██████████████─██████──────────██████────██████████████─██████████─██████████████─────██████─────
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

var d3$3 = require('d3');

function CreateNewListView(reactContext, FromExisting = null, optionlist_predefined_items = null) {
  var newcomp;

  if (FromExisting == null) {
    newcomp = addcomponent(uuidv4('C'), 1, 1);
    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
    newcomp.Name = 'Select item';
    newcomp.value = [['dummy_Option1', 0], [1.022235, 1], [2235, 0], ['shouldBeSelected', 1], ['dummy_Option1', 0], [1.022235, 1], [2235, 0], ['shouldBeSelected', 1], ['dummy_Option1', 0], [1.022235, 1], [2235, 0], ['shouldBeSelected', 1]];

    if (optionlist_predefined_items != null) {
      newcomp.optionListValues = JSON.parse(optionlist_predefined_items);
    }
  } else {
    newcomp = FromExisting;
  }

  newcomp.fill = 'url(#grad1ient)';
  var padding = 20;
  var titleMargin = 30;
  newcomp.height = 200;
  newcomp.type = 'listView';
  newcomp.dftype = 'shlow';
  newcomp.width = 200; // TODO : get the longest text in the component. and set the width based on this.

  var allContents = d3$3.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var genX;
  var genY;
  var node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      genX = Math.random() * 500 + 200;
      genY = Math.random() * 500 + 200;
      newcomp.X = genX;
      newcomp.Y = genY;
      return 'translate(' + genX + ', ' + genY + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  }).data([{
    x: FromExisting ? FromExisting.X : genX,
    y: FromExisting ? FromExisting.Y : genY
  }]);
  var InputGroup = node.append('g');

  for (let index = 0; index < newcomp.inputs.length; index++) {
    InputGroup.append('circle').lower().attr('cx', '0').attr('cy', newcomp.height / 2).attr('fill', 'gray') //newcomp.fill)
    .attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.inputs[index].circle = addCircle();
      newcomp.inputs[index].circle.element = this.id;
      newcomp.inputs[index].circle.CX = 0;
      newcomp.inputs[index].circle.CY = index * padding + titleMargin;
      newcomp.inputs[index].type = 'input';
      return 'input';
    });
  }

  var OutputGroup = node.append('g');

  for (let index = 0; index < newcomp.outputs.length; index++) {
    OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', newcomp.height / 2).attr('fill', 'gray') //newcomp.fill)
    .attr('r', '5').attr('stroke', 'black').attr('stroke-width', '2').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir ' + newcomp.GUID + ' ' + index).attr('type', function () {
      newcomp.outputs[index].circle = this;
      newcomp.outputs[index].type = 'output';
      return 'output';
    }).lower();
  }

  node.append('rect').attr('class', 'CompLBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', '3').attr('ry', '3') //.attr("filter", "url(#f2")
  .attr('stroke-width', '1').attr('stroke', 'black').attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', '#CECECE');
  node.append('text').attr('x', 5).attr('y', 15).text('listItems').attr('fill', 'black').style('font-family', 'Ubuntu Mono'); //listbox items

  node.append('foreignObject').attr('class', 'listView CompLBody' + newcomp.GUID).attr('id', 'listView-' + newcomp.GUID).attr('y', 20).attr('x', 1).attr('width', newcomp.width - 2).attr('height', newcomp.height - 20).html(() => {
    var selectedOptions = [];
    var ListItemsvalueReturn = `<select id="listviewSelect" class="listView ` + newcomp.GUID + `" size="5"  multiple>`;
    newcomp.value.forEach(option => {
      if (option[1] === 0) {
        ListItemsvalueReturn += `<option id="someSelection" class="listViewOption ` + newcomp.GUID + `" value="` + option[0] + `">` + option[0] + `</option>`;
      } else {
        ListItemsvalueReturn += `<option id="someSelection" class="listViewOption ` + newcomp.GUID + `" value="` + option[0] + `" selected>` + option[0] + `</option>`;
        selectedOptions.push(option[0]);
      }
    });
    newcomp.outputs[0].value = JSON.stringify(selectedOptions);
    ListItemsvalueReturn += `</select>`;
    return ListItemsvalueReturn;
  });
  node.append('rect').attr('class', 'CompLBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', '3').attr('ry', '3').attr('width', newcomp.width).attr('height', 20).attr('fill', newcomp.fill).attr('fill-opacity', '0.01').on('mousemove', function (event) {
    d3$3.select(event.currentTarget).attr('cursor', 'pointer');
  }).on('mouseout', function (event) {
    d3$3.select(event.currentTarget).attr('fill', newcomp.fill);
  });
  node.append('g').attr('id', 'optionListOption-' + newcomp.GUID);

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a list view' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
}

var d3$2 = require('d3');

var addInputCirclesFunc;
var addOutputCirclesFunc;
var statusBar;
var Dummyrect;
var cirGroup;
var resize1;
var rect;
var playrect2;
var node;

function CreateNewCloud(reactContext, FromExisting = null, type = "cloud", kwargs = {
  shortName: "cloud",
  dfType: "dp"
}, inputList = [], outputList = [], color = '#0031E7') {
  var IDLE_COLOR = reactContext.state.IDLE_COLOR;
  var COMPONENT_RADIUS = reactContext.state.COMPONENT_RADIUS;
  var one_character_width = 8;
  var padding = 20;
  var titleMargin = 30;
  var titleMarginLeft = 30;
  var newcomp;

  if (FromExisting != null) {
    newcomp = FromExisting;
  } else {
    var longestInput = '';

    for (let index = 0; index < inputList.length; index++) {
      const curr = inputList[index].name;

      if (curr.length > longestInput.length) {
        longestInput = curr;
      }
    }

    var longestOutput = outputList.reduce(function (a, b) {
      return a.length > b.length ? a : b;
    }, '');
    var ThisComponentName = type;
    let n_inputs = inputList.length;
    let n_outputs = outputList.length;
    newcomp = addcomponent(uuidv4('C'), n_inputs, n_outputs, inputList, outputList);

    if (type == null) {
      ThisComponentName = $__default['default']('div#addComp').attr('type');
    } else {
      ThisComponentName = type;
      newcomp.dftype = kwargs.dfType;
      newcomp.ShortName = kwargs.shortName;
      popupMessage(ThisComponentName + ' Component added');
    }

    newcomp.fill = color;
    newcomp.type = "cloud";
    newcomp.Name = "Cloud";
    newcomp.height = Math.max(80, titleMargin + Math.max(newcomp.inputs.length, newcomp.outputs.length + 1) * padding);
    newcomp.width = Math.max(100, (longestInput.length + longestOutput.length) * one_character_width + titleMarginLeft); // initiate the parent_children_matrix

    var guid = newcomp.GUID;
    var data = { ...reactContext.state.parent_child_matrix
    };
    data[guid] = [];
    reactContext.setState({
      parent_child_matrix: data
    });
  }

  var allContents = d3$2.select('#allCanvasContents');
  var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);
  var genX;
  var genY;
  node = cont.append('g').attr('class', newcomp.type + ' ' + newcomp.state + ' ' + newcomp.selection + ' ' + newcomp.view + ' ' + newcomp.GUID).attr('id', 'comp-' + newcomp.GUID).attr('transform', () => {
    if (FromExisting == null) {
      if (kwargs.X !== undefined && kwargs.Y !== undefined) {
        newcomp.X = kwargs.X;
        newcomp.Y = kwargs.Y;
      } else {
        genX = Math.random() * 500 + 200;
        genY = Math.random() * 500 + 200;
        newcomp.X = genX;
        newcomp.Y = genY;
      }

      return 'translate(' + newcomp.X + ', ' + newcomp.Y + ')';
    } else {
      return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
    }
  });
  statusBar = node.append('g') // .attr('id', "cloudResizeHeight")
  .attr('transform', 'translate(0,' + (newcomp.height - 25) + ')');
  statusBar.append('rect').attr('id', 'statusRect' + newcomp.GUID).attr('width', newcomp.width + 2).attr('x', -1.0).attr('height', 40).attr('fill', IDLE_COLOR).attr('stroke-width', 1).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('opacity', 0.5);
  statusBar.append('text').attr('class', 'statusTextClass').attr('id', 'statusText' + newcomp.GUID).attr('fill', 'black').attr('x', 5).attr('y', 37).text('Idle...');

  function addInputCircles(newcomp) {
    var node = newcomp.node;
    var InputGroup = node.append('g').lower();

    for (let index = 0; index < newcomp.inputs.length; index++) {
      InputGroup.append('circle').lower().attr('cx', '0').attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('r', '7').attr('stroke', newcomp.fill).attr('stroke-width', '2').attr('id', 'inputCirViual' + newcomp.GUID + '_' + index).attr('class', 'inputCirVisual' + newcomp.GUID + ' ' + index).attr('type', function () {
        if (FromExisting == null) {
          return 'text';
        } else {
          return FromExisting.inputs[index].type;
        }
      });
    }

    InputGroup = node.append('g').lower();

    for (let index = 0; index < newcomp.inputs.length; index++) {
      InputGroup.append('circle').lower().attr('cx', '0').attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('fill-opacity', '0.3').attr('r', '15').attr('id', 'inputCir' + newcomp.GUID + '_' + index).attr('class', 'inputCir' + newcomp.GUID + ' ' + index).attr('type', function () {
        if (FromExisting == null) {
          return 'text';
        } else {
          return FromExisting.inputs[index].type;
        }
      });
    }

    var InputGroupText = node.append('g');

    for (let index = 0; index < newcomp.inputs.length; index++) {
      console.log(newcomp.inputs[index].Name);
      InputGroupText.append('text').attr('id', 'input-' + newcomp.GUID + '_' + index).attr('class', 'inputTxt' + newcomp.GUID + ' ' + index).attr('transform', 'translate(' + 10 + ' , ' + (index * padding + titleMargin + 5).toString() + ')').text(newcomp.inputs[index].Name).attr('fill', 'black').attr('type', function () {
        newcomp.inputs[index].textObj = this.id;

        if (FromExisting == null) {
          return 'text';
        } else {
          return FromExisting.inputs[index].type;
        }
      });
    }
  }

  addInputCirclesFunc = addInputCircles;

  function addOutputCircles(newcomp) {
    var node = newcomp.node;
    var OutputGroup = node.append('g').lower();

    for (let index = 0; index < newcomp.outputs.length; index++) {
      OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('r', '7').attr('stroke', newcomp.fill).attr('stroke-width', '2').attr('id', 'outputCirVisual' + newcomp.GUID + '_' + index).attr('class', 'outputCirVisual' + newcomp.GUID + ' ' + index).attr('type', function () {
        if (FromExisting == null) {
          return 'text';
        } else {
          return FromExisting.outputs[index].type;
        }
      }).lower();
    }

    OutputGroup = node.append('g').lower();

    for (let index = 0; index < newcomp.outputs.length; index++) {
      OutputGroup.append('circle').attr('cx', newcomp.width).attr('cy', (index * padding + titleMargin).toString()).attr('fill', newcomp.fill).attr('fill-opacity', '0.5').attr('r', '12').attr('id', 'outputCir' + newcomp.GUID + '_' + index).attr('class', 'outputCir' + newcomp.GUID + ' ' + index).attr('type', function () {
        if (FromExisting == null) {
          return 'text';
        } else {
          return FromExisting.outputs[index].type;
        }
      });
    }

    var OutputGroupText = node.append('g');

    for (let index = 0; index < newcomp.outputs.length; index++) {
      OutputGroupText.append('text').attr('id', 'output-' + newcomp.GUID + '_' + index).attr('class', 'outputTxt' + newcomp.GUID + ' ' + index).attr('transform', 'translate(' + (newcomp.width - newcomp.outputs[index].ShortName.length * 8 - 5).toString() + ' , ' + (index * padding + titleMargin + 5).toString() + ')').text(newcomp.outputs[index].ShortName).attr('fill', 'black').attr('type', function () {
        newcomp.outputs[index].circle = this;

        if (FromExisting == null) {
          return 'text';
        } else {
          newcomp.outputs[index].type = FromExisting.outputs[index].type;
          return FromExisting.outputs[index].type;
        }
      }).attr('type', function () {
        newcomp.outputs[index].textObj = this.id;

        if (FromExisting == null) {
          return 'text';
        } else {
          return FromExisting.outputs[index].type;
        }
      });
    }
  }

  addOutputCirclesFunc = addOutputCircles;
  Dummyrect = node.append('rect').attr('class', 'CompCBodyDummy ' + newcomp.GUID).attr('id', 'dummyRect_' + newcomp.GUID).attr('rx', COMPONENT_RADIUS + 1).attr('ry', COMPONENT_RADIUS + 1).attr('stroke-width', '3').attr('stroke', newcomp.fill).attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', '#E8E8E8').on('mousedown', () => {
    reactContext.setState({
      rectType: 'component'
    });
  });
  cirGroup = node.append('g').attr('transform', () => {
    var x = newcomp.width;
    var y = newcomp.height;
    return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
  });
  var Titlegroup = node.append('g').attr('transform', () => {
    return 'translate(0, 15)';
  }); //Title rectangle

  Titlegroup.append('rect').attr('width', newcomp.width - 2).attr('height', 20).attr('fill', newcomp.fill).attr('x', 1.0).attr('y', -14).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS);
  Titlegroup.append('rect').attr('width', newcomp.width - 2).attr('height', 8).attr('fill', newcomp.fill).attr('x', 1.0).attr('y', -2);
  resize1 = node.append('rect').attr('width', newcomp.width - 2).attr('height', newcomp.height - 2).attr('x', 1.0).attr('y', 1).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('stroke', newcomp.fill).attr('fill-opacity', 0.0);
  Titlegroup.append('foreignObject').attr('class', 'nodetitle node_title' + newcomp.GUID).attr('id', 'node_title' + newcomp.GUID).attr('x', 0).attr('y', -10).attr('width', newcomp.width).attr('height', '20').text(newcomp.Name);
  rect = node.append('rect').attr('class', 'CompCBody ' + newcomp.GUID).attr('id', newcomp.GUID).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('width', newcomp.width).attr('height', newcomp.height).attr('fill', newcomp.fill).attr('fill-opacity', '0.01').on('mousemove', function (event) {
    d3$2.select(event.currentTarget).attr('cursor', 'pointer');
  }).on('mouseout', function (event) {
    d3$2.select(event.currentTarget).attr('fill', newcomp.fill);
  }).on('dblclick', () => {}).on('mousedown', () => {
    reactContext.setState({
      rectType: 'component'
    });
  });
  var icon = node.append('g').attr('transform', 'translate(' + (newcomp.width - 20).toString() + ',1)');
  icon.append('foreignObject').attr('width', 18).attr('height', 18).attr('style', () => {
    return `background-image:url(src/img/` + newcomp.Name + `.png);background-size: 15px;background-repeat: no-repeat;background-position: center;`;
  });
  playrect2 = node.append('rect').attr('class', 'play ' + newcomp.GUID).attr('id', 'play_' + newcomp.GUID).attr('x', newcomp.width / 2.0 - 10).attr('y', newcomp.height - 10).attr('height', 20).attr('width', 20).attr('rx', COMPONENT_RADIUS).attr('ry', COMPONENT_RADIUS).attr('fill', newcomp.fill).attr('stroke', newcomp.fill).attr('stroke-width', '6').style('cursor', 'pointer').on('click', function () {
    console.log('start calculation');
    runDeepFunction(newcomp.GUID);
  });
  node.append('svg').attr('role', 'img').attr('class', 'removableSVG' + newcomp.GUID).attr('xmlns', 'http://www.w3.org/2000/svg').attr('width', 20).attr('height', 20).attr('x', newcomp.width / 2.0 - 10).attr('y', newcomp.height - 10).attr('viewBox', '0 0 512 512').append('path').attr('class', 'play ' + newcomp.GUID).attr('fill', 'white').attr('d', 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z').on('click', function () {
    console.log('start calculation');
    runDeepFunction(newcomp.GUID);
  });
  newcomp.addInputCirclesFunc = addInputCirclesFunc;
  newcomp.addOutputCirclesFunc = addOutputCirclesFunc;
  newcomp.statusBar = statusBar;
  newcomp.Dummyrect = Dummyrect;
  newcomp.cirGroup = cirGroup;
  newcomp.resize1 = resize1;
  newcomp.rect = rect;
  newcomp.playrect2 = playrect2;
  newcomp.node = node;
  addInputCirclesFunc(newcomp);
  addOutputCirclesFunc(newcomp);

  if (FromExisting == null) {
    var current_all_comp = reactContext.state.allComp.slice();
    console.log('Adding a generic comp' + newcomp);
    current_all_comp.push(newcomp);
    reactContext.setState({
      allComp: current_all_comp
    });
  }

  var current_comp_out = { ...reactContext.state.comp_output_edges
  };
  var current_comp_in = { ...reactContext.state.comp_input_edges
  };
  current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
  current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
  reactContext.setState({
    comp_input_edges: current_comp_in,
    comp_output_edges: current_comp_out
  });
  var current_components_selection = { ...reactContext.state.components_selection_data
  };
  current_components_selection[newcomp.GUID] = {
    x0: newcomp.X,
    y0: newcomp.Y,
    x1: newcomp.X + newcomp.width,
    y1: newcomp.Y + newcomp.height
  };
  reactContext.setState({
    components_selection_data: current_components_selection
  });
}

function submitCloudEdit(compKey) {
  try {
    var cloudComp = selectComp(compKey);
    var name = $__default['default']('input.cloudProp.Name').val();
    var inputs = $__default['default']('textarea.cloudProp.Val').val();
    var url = $__default['default']('input.cloudProp.url').val();
    cloudComp.inputNames = inputs;
    cloudComp.inputs = createInputDict(inputs.split('\n'));
    cloudComp.outputs = createOutputDict(["out"]);
    cloudComp.url = url;
    cloudComp.Name = name;
    d3$2.selectAll('circle.inputCirVisual' + cloudComp.GUID).remove();
    d3$2.selectAll('circle.inputCir' + cloudComp.GUID).remove();
    d3$2.selectAll('text.inputTxt' + cloudComp.GUID).remove();
    d3$2.selectAll('circle.outputCirVisual' + cloudComp.GUID).remove();
    d3$2.selectAll('circle.outputCir' + cloudComp.GUID).remove();
    d3$2.selectAll('text.outputTxt' + cloudComp.GUID).remove();
    addInputCirclesFunc(cloudComp);
    addOutputCirclesFunc(cloudComp);
    resize(cloudComp);
    $__default['default']('foreignObject#node_title' + cloudComp.GUID).text(name);
    redrawDependents(compKey);
    $__default['default']('div#propertiesBarContents').html('');
  } catch (error) {
    console.log(error);
    alert("Invalid JSON format!");
  }
}

function cancelCloudEdit() {
  $__default['default']('div#propertiesBarContents').html('');
}

function resize(newcomp) {
  var padding = 20;
  var titleMargin = 30;
  newcomp.height = Math.max(80, titleMargin + Math.max(newcomp.inputs.length, newcomp.outputs.length + 1) * padding);
  newcomp.statusBar.attr('transform', 'translate(0,' + (newcomp.height - 25) + ')');
  newcomp.Dummyrect.attr('height', newcomp.height);
  newcomp.cirGroup.attr('transform', () => {
    var x = newcomp.width;
    var y = newcomp.height;
    return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
  });
  newcomp.resize1.attr('height', newcomp.height - 2);
  newcomp.rect.attr('height', newcomp.height);
  newcomp.playrect2.attr('y', newcomp.height - 10);
  d3$2.select('svg.removableSVG' + newcomp.GUID).remove();
  newcomp.node.append('svg').attr('role', 'img').attr('class', 'removableSVG' + newcomp.GUID).attr('xmlns', 'http://www.w3.org/2000/svg').attr('width', 20).attr('height', 20).attr('x', newcomp.width / 2.0 - 10).attr('y', newcomp.height - 10).attr('viewBox', '0 0 512 512').append('path').attr('class', 'play ' + newcomp.GUID).attr('fill', 'white').attr('d', 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z').on('click', function () {
    console.log('start calculation');
    runDeepFunction(newcomp.GUID);
  });
}

function createOutputDict(outputsIn) {
  var outputs = [];

  for (let index = 0; index < outputsIn.length; index++) {
    try {
      outputs.push({
        id: index,
        circle: null,
        textObj: null,
        Name: outputsIn[index],
        ShortName: outputsIn[index],
        Description: outputsIn[index].desc,
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: null
      });
    } catch {
      outputs.push({
        id: index,
        circle: null,
        textObj: null,
        Name: '',
        ShortName: '',
        Description: '',
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: null
      });
    }
  }

  return outputs;
}

function createInputDict(inputsIn) {
  var inputs = [];

  for (let index = 0; index < inputsIn.length; index++) {
    try {
      inputs.push({
        id: index,
        circle: null,
        textObj: null,
        Name: inputsIn[index],
        ShortName: inputsIn[index].shortName,
        Description: inputsIn[index].desc,
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: inputsIn[index].default_value
      });
    } catch {
      inputs.push({
        id: index,
        circle: null,
        textObj: null,
        Name: '',
        ShortName: '',
        Description: '',
        Message: 'short description',
        type: 'item',
        datatype: 'int',
        value: ''
      });
    }
  }

  return inputs;
}

var d3$1 = require('d3');

function getCurrentData(reactContext) {
  var allContents = d3$1.select('#allCanvasContents');
  var svgContainer = d3$1.select('svg');
  reactContext.state.allEdges.forEach(function (element) {
    element['d'] = $__default['default']('path#' + element.path_id).attr('d');
    element['circleX'] = $__default['default']('rect#pathCircle' + element.path_id).attr('x');
    element['circleY'] = $__default['default']('rect#pathCircle' + element.path_id).attr('y');
  });
  console.log(reactContext.state.allComp);
  var data = {
    components: reactContext.state.allComp,
    edges: reactContext.state.allEdges,
    comp_input_edges: reactContext.state.comp_input_edges,
    comp_output_edges: reactContext.state.comp_output_edges,
    edge_comp_matrix: reactContext.state.edge_comp_matrix,
    parent_child_matrix: reactContext.state.parent_child_matrix,
    parent_child_matrix_fast_check: reactContext.state.parent_child_matrix_fast_check,
    root_components: reactContext.state.root_components,
    canvas_transform: {
      transform: allContents.attr('transform'),
      kXY: svgContainer._groups[0][0].__zoom
    },
    currentRightColWidth: parseFloat(d3$1.select('div#PropertiesBar').style('width')),
    currentLeftColWidth: parseFloat(d3$1.select('div#LeftPropertiesBar').style('width'))
  };
  var fileData = JSON.stringify(data);
  return fileData;
}

function saveData() {
  var fileData = getCurrentData(this);
  var storage = window.localStorage;
  storage.setItem('data', fileData);
  alert('Successfully save data');
}

function clearData() {
  window.localStorage.clear();
  alert('All the saved data has been cleared. The page will be reloaded');
  window.location.reload(true);
}

function downloadData() {
  var fileData = getCurrentData(this);
  var blob = new Blob([fileData], {
    type: "text/plain"
  });
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.download = "data.json";
  link.href = url;
  link.click();
}

function loadData() {
  var _this = this;

  var allData = JSON.parse(window.localStorage.getItem('data'));
  var allContents = d3$1.select('#allCanvasContents');
  var svgContainer = d3$1.select('svg');

  if (allData !== null) {
    if (allData.canvas_transform !== undefined && allData.canvas_transform !== null) {
      allContents.attr('transform', allData.canvas_transform.transform);
      svgContainer._groups[0][0].__zoom.k = allData.canvas_transform.kXY.k;
      svgContainer._groups[0][0].__zoom.x = allData.canvas_transform.kXY.x;
      svgContainer._groups[0][0].__zoom.y = allData.canvas_transform.kXY.y;
    }

    if (allData.components !== undefined && allData.components !== null) {
      var allComponents = allData.components;
      this.setState({
        allComp: allComponents
      });
      allComponents.forEach(function (element) {
        console.log(element);
        if (element.type === 'component') CreateNewComponent(_this, element);else if (element.type === 'slider') CreateNewSlider(_this, element);else if (element.type === 'string') CreateNewPanel(_this, element);else if (element.type === 'toggle') CreateNewToggle(_this, element);else if (element.type === 'optionList') CreateNewOptionList(_this, element);else if (element.type === 'fileUpload') CreateNewFileUpload(_this, element);else if (element.type === 'listView') CreateNewListView(_this, element);else if (element.type === 'cloud') CreateNewCloud(_this, element);
      });
    }

    if (allData.edges !== undefined && allData.edges !== null) {
      var allEdges = allData.edges;
      this.setState({
        allEdges: allData.edges,
        comp_input_edges: allData.comp_input_edges,
        comp_output_edges: allData.comp_output_edges,
        edge_comp_matrix: allData.edge_comp_matrix,
        parent_child_matrix: allData.parent_child_matrix,
        parent_child_matrix_fast_check: allData.parent_child_matrix_fast_check,
        root_components: allData.root_components
      });
      allEdges.forEach(function (element) {
        CreatePaths(element);
      });
    }
  }
}

function CreatePaths(theEdge) {
  d3$1.select('g#allPaths').append('path').attr('d', function () {
    return theEdge.d;
  }).attr('stroke', 'black').attr('stroke-width', '5').attr('id', theEdge.path_id).attr('stroke-dasharray', '4').attr('stroke-linecap', 'round').attr('fill', 'none').attr('stroke-opacity', '0.5').lower();
  addEdgeCircle(theEdge, theEdge.d).attr('x', theEdge.circleX).attr('y', theEdge.circleY).attr('style', 'display:block');
} //End of CreatePaths

var TopBar = /*#__PURE__*/function (_Component) {
  _inherits(TopBar, _Component);

  var _super = _createSuper(TopBar);

  function TopBar(props) {
    var _this;

    _classCallCheck(this, TopBar);

    _this = _super.call(this, props);
    _this.saveData = _this.props.saveData;
    _this.downloadData = _this.props.downloadData;
    return _this;
  }

  _createClass(TopBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React__default['default'].createElement("div", {
        id: "TopPropertiesBar"
      }, /*#__PURE__*/React__default['default'].createElement("a", {
        id: "fileTheDef",
        className: "menubarButtons"
      }, "File"), /*#__PURE__*/React__default['default'].createElement("a", {
        id: "fileTheDef",
        className: "menubarButtons"
      }, "Edit"), /*#__PURE__*/React__default['default'].createElement("a", {
        id: "fileTheDef",
        className: "menubarButtons"
      }, "Help"), /*#__PURE__*/React__default['default'].createElement("a", {
        id: "saveTheDef",
        className: "menubarButtons",
        onClick: function onClick() {
          return _this2.saveData();
        }
      }, "Save"), /*#__PURE__*/React__default['default'].createElement("a", {
        id: "fileTheDef",
        className: "menubarButtons",
        onClick: function onClick() {
          return clearData();
        }
      }, "Clear"), /*#__PURE__*/React__default['default'].createElement("a", {
        id: "saveTheDef",
        className: "menubarButtons",
        onClick: function onClick() {
          return _this2.downloadData();
        }
      }, "Download"), /*#__PURE__*/React__default['default'].createElement("div", {
        id: "minimizeUpperBar",
        style: {
          display: "block"
        },
        onClick: function onClick() {
          return onMinimizeClick();
        }
      }, /*#__PURE__*/React__default['default'].createElement("i", {
        id: "tominimize",
        className: "fa fa-caret-up",
        "aria-hidden": "true"
      })), /*#__PURE__*/React__default['default'].createElement("div", {
        id: "maximizeUpperBar",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return onMaximizeClick();
        }
      }, /*#__PURE__*/React__default['default'].createElement("i", {
        id: "tomaximize",
        className: "fa fa-caret-up",
        "aria-hidden": "true",
        style: {
          transform: [{
            rotate: '180deg'
          }]
        }
      })));
    }
  }]);

  return TopBar;
}(React.Component);

class ComponentTab extends React.Component {
  render() {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2",
      className: "TabToolBox componentTab"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_0",
      className: "toolbarbuttonsContainer"
    }, "\xA0 Components ", '>', /*#__PURE__*/React__default['default'].createElement("span", {
      className: "currentTab componentTab",
      style: {
        marginLeft: "3px"
      }
    }, " Main Inputs")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_1",
      className: "toolbarbuttonsContainer componentTab Basic 0",
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_1",
      className: "toolbarbuttonsContainer componentTab BSH -1",
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_1",
      className: "toolbarbuttonsContainer componentTab Osi -1",
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_1",
      className: "toolbarbuttonsContainer componentTab Pandas -1",
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_1",
      className: "toolbarbuttonsContainer componentTab StringOps -1",
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_1",
      className: "toolbarbuttonsContainer componentTab Input 0"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addSlider",
      onClick: () => CreateNewSlider(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://image.flaticon.com/icons/png/512/983/983840.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "Slider")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addPanel",
      onClick: () => CreateNewPanel(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/2274978.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "Panel")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addToggle",
      onClick: () => CreateNewToggle(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://image.flaticon.com/icons/png/512/1465/1465907.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "Toggle")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addOptionList",
      onClick: () => CreateNewOptionList(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "Option list")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addListView",
      onClick: () => CreateNewListView(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "List view")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addFile",
      onClick: () => CreateNewFileUpload(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://image.flaticon.com/icons/png/512/2329/2329379.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "File upload")), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "addFile",
      onClick: () => CreateNewCloud(this.props.context),
      className: "mainButtonItem 1 1 tooltip",
      style: {
        backgroundImage: "url(https://image.flaticon.com/icons/png/512/1935/1935089.png)"
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext",
      id: "hintx"
    }, "Cloud"))), /*#__PURE__*/React__default['default'].createElement("div", {
      id: "toolbar_container_1_2_2",
      className: "toolbarRightToggleNavigator 1"
    }));
  }

}

class PropertiesTab extends React.Component {
  render() {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      id: "PropertiesBar"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "ccatheader"
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      className: "ccbody",
      id: "propertiesBarContents",
      style: {
        "width": "100%"
      }
    }));
  }

}

var LeftContainer = /*#__PURE__*/function (_Component) {
  _inherits(LeftContainer, _Component);

  var _super = _createSuper(LeftContainer);

  function LeftContainer() {
    _classCallCheck(this, LeftContainer);

    return _super.apply(this, arguments);
  }

  _createClass(LeftContainer, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        id: "LeftPropertiesBar",
        style: {
          top: "30px"
        }
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "leftbarcontainer"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "toolbar_container_1",
        className: "toolBarContainer 1"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "toolbar_container_1_1",
        className: "toolBarContainer 1 1"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "toolbar_container_1_1_1",
        className: "toolbarTopToggleContainer"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "toolbarTopToggleItem 1"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "toptoggleitem componentTab selected"
      }, "Components")))), /*#__PURE__*/React__default['default'].createElement(ComponentTab, {
        context: this.props.context
      }))), /*#__PURE__*/React__default['default'].createElement("div", {
        id: "leftbarcontainer"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "toolbar_container_1",
        className: "toolBarContainer 1"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "toolbar_container_1_1",
        className: "toolBarContainer 1 1"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "toolbar_container_1_1_1",
        className: "toolbarTopToggleContainer"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "toolbarTopToggleItem 1"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "toptoggleitem propertiesTab selected"
      }, "Properties")))), /*#__PURE__*/React__default['default'].createElement(PropertiesTab, null))));
    }
  }]);

  return LeftContainer;
}(React.Component);

var d3 = require('d3');

function addEdge(from, to, fromComp, toComp) {
  var initLink = {
    GUID: uuidv4('E'),
    path: null,
    path_id: '',
    circleX: 0,
    circleY: 0,
    from: from,
    to: to,
    fromComp: fromComp,
    toComp: toComp
  };
  return initLink;
}

function handleComponentSelection() {
  var reactContext = this;
  var allComp = reactContext.state.allComp;
  allComp.forEach(function (element) {
    if (element.type === 'component' || element.type === 'toggle' || element.type === 'fileUpload' || element.type === 'listView' || element.type === 'cloud') {
      d3.select('g#comp-' + element.GUID).on('click', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '2').attr('stroke', '#0064ffa8');
        reactContext.setState({
          selected_component_id: element.GUID
        });
      });
      d3.select('rect#' + element.GUID).on('focusout', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '0').attr('stroke', 'none');
      });
    } else if (element.type === 'string') {
      d3.selectAll('rect#' + element.GUID + ', rect.CompPBody.' + element.GUID + '.a').on('click', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '2').attr('stroke', '#0064ffa8');
        d3.select('rect#statusRect' + element.GUID).attr('fill', '#0081ff');
        reactContext.setState({
          selected_component_id: element.GUID
        });
      });
      d3.selectAll('rect#' + element.GUID + ', rect#overlaySelector' + element.GUID).on('focusout', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '0').attr('stroke', 'none');
        d3.select('rect#statusRect' + element.GUID).attr('fill', '#525252');
      });
    } else if (element.type === 'slider') {
      d3.select('rect#' + element.GUID).on('click', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '2').attr('stroke', '#0064ffa8');
        reactContext.setState({
          selected_component_id: element.GUID
        });
      }).on('focusout', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '1').attr('stroke', 'black');
      });
    } else if (element.type === 'optionList') {
      d3.select('g#comp-' + element.GUID).on('click', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '2').attr('stroke', '#0064ffa8');
        showDropDownList(element.GUID);
        reactContext.setState({
          selected_component_id: element.GUID,
          optionListStarted: true,
          optionlistRectid: element.GUID
        });
      });
      d3.select('rect#' + element.GUID).on('focusout', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '0').attr('stroke', 'none');
      });
    }
  });
  ViewListRedrawing();
} // End of handleComponentSelection
//Slider component id changed to CompSBody hence will not be picked up
//by this function. Lookout for side effects!
//Panel changed to CompPBody
//Toggle changed to CompTBody
//fileUpload changed to CompFBody


function handleTheClickOnAllComponents() {
  var reactContext = this;
  reactContext.state.allComp;
  d3.selectAll('rect.CompPBody, rect.CompSBody, rect.CompTBody, rect.CompOBody, rect.CompLBody, rect.CompFBody, rect.CompCBody').on('mousedown', function (event) {
    var coordinates = d3.pointer(event);
    var pos = $__default['default']('g#comp-' + this.id.replace('overlaySelector', '')).attr('transform').split('translate(')[1].replace(')', '').split(',').map(function (item) {
      return parseFloat(item, 10);
    });
    reactContext.setState({
      dragX: pos[0],
      dragY: pos[1],
      componentClickX: coordinates[0],
      componentClickY: coordinates[1],
      clicked: true,
      startDrag: true,
      clickedId: this.id.replace('overlaySelector', ''),
      selected_components: [this.id.replace('overlaySelector', '')],
      rectType: 'component'
    });
  });
} // End of handleTheClickOnAllComponents


function handleEdgeInitialization() {
  var reactContext = this;
  var allContents = d3.select('#allCanvasContents');
  var toComponent = null;
  d3.selectAll('circle').on('mousedown', function (event) {
    reactContext.setState({
      targetcircleId: this.id
    });
    var edgeStarted = reactContext.state.edgeStarted;
    var targetcircleIN = reactContext.state.targetcircleIN;

    var fromCircle = _objectSpread2({}, reactContext.state.fromCircle);

    var comp_output_edges = _objectSpread2({}, reactContext.state.comp_output_edges);

    var selectedcircleId;

    if (edgeStarted && targetcircleIN && this !== fromCircle.element) ; else {
      if (this.classList[0] === 'outputCir') {
        if (comp_output_edges[this.classList[1]][this.classList[2]] === undefined || comp_output_edges[this.classList[1]][this.classList[2]] === null) {
          selectedcircleId = this.id;
          reactContext.setState({
            selectedcircleId: selectedcircleId
          });
        } else {
          selectedcircleId = this.id + comp_output_edges[this.classList[1]][this.classList[2]].length.toString();
          reactContext.setState({
            selectedcircleId: selectedcircleId
          });
        }

        reactContext.setState({
          edgeStarted: true
        });
        var x = d3.pointer(event, allContents.node())[0];
        var y = d3.pointer(event, allContents.node())[1];
        var initEdgex1 = x;
        var initEdgey1 = y;
        d3.select('g#allPaths').append('path').attr('stroke-dasharray', '4').attr('d', function () {
          return 'M ' + initEdgex1 + ' ' + initEdgey1 + ' L ' + x + ' ' + y;
        }).attr('stroke', 'black').attr('stroke-width', '3').attr('id', 'Path' + selectedcircleId);
        fromCircle.element = this;
        reactContext.setState({
          selectedcircleId: 'Path' + selectedcircleId,
          fromCircle: fromCircle,
          initEdgex1: initEdgex1,
          initEdgey1: initEdgey1
        });
      }
    }
  }).on('mousemove', function () {
    reactContext.setState({
      targetcircleIN: true
    });
  }).on('mouseout', function () {
    reactContext.setState({
      targetcircleIN: false
    });
  }).on('mouseup', function () {
    //This event is called when the mouse cursor is inside the input circle, this means that the line is now complete and ready to be created.
    var edgeStarted = reactContext.state.edgeStarted;
    var allEdges = reactContext.state.allEdges;
    var targetcircleIN = reactContext.state.targetcircleIN;

    var fromCircle = _objectSpread2({}, reactContext.state.fromCircle);

    var toCircle = _objectSpread2({}, reactContext.state.toCircle);

    var comp_input_edges = _objectSpread2({}, reactContext.state.comp_input_edges);

    var comp_output_edges = _objectSpread2({}, reactContext.state.comp_output_edges);

    var root_components = reactContext.state.root_components; //What.

    var parent_child_matrix = reactContext.state.parent_child_matrix;

    var parent_child_matrix_fast_check = _toConsumableArray(reactContext.state.parent_child_matrix_fast_check);

    var selectedcircleId = reactContext.state.selectedcircleId;

    if (edgeStarted && targetcircleIN && this !== fromCircle.element && (comp_input_edges[this.classList[1]][this.classList[2]] === undefined || comp_input_edges[this.classList[1]][this.classList[2]] === null)) {
      toCircle.element = this;
      reactContext.setState({
        toCircle: toCircle
      });
      toComponent = selectComp(toCircle.element.classList[1]);
      selectComp(fromCircle.element.classList[1]);

      if (!parent_child_matrix_fast_check.includes(fromCircle.element.classList[2] + ' ' + fromCircle.element.classList[1] + ' ' + toCircle.element.classList[2] + ' ' + toCircle.element.classList[1])) {
        var thisEdge = addEdge(fromCircle, toCircle, fromCircle.element.classList, toCircle.element.classList);
        var thisPath = d3.select('#' + selectedcircleId);
        thisEdge.path_id = thisPath['_groups'][0][0].id;

        if (comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] === undefined || comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] === null) {
          comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] = [thisEdge.path_id];
        } else {
          comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]].push(thisEdge.path_id);
        }

        if (comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] === undefined || comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] === null) {
          comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] = [thisEdge.path_id];
        } else {
          comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]].push(thisEdge.path_id);
        } // Datatree control. FIX UNCOMMENR


        var current_edge_comp_matrix = _objectSpread2({}, reactContext.state.edge_comp_matrix);

        current_edge_comp_matrix[thisEdge.path_id] = {
          from: fromCircle.element.classList[1],
          to: toCircle.element.classList[1],
          from_index: fromCircle.element.classList[2],
          to_index: toCircle.element.classList[2]
        };
        reactContext.setState({
          comp_input_edges: comp_input_edges,
          comp_output_edges: comp_output_edges,
          edge_comp_matrix: current_edge_comp_matrix
        });

        try {
          if (root_components[fromCircle.element.classList[1]] !== 'branch') {
            root_components[fromCircle.element.classList[1]] = 'root';
            reactContext.setState({
              root_components: root_components
            });
            toComponent.child = false;
          }
        } catch (err) {
          console.log(err);
        }

        parent_child_matrix_fast_check.push(fromCircle.element.classList[2] + ' ' + fromCircle.element.classList[1] + ' ' + toCircle.element.classList[2] + ' ' + toCircle.element.classList[1]);
        parent_child_matrix[fromCircle.element.classList[1]].push([fromCircle.element.classList[2], toCircle.element.classList[1], toCircle.element.classList[2]]);
        root_components[toCircle.element.classList[1]] = 'branch';
        toComponent.child = true;
        allEdges.push(thisEdge);
        reactContext.setState({
          parent_child_matrix: parent_child_matrix,
          parent_child_matrix_fast_check: parent_child_matrix_fast_check,
          root_components: root_components,
          allEdges: allEdges,
          edgeStarted: false
        });
        updateAll();
        redrawDependents(fromCircle.element.classList[1]);
      } else {
        console.log('Issue in parentchildmatrix (edgeInit)');
      }
    } else {
      console.log('Not entering if (edgeInit)');
    }
  });
} // End of handleEdgeInitialization


function handleDoubleClick() {
  var reactContext = this;
  var allComp = reactContext.state.allComp;
  allComp.forEach(function (element) {
    if (element.type === 'string') {
      d3.select('g#comp-' + element.GUID).on('dblclick', function () {
        if (!reactContext.state.doubleClicked) {
          reactContext.setState({
            doubleClicked: true
          });
          $__default['default']('div#propertiesBarContents').append("\n                        <div class=\"propertiesbarheader title\">String Panel Properties</div>\n                        <div class=\"propertiesbarheader label\">Name</div>\n                        <input class=\"stringPnanel Name\"></textarea>\n                        <hr>\n                        <div class=\"propertiesbarheader label\">Value</div>\n                        <textarea class=\"textarea stringProperties\"></textarea>\n                        <hr>\n                        <div class=\"propertiesbarheader label\">Panel Type</div>\n                        <form>\n                            <input type=\"radio\" name=\"type\" id=\"string_radio_text\" value=\"text\"> text<br>\n                            <input type=\"radio\" name=\"type\" id=\"string_radio_html\" value=\"html\"> html<br>\n                            <input type=\"radio\" name=\"type\" id=\"string_radio_json\" value=\"json\"> json<br>\n                            <input type=\"radio\" name=\"type\" id=\"string_radio_lsit\" value=\"lsit\"> list<br>\n                            <input type=\"radio\" name=\"type\" id=\"string_radio_plot\" value=\"plot\"> plot <br>\n                        </form>\n                        <hr>\n                        <div class=\"propertiesbarheader label\">Log</div>\n                        <div id=\"propertiesBarLog\" class=\"log\"></div>\n                        <button id=\"stringEditButton\">Apply</button>\n                        <button id=\"cancelStringEdit\">Cancel</button>");
          element.outputs[0].value = element.value;
          var StringComp = selectComp(element.GUID);
          $__default['default']('input#string_radio_' + StringComp.inputs[0].type).prop('checked', true);
          var newName;
          $__default['default']('input.stringPnanel.Name').on('change keyup paste', function () {
            newName = $__default['default']('input.stringPnanel.Name').val();
            d3.select('text#nodeTitle' + StringComp.GUID).text(newName); // StringComp.Name = newName;

            d3.select('rect#' + StringComp.GUID).attr('width', 10 + newName.length * 6);
          });

          if (StringComp.child) {
            $__default['default']('textarea.textarea.stringProperties').prop('disabled', true);
            $__default['default']('textarea.stringProperties').text(function () {
              return StringComp.inputs[0].value;
            });
            $__default['default']('body').on('mousemove', function () {
              $__default['default']('textarea.stringProperties').text(function () {
                return StringComp.inputs[0].value;
              });
            });
          } else {
            $__default['default']('textarea.stringProperties').text(function () {
              return StringComp.inputs[0].value;
            });
          }

          $__default['default']('input.stringPnanel.Name').val(StringComp.Name);
          $__default['default']('button#stringEditButton').on('click', function () {
            submitPanelEdit(element.GUID);
            reactContext.setState({
              doubleClicked: false
            });
          });
          $__default['default']('button#cancelStringEdit').on('click', function () {
            cancelPanelEdit();
            reactContext.setState({
              doubleClicked: false
            });
          });
        }
      });
    } else if (element.type === 'optionList') {
      d3.select('g#comp-' + element.GUID).on('dblclick', function () {
        d3.select('rect#' + element.GUID).attr('stroke-width', '1').attr('stroke', 'black');
        reactContext.setState({
          optionListStarted: true,
          optionlistRectid: element.GUID
        });

        if (!reactContext.state.doubleClicked) {
          reactContext.setState({
            doubleClicked: true
          });
          $__default['default']('div#propertiesBarContents').append("\n                        <div class=\"propertiesbar title\">Option list properties.</div>\n                        <div class=\"propertiesbar label\">options (as dictionary)</div>\n                        <textarea class=\"textarea optionlistProperties\"></textarea>\n                        <hr>\n                        <div class=\"propertiesbar label\">\n                            Preview:\n                        </div>\n                        <select id=\"propertisBarSelecId\">\n\n                        </select>\n                        <hr>\n                        <div class=\"propertiesbar label\">\n                            Log\n                        </div>\n                        <div id=\"propertiesBarLog\" class=\"log\"></div>\n                        <button id=\"applyChangeButton\">Apply</button>\n                        ");
          var compKey = element.GUID;
          submitOptionListEdit(compKey);
          $__default['default']('button#applyChangeButton').on('click', function (e) {
            readyToGoSubmit(compKey);
            reactContext.setState({
              doubleClicked: false
            });
          });
        }
      });
    } else if (element.type === 'slider') {
      d3.select('g#comp-' + element.GUID).on('dblclick', function () {
        if (!reactContext.state.doubleClicked) {
          reactContext.setState({
            doubleClicked: true
          });
          $__default['default']('div#propertiesBarContents').append("\n                        <div class=\"propertiesbarheader label\">Slider</div>\n                        <div id=\"numerical_slider_container\"><div id=\"string_input_label\">Min-value : </div><input type=\"number\" id=\"new_slider_min_value\"></div>\n                        <div id=\"numerical_slider_container\"><div id=\"string_input_label\">Max-value: </div><input type=\"number\" id=\"new_slider_max_value\"></div>\n                        <div id=\"numerical_slider_container\"><div id=\"string_input_label\">Step: </div><input type=\"number\" id=\"new_slider_step_value\"></div>\n                        <div id=\"numerical_slider_container\"><div id=\"string_input_label\">Current-value: </div><input type=\"number\" id=\"new_slider_current_value\"></div>\n                        <button id=\"sliderEditButton\">Save</button>\n                        <button id=\"cancelSliderEdit\">Cancel</button>\n                        ");
          $__default['default']('input#new_slider_min_value').val(element.min);
          $__default['default']('input#new_slider_max_value').val(element.max);
          $__default['default']('input#new_slider_step_value').val(element.step);
          $__default['default']('input#new_slider_current_value').val(element.value); //On save, set double clicked to false

          $__default['default']('button#sliderEditButton').on('click', function (e) {
            submitSliderEdit(element.GUID);
            reactContext.setState({
              doubleClicked: false
            });
          });
          $__default['default']('button#cancelSliderEdit').on('click', function (e) {
            cancelSliderEdit();
            reactContext.setState({
              doubleClicked: false
            });
          });
        }
      });
    } else if (element.type === 'toggle') {
      var currentToggle = selectComp(element.GUID);
      d3.select('g#comp-' + element.GUID).on('dblclick', function () {
        var toggleValue = $__default['default']('text.nodetitle.node_title' + element.GUID).text();
        d3.select('text.nodetitle.node_title' + element.GUID).text(function () {
          if (toggleValue === 'True') {
            currentToggle.value = 'False';
            currentToggle.outputs[0].value = 'False';
            return 'False';
          } else {
            currentToggle.value = 'True';
            currentToggle.outputs[0].value = 'True';
            return 'True';
          }
        }).attr('fill', function () {
          if (toggleValue === 'True') {
            d3.select('#dummyRect_' + element.GUID).attr('fill', '#2c3e50');
            return '#ecf0f1';
          } else {
            d3.select('#dummyRect_' + element.GUID).attr('fill', '#ecf0f1');
            return '#2c3e50';
          }
        });
        redrawDependents(currentToggle.GUID);
      });
    } else if (element.type === 'cloud') {
      d3.select('g#comp-' + element.GUID).on('dblclick', function () {
        if (!reactContext.state.doubleClicked) {
          reactContext.setState({
            doubleClicked: true
          });
          $__default['default']('div#propertiesBarContents').append("\n                        <div class=\"propertiesbarheader title\">Cloud Function Properties</div>\n                        <div class=\"propertiesbarheader label\">Function Name</div>\n                        <input class=\"cloudProp Name\"></textarea>\n                        <hr>\n                        <div class=\"propertiesbarheader label\">Input List</div>\n                        <textarea class=\"cloudProp textarea stringProperties Val\"></textarea>\n                        <hr>\n                        <div class=\"propertiesbarheader label\">Cloud function URL</div>\n                        <input class=\"cloudProp url\"></textarea>\n                        <div></div>\n                        <div class=\"propertiesbarheader label\">Log</div>\n                        <div id=\"propertiesBarLog\" class=\"log\"></div>\n                        <button id=\"cloudEditButton\">Apply</button>\n                        <button id=\"cancelCloudEdit\">Cancel</button>");
          var cloudComp = selectComp(element.GUID);
          $__default['default']('input.cloudProp.Name').val(cloudComp.Name); // var inputString = JSON.stringify(cloudComp.inputs);
          // $('textarea.cloudProp.Val').val(inputString.substring(1, inputString.length-1));

          $__default['default']('textarea.cloudProp.Val').val(cloudComp.inputNames);
          $__default['default']('input.cloudProp.url').val(cloudComp.url);
          $__default['default']('button#cloudEditButton').on('click', function () {
            submitCloudEdit(element.GUID);
            reactContext.setState({
              doubleClicked: false
            });
          });
          $__default['default']('button#cancelCloudEdit').on('click', function () {
            cancelCloudEdit();
            reactContext.setState({
              doubleClicked: false
            });
          });
        }
      });
    } //TODO : else if other types than string, then you have to open the properties window.

  });
} // End of HandleDoubleClick

/**
 * This file contains all information about the component, which are:
 * name, short name, description, type, dftype (deep or shallow), category, subcategory, input list, output list, color, background image
 * This file also contains the mapping between the tab name and its id
 */
const details = [{
  name: 'Average',
  shname: 'AVG',
  desc: 'The average between two values',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: 'Lists',
  inputList: [{
    name: 'InputList',
    shortName: 'in_01',
    desc: 'first input',
    default_value: '1.0'
  }],
  outputList: [{
    name: 'average',
    shortName: 'avg',
    desc: 'the average between input1 and input 2'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'debugging logger'
  }],
  color: '#F23322',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/958f17e5cfad4cdbbe26dd5affbbbfa2.png'
}, {
  name: 'Add',
  shname: '+',
  desc: 'Add two numbers.',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: 'Math',
  inputList: [{
    name: 'InputList',
    shortName: 'inp_1',
    desc: 'first number',
    default_value: '1.0'
  }],
  outputList: [{
    name: 'sum_',
    shortName: 'sum',
    desc: 'sum of the two inputs'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#F23322',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/e2c5a0d28dca45c38b0e96e6723e2bde.png'
}, {
  name: 'Max',
  shname: 'max',
  desc: 'Maximum value of a list of inputs.',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: 'Lists',
  inputList: [{
    name: 'inputList',
    shortName: '_list',
    desc: 'the input list ',
    default_value: '[0.0, 1.0, 2.0]'
  }],
  outputList: [{
    type: 'list',
    name: 'output_',
    shortName: 'output_',
    desc: 'maximum value '
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output lot'
  }],
  color: '#F23322',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/96524490dcdf4317a9a3e80b9d4762ba.png'
}, {
  name: 'Min',
  shname: 'min',
  desc: 'Minimum value of a list of inputs',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: 'Lists',
  inputList: [{
    name: 'inputList',
    shortName: '_list',
    desc: 'the input list ',
    default_value: '[0, 1, 2.0]'
  }],
  outputList: [{
    type: 'list',
    name: 'output_',
    shortName: 'min_',
    desc: 'minimum value'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#F23322',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/5d844dbee9f54f9ba9891082ac8a52c5.png'
}, {
  name: 'Difference 2',
  shname: 'Difference',
  desc: 'Substraction',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: 'Math',
  inputList: [{
    name: 'in_01',
    shortName: 'in_01',
    desc: 'first input',
    default_value: '10.0'
  }, {
    name: 'in_02',
    shortName: 'in_02',
    desc: 'second input',
    default_value: '5.0'
  }],
  outputList: [{
    name: 'output_',
    shortName: 'out_',
    desc: 'difference'
  }, {
    type: 'float',
    name: 'log_',
    shortName: 'log',
    desc: 'log output'
  }],
  color: '#9b59b6',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/f4fbd2bace8d4fb6b8982ccfaf310f63.png'
}, {
  name: 'Json Navigator',
  shname: 'jsonNav',
  desc: 'Select item from json object by path',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: '',
  inputList: [{
    name: 'input_json',
    shortName: 'input_json',
    desc: 'input_json',
    default_value: 'null'
  }, {
    name: 'path',
    shortName: 'path',
    desc: 'path',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'output',
    shortName: 'output',
    desc: 'output'
  }, {
    type: 'str',
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#c0392b',
  backgroundImage: ''
}, {
  name: '3dVisualizer',
  shname: '3dvis',
  desc: '',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: '',
  inputList: [{
    name: 'url',
    shortName: 'url',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'url',
    shortName: 'url',
    desc: 'null'
  }],
  color: '#E38A74',
  backgroundImage: ''
}, {
  name: 'Image Display',
  shname: 'imshow',
  desc: '',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: '',
  inputList: [{
    name: '_url',
    shortName: 'url',
    desc: 'url',
    default_value: 'https://user-images.githubusercontent.com/6969514/60951247-4bac1200-a32b-11e9-8b66-02bc19953461.png'
  }],
  outputList: [{
    type: 'str',
    name: 'image_'
  }],
  color: '#F23322',
  backgroundImage: ''
}, {
  name: 'YouTube Display',
  shname: 'Youtube',
  desc: '',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: '',
  inputList: [{
    name: '_url',
    shortName: '_url',
    desc: 'youtube url',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'youTube_',
    shortName: 'youTube',
    desc: ''
  }],
  color: '#c0392b',
  backgroundImage: ''
}, {
  name: 'Plot Panel',
  shname: 'plot panel',
  desc: '',
  type: 'component',
  dftype: 'shlow',
  category: 'Basic',
  subcategory: '',
  inputList: [{
    name: 'inputs',
    shortName: 'in',
    default_value: 'null',
    desc: 'in'
  }],
  outputList: [{
    name: 'plot',
    shortName: 'plot',
    desc: 'plot'
  }, {
    name: 'log_',
    shortName: 'log_',
    desc: 'log_'
  }],
  color: '#f1c40f',
  backgroundImage: ''
}, {
  name: 'BuildingSimulationModel',
  shname: 'BSimM',
  desc: "Integrate cloud simulation into BuildSim's automated workflow",
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: '_buildingName',
    shortName: '_bname',
    desc: 'building name',
    default_value: ''
  }, {
    name: '_Building Type',
    shortName: '_btype',
    desc: 'the type of the building: string: default value : "office building"',
    default_value: 'office building'
  }],
  outputList: [{
    type: 'str',
    name: 'model_api',
    shortName: 'api',
    desc: 'the cloud api key of the model '
  }],
  color: '#0D6BA6',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/a65cdbfc93a7436c9c8c83308ed9b100.png'
}, {
  name: 'HVAC',
  shname: 'hvac',
  desc: 'Heating, ventilation, and air conditioning (HVAC) is the technology of indoor and vehicular environmental comfort.',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: 'Models',
  inputList: [{
    name: '_System',
    shortName: '_sys',
    desc: 'HVAC system',
    default_value: ''
  }, {
    name: '_operatingTime',
    shortName: '_opTime',
    desc: 'time of operation in a form of schedule',
    default_value: ''
  }, {
    name: '_Template',
    shortName: '_tmplt',
    desc: 'initialize from a template',
    default_value: ''
  }],
  outputList: [{
    type: 'str',
    name: 'hvacVariables',
    shortName: 'hvVars',
    desc: 'different variables. '
  }, {
    name: 'errorLog_',
    shortName: 'log_',
    desc: 'errors logger.'
  }],
  color: '#0D6BA6',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/784e631b9ba748f28eba825362b3add9.png'
}, {
  name: 'BSH Project Model List',
  shname: 'bshPrj',
  desc: 'Get list of models under a project',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'project_api_key',
    shortName: 'projApiK',
    desc: 'project_api_key',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'to_html',
    shortName: 'models_',
    desc: 'list of models under a project'
  }, {
    type: 'str',
    name: 'to_json',
    shortName: 'models_',
    desc: 'list of models under a project'
  }, {
    type: 'str',
    name: 'to_text',
    shortName: 'models_',
    desc: 'list of models under a project'
  }, {
    name: 'log_',
    shortName: 'undefined'
  }],
  color: '#0D6BA6',
  backgroundImage: ''
}, {
  name: 'BSH Model Commits',
  shname: 'bshModelCommits',
  desc: 'Access a model commit',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'project_api_key',
    shortName: 'project_api_key',
    desc: 'project_api_key',
    default_value: 'null'
  }, {
    name: 'model_api_key',
    shortName: 'model_api_key',
    desc: 'model_api_key',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'model_list_',
    shortName: 'model_list_',
    desc: 'model_list_'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#0D6BA6',
  backgroundImage: ''
}, {
  name: 'BSH Run',
  shname: 'bsh_run',
  desc: 'Run simulation job',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'project_api_key',
    shortName: 'api_key',
    desc: '',
    default_value: 'null'
  }, {
    name: 'file_dir',
    shortName: '_idf',
    desc: 'energyPlusfile',
    default_value: 'null'
  }, {
    name: 'epw_file',
    shortName: '_epw',
    desc: 'weather data file',
    default_value: 'null'
  }, {
    name: 'unit',
    shortName: 'unit',
    desc: 'unit either "ip" or "si" default "ip"',
    default_value: 'ip'
  }, {
    name: 'track',
    shortName: 'track',
    desc: 'Track the simulaiton? true or flase, default false',
    default_value: 'false'
  }, {
    name: 'agent',
    shortName: 'agent',
    desc: 'Number of CPU threads',
    default_value: '1'
  }, {
    name: 'request_time',
    shortName: 'reqTime',
    desc: 'undefined',
    default_value: '5'
  }],
  outputList: [{
    type: 'str',
    name: 'results',
    shortName: 'results',
    desc: 'undefined'
  }, {
    type: 'str',
    name: 'log_',
    shortName: 'log',
    desc: 'log'
  }],
  color: '#0D6BA6',
  backgroundImage: ''
}, {
  name: 'BSH 3D Viewer',
  shname: '',
  desc: 'track_token',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'project_api_key',
    shortName: 'projApiKey',
    desc: 'project_api_key',
    default_value: 'null'
  }, {
    name: 'model_ap_key',
    desc: 'model_ap_key',
    default_value: 'null',
    shortName: 'modelApiKey'
  }],
  outputList: [{
    type: 'str',
    name: 'json_object',
    shortName: 'json_object',
    desc: 'json_object'
  }, {
    type: 'str',
    name: 'project_api_key',
    shortName: 'project_api_key',
    desc: 'project_api_key'
  }, {
    type: 'str',
    name: 'project_tracking',
    shortName: 'project_tracking',
    desc: 'project_tracking'
  }, {
    type: 'str',
    name: 'log',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#0D6BA6',
  backgroundImage: ''
}, {
  name: 'Draw 3d Model',
  shname: '',
  desc: '',
  type: 'component',
  dftype: 'shlow',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'tracking',
    shortName: 'tracking',
    desc: 'tracking',
    default_value: 'null'
  }],
  outputList: [{
    name: '3d_link',
    shortName: '3d_link',
    desc: 'open the 3d geometry in new window'
  }, {
    name: 'log',
    shortName: 'log',
    desc: 'log'
  }],
  color: '#0D6BA6',
  backgroundImage: ''
}, {
  name: 'BSH Get Model Details',
  shname: 'ModelDetails',
  desc: 'Retrieves model info and simulation results.',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'project_api_key',
    shortName: 'project_api_key',
    desc: '',
    default_value: 'null'
  }, {
    name: 'track_token',
    shortName: 'track_token',
    desc: '',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'help_',
    shortName: 'help_',
    desc: 'help_'
  }, {
    type: 'str',
    name: 'get_design_day_condition',
    shortName: 'get_design_day_condition',
    desc: 'get_design_day_condition'
  }, {
    type: 'str',
    name: 'zone_list',
    shortName: 'zone_list',
    desc: 'zone_list'
  }, {
    type: 'str',
    name: 'zone_names',
    shortName: 'zone_names',
    desc: 'zone_names'
  }, {
    name: 'bldg_orientation',
    shortName: 'bldg_orientation',
    desc: 'bldg_orientation'
  }, {
    name: 'num_above_ground_floor',
    shortName: 'num_above_ground_floor',
    desc: 'num_above_ground_floor'
  }, {
    name: 'num_total_floor',
    shortName: 'num_total_floor',
    desc: 'num_total_floor'
  }, {
    name: 'num_zones',
    shortName: 'num_zones',
    desc: 'num_zones'
  }, {
    name: 'num_condition_zones',
    shortName: 'num_condition_zones',
    desc: 'num_condition_zones'
  }, {
    name: 'condition_floor_area',
    shortName: 'condition_floor_area',
    desc: 'condition_floor_area'
  }, {
    name: 'gross_floor_area',
    shortName: 'gross_floor_area',
    desc: 'gross_floor_area'
  }, {
    name: 'window_wall_ratio',
    shortName: 'window_wall_ratio',
    desc: 'window_wall_ratio'
  }, {
    name: 'zone_load',
    shortName: 'zone_load',
    desc: 'zone_load'
  }, {
    name: 'download_model',
    shortName: 'download_model',
    desc: 'download_model'
  }, {
    name: 'hourly_data',
    shortName: 'hourly_data',
    desc: 'hourly_data'
  }, {
    name: 'log_',
    desc: 'log_',
    shortName: 'log_'
  }],
  color: '#2A2B4A',
  backgroundImage: ''
}, {
  name: 'BSH Parametric Study',
  shname: 'parametric_study',
  desc: '',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'project_api_key',
    shortName: 'project_api_key',
    desc: 'project_api_key',
    default_value: 'null'
  }, {
    name: 'file_dir',
    shortName: 'file_dir',
    desc: 'file_dir',
    default_value: 'null'
  }, {
    name: 'bldg_orientation',
    shortName: 'bldg_orientation',
    desc: 'bldg_orientation',
    default_value: 'null'
  }, {
    name: 'cooling_all_cop',
    shortName: 'cooling_all_cop',
    desc: 'cooling_all_cop',
    default_value: 'null'
  }, {
    name: 'cooling_chiller_cop',
    shortName: 'cooling_chiller_cop',
    desc: 'cooling_chiller_cop',
    default_value: 'null'
  }, {
    name: 'cooling_coil_cop',
    shortName: 'cooling_coil_cop',
    desc: 'cooling_coil_cop',
    default_value: 'null'
  }, {
    name: 'daylit_sensor',
    shortName: 'daylit_sensor',
    desc: 'daylit_sensor',
    default_value: 'null'
  }, {
    name: 'demand_control',
    shortName: 'demand_control',
    desc: 'demand_control',
    default_value: 'null'
  }, {
    name: 'equipment_epd',
    shortName: 'equipment_epd',
    desc: 'equipment_epd',
    default_value: 'null'
  }, {
    name: 'equipment_epd_percent',
    shortName: 'equipment_epd_percent',
    desc: 'equipment_epd_percent',
    default_value: 'null'
  }, {
    name: 'heating_dx_efficiency',
    shortName: 'heating_dx_efficiency',
    desc: 'heating_dx_efficiency',
    default_value: 'null'
  }, {
    name: 'heating_efficiency',
    shortName: 'heating_efficiency',
    desc: 'heating_efficiency',
    default_value: 'null'
  }, {
    name: 'heat_recovery',
    shortName: 'heat_recovery',
    desc: 'heat_recovery',
    default_value: 'null'
  }, {
    name: 'hvac_template',
    shortName: 'hvac_template',
    desc: 'hvac_template',
    default_value: 'null'
  }, {
    name: 'infiltration',
    shortName: 'infiltration',
    desc: 'infiltration',
    default_value: 'null'
  }, {
    name: 'light_lpd',
    shortName: 'light_lpd',
    desc: 'light_lpd',
    default_value: 'null'
  }, {
    name: 'light_lpd_percent',
    shortName: 'light_lpd_percent',
    desc: 'light_lpd_percent',
    default_value: 'null'
  }, {
    name: 'occupancy_sensor',
    shortName: 'occupancy_sensor',
    desc: 'occupancy_sensor',
    default_value: 'null'
  }, {
    name: 'roof_rvalue',
    shortName: 'roof_rvalue',
    desc: 'roof_rvalue',
    default_value: 'null'
  }, {
    name: 'roof_solar_absorption',
    shortName: 'roof_solar_absorption',
    desc: 'roof_solar_absorption',
    default_value: 'null'
  }, {
    name: 'shade_fin',
    shortName: 'shade_fin',
    desc: 'shade_fin',
    default_value: 'null'
  }, {
    name: 'shade_overhang',
    shortName: 'shade_overhang',
    desc: 'shade_overhang',
    default_value: 'null'
  }, {
    name: 'wall_rvalue',
    shortName: 'wall_rvalue',
    desc: 'wall_rvalue',
    default_value: 'null'
  }, {
    name: 'water_heater_efficiency',
    shortName: 'water_heater_efficiency',
    desc: 'water_heater_efficiency',
    default_value: 'null'
  }, {
    name: 'water_use_reduction',
    shortName: 'water_use_reduction',
    desc: 'water_use_reduction',
    default_value: 'null'
  }, {
    name: 'window_shgc',
    shortName: 'window_shgc',
    desc: 'window_shgc',
    default_value: 'null'
  }, {
    name: 'window_uvalue',
    shortName: 'window_uvalue',
    desc: 'window_uvalue',
    default_value: 'null'
  }, {
    name: 'window_wall_ratio',
    shortName: 'window_wall_ratio',
    desc: 'window_wall_ratio',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'help_',
    shortName: 'help_',
    desc: 'help_'
  }, {
    type: 'str',
    name: 'result_project_api_key',
    shortName: 'result_project_api_key',
    desc: 'result_project_api_key'
  }, {
    type: 'str',
    name: 'result_track_token',
    shortName: 'result_track_token',
    desc: 'result_track_token'
  }, {
    type: 'str',
    name: 'result',
    shortName: 'result',
    desc: 'result'
  }, {
    type: 'plot',
    name: 'plot_',
    shortName: 'plot_',
    desc: 'plot results'
  }, {
    type: 'str',
    name: 'log_',
    shortName: 'log_',
    desc: 'log_'
  }],
  color: '#0D6BA6',
  backgroundImage: ''
}, {
  name: 'BSH Spatial Representation',
  shname: 'SpatialRepr',
  desc: '',
  type: 'component',
  dftype: 'dp',
  category: 'BuildSimHub',
  subcategory: '',
  inputList: [{
    name: 'file_dir',
    shortName: 'file_dir',
    desc: 'file_dir',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'help_',
    shortName: 'help_',
    desc: 'help_'
  }, {
    name: 'spatial_vis',
    shortName: 'spatial_vis',
    desc: 'spatial_vis'
  }, {
    name: 'log_',
    shortName: 'log_',
    desc: 'log_'
  }],
  color: '#2980B9',
  backgroundImage: ''
}, {
  name: 'get OsiSoft',
  shname: 'get OsiSoft',
  desc: 'get data from a url',
  type: 'component',
  dftype: 'dp',
  category: 'OsiSoft',
  subcategory: 'Reader',
  inputList: [{
    name: 'url',
    shortName: 'url',
    desc: 'url',
    default_value: 'null'
  }, {
    name: 'start_time',
    shortName: 'st',
    desc: 'time range',
    default_value: '-12h'
  }, {
    name: 'end_time',
    shortName: 'et',
    desc: 'end time',
    default_value: '*'
  }],
  outputList: [{
    type: 'str',
    name: 'output_',
    shortName: 'output_',
    desc: 'data'
  }, {
    name: 'log_',
    shortName: 'log_',
    desc: 'log'
  }],
  color: '#0B2240',
  backgroundImage: ''
}, {
  name: 'Get Data Tree',
  shname: 'getDTr',
  desc: '',
  type: 'component',
  dftype: 'dp',
  category: 'OsiSoft',
  subcategory: '',
  inputList: [{
    name: 'url',
    shortName: 'url',
    desc: 'Parent Url',
    default_value: 'null'
  }, {
    name: 'tree_depth',
    shortName: 'treeD',
    desc: 'The depth of the search tree (int)',
    default_value: '2'
  }],
  outputList: [{
    type: 'str',
    name: 'json_output',
    shortName: 'output_',
    desc: 'Json output object representing the tree. '
  }, {
    type: 'float',
    name: 'log_',
    shortName: 'log',
    desc: 'State log. '
  }],
  color: '#27313c',
  backgroundImage: ''
}, {
  name: 'OSI Get Data List',
  shname: 'getDList',
  desc: 'Main function to get the list of nodes of different levels. Arguments: url {string} -- url to the piwebapi asset server',
  type: 'component',
  dftype: 'dp',
  category: 'OsiSoft',
  subcategory: '',
  inputList: [{
    name: 'url',
    shortName: 'url',
    desc: 'osisoft url input address',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'json_output',
    shortName: 'output_',
    desc: 'json object output'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#27313c',
  backgroundImage: ''
}, {
  name: 'OSI Get Attribute',
  shname: 'osi_getAttribute',
  desc: '',
  type: 'component',
  dftype: 'dp',
  category: 'OsiSoft',
  subcategory: '',
  inputList: [{
    name: 'web_id',
    shortName: 'webId',
    desc: 'the element web_id',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'attribute',
    shortName: 'attr',
    desc: 'the retreived attribute'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#27313c',
  backgroundImage: ''
}, {
  name: 'OSI Start Time',
  shname: 'starttime',
  desc: '{"Last_1_hours":"-1h","Last_6_hours":"-6h","Last_12_hours":"-12h","Last_24_hours":"-24h","Last_7_days":"-7d","Last_15_days":"-15d","Last_30_days":"-30d","This_Year":"01/01"}',
  type: 'optionList',
  dftype: 'shlow',
  category: 'OsiSoft',
  subcategory: '',
  inputList: [{
    name: 'inupt',
    default_value: 'null',
    shortName: 'in',
    desc: 'none'
  }],
  outputList: [{
    name: 'output',
    shortName: 'out',
    desc: 'null'
  }],
  color: '#2c3e50',
  backgroundImage: ''
}, {
  name: 'OSI End Time',
  shname: 'osi_endTime',
  desc: '{"Now":"*","Last_1_hours":"*-1h","Last_6_hours":"*-6h","Last_12_hours":"*-12h","Last_24_hours":"*-24h","Last_7_days":"*-7d","Last_15_days":"*-15d", "Last_30_days":"*-30d"}',
  type: 'optionList',
  dftype: 'shlow',
  category: 'OsiSoft',
  subcategory: '',
  inputList: [{
    name: 'inupt',
    default_value: 'null',
    shortName: 'in',
    desc: 'none'
  }],
  outputList: [{
    name: 'output',
    shortName: 'out',
    desc: 'null'
  }],
  color: '#2c3e50',
  backgroundImage: ''
}, {
  name: 'OSI Extract TimeSeries Data',
  shname: 'timeSeriesData',
  desc: 'Extract timeseries data from a record',
  type: 'component',
  dftype: 'shlow',
  category: 'OsiSoft',
  subcategory: '',
  inputList: [{
    name: 'input_data',
    shortName: 'in',
    default_value: 'null'
  }],
  outputList: [{
    name: 'help_',
    shortName: 'help',
    type: 'html'
  }, {
    name: 'plot_',
    shortName: 'plot',
    type: 'str'
  }, {
    name: 'to_html',
    shortName: 'to_html',
    desc: 'to_html'
  }, {
    name: 'to_dict',
    shortName: 'to_dict',
    desc: 'dictionary'
  }, {
    name: 'time_stamps',
    shortName: 'time_stamp',
    desc: 'time_stamp'
  }, {
    name: 'data',
    shortName: 'data',
    desc: 'data'
  }, {
    name: 'log_',
    shortName: 'log',
    desc: 'output log'
  }],
  color: '#e67e22',
  backgroundImage: ''
}, {
  name: 'PANDAS DataFrame',
  shname: 'pd_dataFrame',
  desc: '',
  type: 'component',
  dftype: 'dp',
  category: 'Pandas',
  subcategory: '',
  inputList: [{
    name: 'read_csv',
    shortName: 'read_csv',
    default_value: 'null'
  }, {
    name: 'from_dictionary',
    shortName: 'from_dictionary',
    desc: 'from_dictionary',
    default_value: 'null'
  }, {
    name: 'from_items',
    shortName: 'from_items',
    desc: 'from_items',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'help_',
    shortName: 'help_',
    desc: 'help_'
  }, {
    type: 'str',
    name: 'describe',
    shortName: 'desc',
    desc: 'to_html'
  }, {
    type: 'str',
    name: 'to_html',
    shortName: 'to_html',
    desc: 'to_html'
  }, {
    type: 'str',
    name: 'to_text',
    shortName: 'to_text',
    desc: 'to_text'
  }, {
    name: 'to_latex',
    shortName: 'to_latex',
    desc: 'to_latex'
  }, {
    name: 'to_dict',
    shortName: 'to_dict',
    desc: 'to_dict'
  }, {
    name: 'log_',
    shortName: 'log_',
    desc: 'log_'
  }],
  color: '#2A2B4A',
  backgroundImage: ''
}, {
  name: 'String To List',
  shname: 'str2list',
  desc: 'Converts a list-like string into a list object.',
  type: 'component',
  dftype: 'shlow',
  category: 'String Operations',
  subcategory: 'Lists',
  inputList: [{
    name: 'inputString',
    shortName: '_str',
    desc: 'list-like string',
    default_value: '[0, 1, 2]'
  }],
  outputList: [{
    type: 'html',
    name: 'help_',
    shortName: 'h',
    desc: 'help'
  }, {
    type: 'list',
    name: 'list_',
    shortName: 'lst_',
    desc: 'list object'
  }, {
    type: 'str',
    name: 'log_',
    shortName: 'log',
    desc: 'output debugging log ... '
  }],
  color: '#F23322',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/9c0712eb82084d33af0519131126d0e7.png'
}, {
  name: 'Replace',
  shname: 'replace',
  desc: '',
  type: 'component',
  dftype: 'shlow',
  category: 'String Operations',
  subcategory: '',
  inputList: [{
    name: 'main_text',
    shortName: 'main_text',
    desc: 'main_text',
    default_value: 'null'
  }, {
    name: 'old_string',
    shortName: 'old_string',
    desc: 'old_string',
    default_value: 'null'
  }, {
    name: 'new_string',
    shortName: 'new_string',
    desc: 'new_string',
    default_value: 'null'
  }],
  outputList: [{
    type: 'str',
    name: 'help_',
    shortName: 'h',
    desc: 'help'
  }, {
    type: 'str',
    name: 'new_text',
    shortName: 'new_text',
    desc: 'the output text'
  }, {
    type: 'str',
    name: 'log',
    shortName: 'log',
    desc: 'log output'
  }],
  color: '#7FA696',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/c5571f6199314a3daf2186534a545b13.png'
}];
const tabIdMapping = {
  Basic: 'div.toolbarbuttonsContainer.Basic',
  BuildSimHub: 'div.toolbarbuttonsContainer.BSH',
  OsiSoft: 'div.toolbarbuttonsContainer.Osi',
  Pandas: 'div.toolbarbuttonsContainer.Pandas',
  'String Operations': 'div.toolbarbuttonsContainer.StringOps'
};
const toggleButtonInfo = [{
  name: 'Basic',
  id: 'Basic',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/7e35adc61ca94a94b72d205029bbaf55.png'
}, {
  name: 'BuildSimHub',
  id: 'BSH',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/builsimhub.png'
}, {
  name: 'OsiSoft',
  id: 'Osi',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/osisoft.png'
}, {
  name: 'Pandas',
  id: 'Pandas',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/958e37827b33418ea03f1e9875c7aa39.png'
}, {
  name: 'String Operations',
  id: 'StringOps',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/00cebc445ced4d8d89cf842609040d43.png'
}, {
  name: 'Main Inputs',
  id: 'Input',
  backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/input.png'
}];

function addGenericComponentIcon() {
  for (var index = 0; index < details.length; index++) {
    var currInfo = details[index];
    var outputNameList = currInfo.outputList.map(function (elem) {
      return elem.name;
    });
    var newComp = addNewComponentIcon(this, 'addComp', currInfo.name, currInfo.shname, currInfo.desc, currInfo.type, currInfo.dftype, 'mainButtonItem 1 1 tooltip ', currInfo.backgroundImage, currInfo.inputList, outputNameList, currInfo.color);
    $__default['default'](tabIdMapping[currInfo.category]).append(newComp);
  }
}

function addNewComponentIcon(reactContext, id, name, shname, desc, type, dftype, className, imageUrl, inputList, outputList, color) {
  var newCompString = '<div id="' + id + '" name="' + name + '" shname="' + shname + '" desc="' + desc + '" type="' + type + '" dftype="' + dftype + '" class="' + className + '" style="background-image:url(' + imageUrl + ')">' + '<p class="iconText">' + (imageUrl === "" ? name : "") + '</p>' + '<span class="tooltiptext" id="hintx">' + name + '</span>' + '</div>';
  var newComp = $__default['default'](newCompString);
  newComp.on('click', function () {
    if (type === 'component') {
      var kwargs = {
        shortName: shname,
        dfType: dftype
      };
      CreateNewComponent(reactContext, null, name, kwargs, inputList, outputList, color);
    } else if (type === 'optionList') {
      CreateNewOptionList(reactContext, null, desc);
    }
  });
  return newComp;
}

function addRightToggleButton() {
  var parentDiv = $__default['default']('div.toolbarRightToggleNavigator.1');

  var _loop = function _loop(index) {
    var currBtn = toggleButtonInfo[index];
    var newToggleString = '<div class="rightToggleButton 1" style="background-image:url(' + currBtn.backgroundImage + '"><span id="hint">' + currBtn.name + '</span></div>';
    var newToggle = $__default['default'](newToggleString);
    newToggle.on('click', function () {
      setCurrentCategory('componentTab', currBtn.id, currBtn.name);
    });
    parentDiv.append(newToggle);
  };

  for (var index = 0; index < toggleButtonInfo.length; index++) {
    _loop(index);
  }
}

function setCurrentCategory(panel_id, id, name) {
  var toolbarbuttonsContainer = $__default['default']('div.toolbarbuttonsContainer.' + panel_id);

  for (var i = 0; i < toolbarbuttonsContainer.length; i++) {
    if (toolbarbuttonsContainer[i].classList[2] === id) {
      $__default['default']('div.toolbarbuttonsContainer.' + panel_id + '.' + id).show();
      $__default['default']('span.currentTab.' + panel_id).text(name);
    } else {
      $__default['default']('div.toolbarbuttonsContainer.' + panel_id + '.' + toolbarbuttonsContainer[i].classList[2]).hide();
    }
  }
}

/**
 * Adds a new user defined object. This function is called in componentDidMount in the main Canvas
 * @param {String} name the component's name
 * @param {String} shname the component's short name
 * @param {String} desc the component's description
 * @param {String} type the component's type (must be Component/OptionList/String)
 * @param {String} dftype the component's depth type (must be shlow or dp)
 * @param {String} category the component's category (must be either Basic/BuildSimHub/OsiSoft/Pandas/String Operations)
 * @param {List} inputList the component's input list. It is a list of dictionary. "name" attribute is compulsory, 
 * other attributes such as short name, description, input type and default value are optional
 * @param {List} outputList the component's output list. It is a list of dictionary. "name" attribute is compulsory, 
 * other attributes such as short name and description are optional
 * @param {String} color the component's color in hex code. The default color is #F23322 (orange)
 * @param {String} backgroundImage the URL of the component's icon in the left property bar. This field is optional.
 * @param {Function} calledFunc the corresponding function for that component.
 */

var typeList = ['component', 'optionList', 'string'];
var dftypeList = ['shlow', 'dp'];
var categoryList = ['Basic', 'BuildSimHub', 'OsiSoft', 'Pandas', 'String Operations'];

function addNewUdo(name, shname, desc, type, dftype, category, inputList, outputList) {
  var color = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "#F23322";
  var backgroundImage = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "";
  var calledFunc = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : undefined;

  //check requirements
  if (typeList.includes(type) && dftypeList.includes(dftype) && categoryList.includes(category)) {
    var nameCheck = true;

    for (var index = 0; index < inputList.length; index++) {
      var element = inputList[index];

      if (element.name === undefined) {
        nameCheck = false;
        break;
      }
    }

    for (var _index = 0; _index < outputList.length; _index++) {
      var _element = outputList[_index];

      if (_element.name === undefined) {
        nameCheck = false;
        break;
      }
    }

    if (nameCheck) {
      var newComp = {
        name: name,
        shname: shname,
        desc: desc,
        type: type,
        dftype: dftype,
        category: category,
        inputList: inputList,
        outputList: outputList,
        color: color,
        backgroundImage: backgroundImage
      };
      details.push(newComp);

      if (calledFunc !== undefined) {
        if (dftype === 'shlow') {
          shallow_functions[name] = calledFunc;
        }
      }
    } else {
      console.log('All elements in input and output list must have "name" attribute');
    }
  } else {
    console.log("Check the type/dftype/category again");
  }
}
/**
 * Take a list of components that are passed by props and append all of them to the database
 * @param {List} list a list of dictionary, containing the information about the components
 */


function addAllUdo(list) {
  if (list !== undefined) {
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      var name = element.name;
      var shname = element.shname;
      var desc = element.desc;
      var type = element.type;
      var dftype = element.dftype;
      var category = element.category;
      var inputList = element.inputList;
      var outputList = element.outputList;
      var color = element.color === undefined ? '#F23322' : element.color;
      var backgroundImage = element.backgroundImage === undefined ? '' : element.backgroundImage;
      var calledFunc = element.func;
      addNewUdo(name, shname, desc, type, dftype, category, inputList, outputList, color, backgroundImage, calledFunc);
    }
  }
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* Copy from newUIstyle_light.css*/\r\nbody {\r\n    -webkit-user-select: none;\r\n    -khtml-user-select: none;\r\n    -moz-user-select: none;\r\n    -o-user-select: none;\r\n    user-select: none;\r\n    overflow-y: hidden; /* Hide vertical scrollbar */\r\n    overflow-x: hidden;\r\n}\r\n\r\nsvg {\r\n    border: solid 1px #565656;\r\n}\r\n\r\n#checks {\r\n    margin: 10px;\r\n}\r\n\r\ntext {\r\n    pointer-events: none;\r\n    user-select: none;\r\n    font-size: small;\r\n    font-family: 'ubuntu mono';\r\n}\r\n\r\n.nodeLog {\r\n    font-size: small;\r\n    font-family: monospace;\r\n    pointer-events: none;\r\n}\r\n\r\ninput:focus,\r\nselect:focus,\r\ntextarea:focus,\r\nbutton:focus {\r\n    outline: none;\r\n}\r\n\r\nrect:focus {\r\n    outline: none;\r\n}\r\n\r\n.output {\r\n    font-family: monospace;\r\n    font-size: small;\r\n    color: white;\r\n}\r\n\r\n.input {\r\n    font-family: monospace;\r\n    font-size: small;\r\n}\r\n\r\n.nodetitle {\r\n    font-family: 'ubuntu mono';\r\n    font-size: 13px;\r\n    font-weight: bold;\r\n    color: white;\r\n    pointer-events: none;\r\n    text-align: center;\r\n}\r\n\r\ndiv#someData {\r\n    padding: 8px;\r\n    padding-top: 25px;\r\n    font-size: x-small;\r\n    font-family: monospace;\r\n}\r\n\r\ncircle {\r\n    cursor: pointer;\r\n}\r\n\r\ndiv#PropertiesBarSelector {\r\n    width: 4px;\r\n    position: fixed;\r\n    right: 501px;\r\n    background-color: #000000;\r\n    height: 100%;\r\n    top: 0px;\r\n    cursor: ew-resize;\r\n}\r\n\r\ndiv#PropertiesBar {\r\n    background-color: #2b3d50;\r\n    right: 0px;\r\n    top: 0px;\r\n    min-height: 35%;\r\n    transition-timing-function: ease-in-out;\r\n    transition: height 2s;\r\n    transition-delay: 1s;  \r\n    width: 220px;\r\n    top: 60px;\r\n    padding-left: 5px;\r\n    padding-top: 5px;\r\n}\r\n\r\ndiv#mainGrid {\r\n    position: relative;\r\n    top: 0px;\r\n    left: 0px;\r\n    background-color: #ececec;\r\n}\r\n\r\ndiv#textAreaBox {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    opacity: 0.8;\r\n}\r\n\r\ndiv#optionlistBox {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    opacity: 0.8;\r\n}\r\n\r\nselect#optionListSelectItems {\r\n    background: white;\r\n    opacity: 1;\r\n    font-family: monospace;\r\n    font-weight: bold;\r\n    border: 1px solid black;\r\n    border-radius: 3px;\r\n}\r\n\r\nh5 {\r\n    font-family: monospace;\r\n    margin-top: 1px;\r\n    margin-bottom: 4px;\r\n    text-align: center;\r\n}\r\n\r\ndiv#LeftPropertiesBar {\r\n    width: 200px;\r\n    position: fixed;\r\n    background-color: #2b3d50;\r\n    left: 0px;\r\n    top: 0px;\r\n}\r\n\r\n.additionalData {\r\n    border-radius: 7px;\r\n    font-size: x-small;\r\n    width: 222px;\r\n    background-color: #ffffff47;\r\n    font-family: monospace;\r\n    color: #5d5d5d;\r\n    padding: 3px;\r\n    border: none;\r\n}\r\n\r\ndiv#LeftPropertiesBarSelector {\r\n    width: 5px;\r\n    height: 100%;\r\n    display: none;\r\n    position: fixed;\r\n    left: 200px;\r\n    background-color: #252525;\r\n    top: 0px;\r\n    cursor: ew-resize;\r\n}\r\n\r\ndiv#TopPropertiesBar {\r\n    position: fixed;\r\n    top: 0px;\r\n    left: 0px;\r\n    width: 100%;\r\n    height: 30px;\r\n    background-color: #e6e6e6;\r\n}\r\n\r\ndiv#TopPropertiesBarSelector {\r\n    height: 2px;\r\n    width: 100%;\r\n    position: fixed;\r\n    left: 0px;\r\n    border-bottom: 1px solid #858585;\r\n    top: 47px;\r\n    cursor: ns-resize;\r\n}\r\n\r\nbutton.menubarButtons {\r\n    background-color: #6d6d6d;\r\n    border: none;\r\n    cursor: pointer;\r\n    color: #444444;\r\n    color: #cacaca;\r\n    font-family: 'Poppins', sans-serif;\r\n}\r\n\r\nbutton.menubarButtons:hover {\r\n    background-color: #aaabaa;\r\n}\r\n\r\ndiv#DefName {\r\n    width: 100%;\r\n    height: 32px;\r\n    padding: 0px 0px;\r\n    background: #2b3d50;\r\n    border-bottom: 1px solid #434343;\r\n}\r\n\r\ndiv#BottomPropertiesBar {\r\n    position: fixed;\r\n    bottom: 0px;\r\n    height: 20px;\r\n    left: 0px;\r\n    border-top: 1px solid #757575;\r\n    box-shadow: 0px -1px 0px #313131;\r\n    background-color: #525252;\r\n    background: linear-gradient(180deg, rgba(96, 96, 96, 1) 0%, rgba(82, 82, 82, 1) 100%);\r\n    width: 100%;\r\n}\r\n\r\na#changeTitleName {\r\n    color: #cfd8dc;\r\n    text-decoration: none;\r\n}\r\n\r\n.ccbody {\r\n    width: 100%;\r\n}\r\n\r\n.ccatheader {\r\n    padding: 0px 3px;\r\n    font-family: 'Ubuntu', sans-serif;\r\n    font-size: small;\r\n    /* border: 1px solid #2c67a5; */\r\n    color: #e7e7e7;\r\n    padding: 4px;\r\n    cursor: pointer;\r\n    overflow: hidden;\r\n}\r\n\r\nbutton.standardcat.button {\r\n    vertical-align: middle;\r\n    border: 1px solid #444444;\r\n    width: 32px;\r\n    height: 32px;\r\n    margin: 1px;\r\n    background: none;\r\n    background: -moz-linear-gradient(top, #d6d4d4 0%, #adadad 100%);\r\n    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#d6d4d4', endColorstr='#adadad', GradientType=0);\r\n    font-family: 'Ubuntu', sans-serif;\r\n    font-size: x-small;\r\n    color: #ffffff;\r\n    cursor: pointer;\r\n    display: inline-grid;\r\n}\r\n\r\ndiv#topLeftLogo {\r\n    width: 27px;\r\n    height: 32px;\r\n    float: left;\r\n    background-image: url(https://user-images.githubusercontent.com/6969514/70302709-af822a80-1838-11ea-913b-5f935ea282ed.png);\r\n    background-repeat: no-repeat;\r\n    background-size: 26px;\r\n    background-position: center;\r\n    cursor: pointer;\r\n}\r\n\r\ndiv#settingsIcon {\r\n    float: right;\r\n    position: fixed;\r\n    top: 0px;\r\n    color: #c5c5c5;\r\n    right: 0px;\r\n    text-align: center;\r\n    padding: 11px;\r\n}\r\n\r\nbutton.standardcat.button:hover {\r\n    background: #c1c1c1;\r\n}\r\n\r\ndiv#Addedmessage {\r\n    font-family: monospace;\r\n    color: white;\r\n    padding: 2px;\r\n}\r\n\r\n#minimizeUpperBar {\r\n    width: 36px;\r\n    text-align: center;\r\n    background-color: #2b3d50;\r\n    position: absolute;\r\n    top: 0px;\r\n    right: 0px;\r\n    height: 16px;\r\n    border-radius: 0px 0px 2px 2px;\r\n    color: #c5c5c5;\r\n    cursor: pointer;\r\n    border-left: 1px solid #464646;\r\n    border-bottom: 1px solid #464646;\r\n    margin-top: -4px;\r\n}\r\n\r\ndiv#maximizeUpperBar {\r\n    width: 36px;\r\n    text-align: center;\r\n    background-color: #5d5d5d;\r\n    position: absolute;\r\n    top: 38px;\r\n    right: 0px;\r\n    height: 16px;\r\n    border-radius: 0px 0px 2px 2px;\r\n    color: #ababab;\r\n    cursor: pointer;\r\n    margin-top: -4px;\r\n    text-shadow: 1px 1px 1px #4b4b4b;\r\n}\r\n\r\n.propertiesbar.title {\r\n    font-family: 'Ubuntu', sans-serif;\r\n    font-size: small;\r\n    margin: 0px;\r\n    padding: 3px;\r\n}\r\n\r\n.propertiesbarheader.title {\r\n    font-family: 'Ubuntu', sans-serif;\r\n    font-size: small;\r\n    margin: 0px;\r\n    padding: 3px;\r\n}\r\n\r\n.propertiesbar.label {\r\n    font-family: 'Ubuntu', sans-serif;\r\n    font-size: small;\r\n    width: 98%;\r\n    color: #2f2f2f;\r\n    padding: 3px 10px;\r\n    background-color: gray;\r\n    border-bottom: 1px solid #909090;\r\n    border-radius: 6px 6px 0px 0px;\r\n    text-shadow: 1px 1px 0px #a5a5a5;\r\n}\r\n\r\ntextarea.textarea.optionlistProperties {\r\n    width: 98%;\r\n    font-family: 'Ubuntu Mono', monospace;\r\n    height: 150px;\r\n    border-radius: 0px 0px 6px 6px;\r\n    border: 1px solid gray;\r\n    background-color: gainsboro;\r\n}\r\n\r\ntextarea.textarea.stringProperties {\r\n    resize: none;\r\n    width: 100%;\r\n    padding: 0px;\r\n    font-family: 'Ubuntu Mono', monospace;\r\n    min-height: 10vh;\r\n    border: none;\r\n    border-radius: 3px;\r\n    background-color: #ffffffc7;\r\n}\r\n\r\n.propertiesbarheader.label {\r\n    font-family: 'Ubuntu', sans-serif;\r\n    font-size: small;\r\n    font-weight: bold;\r\n    width: 100%;\r\n    color: #bcbcbc;\r\n    padding: 3px;\r\n}\r\n\r\nselect#propertisBarSelecId {\r\n    width: 99%;\r\n    padding: 1px 2px;\r\n    background-color: gainsboro;\r\n    border-radius: 0px 0px 6px 6px;\r\n}\r\n\r\ndiv#propertiesBarLog {\r\n    width: 100%;\r\n    font-family: 'Ubuntu Mono', monospace;\r\n    font-size: small;\r\n    padding: 2px;\r\n}\r\n\r\nrect.optionListoption {\r\n    cursor: pointer;\r\n}\r\n\r\nrect.optionListoption:hover {\r\n    fill: #d9e3e6;\r\n    stroke: #989898;\r\n}\r\n\r\ndiv#error {\r\n    color: #c0392b;\r\n    padding: 8px;\r\n}\r\n\r\nforeignObject.textbody {\r\n    font-family: 'ubuntu mono', monospace;\r\n    font-size: x-small;\r\n    color: #4e4e4e;\r\n    overflow: auto;\r\n}\r\n\r\ndiv#catHead {\r\n    font-family: 'ubuntu';\r\n    font-size: small;\r\n    width: fit-content;\r\n    padding: 2px 6px;\r\n    color: white;\r\n    font-weight: bold;\r\n    margin-top: 5px;\r\n    margin-left: 3px;\r\n}\r\n\r\ndiv#catbody {\r\n    margin: 0px;\r\n    border-bottom: none;\r\n    border-right: none;\r\n}\r\n\r\ndiv#catcard {\r\n    margin-bottom: 4px;\r\n    padding: 0px;\r\n}\r\n\r\nrect.xAnchor {\r\n    cursor: ew-resize;\r\n}\r\n\r\nrect.yAnchor {\r\n    cursor: ns-resize;\r\n}\r\n\r\nrect.xyAnchor {\r\n    cursor: nwse-resize;\r\n}\r\n\r\n/* ::-webkit-scrollbar {\r\n    width: 6px;\r\n    height: 10px;\r\n} */\r\n\r\n/* Track */\r\n\r\n/* ::-webkit-scrollbar-track {\r\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\r\n    -webkit-border-radius: 4px;\r\n    border-radius: 4px;\r\n    touch-action: manipulation;\r\n} */\r\n\r\n/* Handle */\r\n\r\n/* ::-webkit-scrollbar-thumb {\r\n    -webkit-border-radius: 4px;\r\n    background: rgb(0, 0, 0);\r\n}\r\n\r\n::-webkit-scrollbar-thumb:window-inactive {\r\n    background: rgba(255, 0, 0, 0.4);\r\n} */\r\n\r\npath.play {\r\n    cursor: pointer;\r\n}\r\n\r\npath.play:hover {\r\n    fill: gray;\r\n}\r\n\r\nth {\r\n    border: none;\r\n    background-color: gainsboro;\r\n}\r\n\r\ntd {\r\n    border: none;\r\n    background-color: whitesmoke;\r\n    overflow: hidden;\r\n}\r\n\r\ntbody {\r\n    font-family: ubuntu;\r\n    font-size: small;\r\n}\r\n\r\nth {\r\n    font-family: ubuntu;\r\n    text-align: left;\r\n    font-size: small;\r\n}\r\n\r\ndiv#propertiesBarContents {\r\n    font-family: 'ubuntu mono';\r\n    font-size: small;\r\n    font-weight: normal;\r\n    color: #ffffff;\r\n    margin: 2px 0px 10px 0px;\r\n}\r\n\r\nforeignObject.panel_status {\r\n    font-family: 'ubuntu mono';\r\n    font-size: x-small;\r\n    color: #afefff;\r\n    text-shadow: 1px 1px 1px #3d3d3d73;\r\n}\r\n\r\ntbody {\r\n    border: none;\r\n}\r\n\r\ntable.dataframe {\r\n    border: none;\r\n}\r\n\r\nrect {\r\n    cursor: move;\r\n}\r\n\r\ninput.stringPnanel.Name {\r\n    width: 98%;\r\n    border: none;\r\n    font-size: small;\r\n    font-family: 'ubuntu';\r\n}\r\n\r\nforeignObject.panel_edit_mode a {\r\n    font-size: x-small;\r\n    color: #bdbdbd;\r\n    font-family: 'ubuntu mono';\r\n    position: relative;\r\n    text-decoration: none;\r\n    top: -8px;\r\n}\r\n\r\ndiv#numerical_slider_container {\r\n    padding: 7px;\r\n    font-family: 'ubuntu';\r\n}\r\n\r\ndiv#help_t3 {\r\n    line-height: 1em;\r\n    color: #ec5f66;\r\n    margin-top: 5px;\r\n    margin-bottom: 3px;\r\n    font-weight: bold;\r\n}\r\n\r\ndiv#help_t4 {\r\n    color: #009688;\r\n    margin-left: 18px;\r\n    font-weight: bold;\r\n    margin-top: 5px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\ndiv#help_p {\r\n    margin-left: 36px;\r\n    margin-right: 8px;\r\n    text-align: justify;\r\n}\r\n\r\nspan#code {\r\n    color: #c23d51;\r\n    border-radius: 2px;\r\n    font-family: Courier;\r\n    font-size: xx-small;\r\n    vertical-align: middle;\r\n    padding: 1px 4px;\r\n    background-color: #32c8ac2e;\r\n}\r\n\r\ntable.dataframe {\r\n    font-size: x-small;\r\n}\r\n\r\nthead {\r\n    font-size: x-small;\r\n}\r\n\r\nth {\r\n    font-size: x-small;\r\n}\r\n\r\ntd {\r\n    font-size: x-small;\r\n}\r\n\r\nspan#errorTitle {\r\n    color: #e91e63;\r\n    font-weight: bold;\r\n    background-color: #f4433638;\r\n    border-radius: 3px;\r\n}\r\n\r\na.menubarButtons {\r\n    text-decoration: unset;\r\n    color: #000000;\r\n    text-shadow: 1px 1px 4px #4b4b4b;\r\n    font-size: small;\r\n    padding: 0px 6px;\r\n    margin: 1px 1px;\r\n    float: left;\r\n}\r\n\r\ndiv#buttonClickedname {\r\n    color: white;\r\n    font-size: small;\r\n    padding: 0px 8px;\r\n    margin: 0px;\r\n    float: left;\r\n    position: absolute;\r\n    bottom: 25px;\r\n    left: 224px;\r\n    background-color: #3d3d3d;\r\n}\r\n\r\npre {\r\n    margin: 0px;\r\n}\r\n\r\ninput.inputFileUpload {\r\n    border: none;\r\n    border-radius: 4px;\r\n    margin: 2px 2px;\r\n    background: #2b3d50;\r\n    height: 20px;\r\n    font-family: 'ubuntu mono';\r\n    color: white;\r\n}\r\n\r\ninput.submitFileUpload {\r\n    border-radius: 4px;\r\n    float: right;\r\n    margin: 3px;\r\n}\r\n\r\nforeignObject.fileUpload_status {\r\n    font-family: 'ubuntu mono';\r\n    font-size: x-small;\r\n    color: #afefff;\r\n    text-shadow: 1px 1px 1px #3d3d3d73;\r\n}\r\n\r\ninput#fileUploadFormToTheCloud {\r\n    border-radius: 1px;\r\n    margin-left: 1px;\r\n    /* height: 20px; */\r\n}\r\n\r\na.open_uploadedFile_link {\r\n    text-decoration: none;\r\n    color: black;\r\n    padding: 0px 6px;\r\n    position: relative;\r\n    top: 1px;\r\n    border-radius: 2px;\r\n    margin-left: 3px;\r\n    background-color: #e8e8e8;\r\n}\r\n\r\ndiv#TheContainedFile {\r\n    color: white;\r\n    padding: 2px 5px;\r\n    font-family: 'ubuntu';\r\n    display: inline;\r\n    font-size: small;\r\n    border-right: 1px solid gray;\r\n}\r\n\r\ndiv#PleaseWaitOverLay {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #ffffff8a;\r\n    color: black;\r\n    text-align: center;\r\n    margin: auto;\r\n    line-height: 100vh;\r\n}\r\n\r\nselect.listView {\r\n    width: 198px;\r\n    height: 179px;\r\n    background-color: #f0f0f0;\r\n    border: 1px solid gray;\r\n    border-radius: 3px;\r\n    font-family: 'ubuntu mono';\r\n    font-size: small;\r\n}\r\n\r\noption#someSelection {\r\n    background-color: #e0e0e0;\r\n    box-shadow: 0px 1px 0px white;\r\n    margin-bottom: 1px;\r\n}\r\n\r\ntext.statusTextClass {\r\n    font-size: x-small;\r\n}\r\n\r\n.subcatheader {\r\n    padding-left: 1em;\r\n    color: #ffca28;\r\n    font-size: small;\r\n    font-weight: bold;\r\n}\r\n\r\ndiv#help_quote {\r\n    border: 1px solid #cfcfcf;\r\n    padding: 2px;\r\n    border-radius: 3px;\r\n    background-color: #f4f4f4;\r\n    font-family: courier new;\r\n    font-size: xx-small;\r\n}\r\n\r\nforeignObject#halign_box {\r\n    font-size: 20px;\r\n    color: white;\r\n    text-decoration: none;\r\n    text-align: center;\r\n}\r\n\r\nforeignObject#halign_box a {\r\n    text-decoration: none;\r\n    color: #b7b7b7;\r\n    margin: 0px 4px;\r\n}\r\n\r\nforeignObject#halign_box a:hover {\r\n    text-decoration: none;\r\n    color: #ffc107;\r\n}\r\n\r\ni.fa.fa-pause {\r\n    margin-left: -1px;\r\n    padding: 0px;\r\n}\r\n\r\nforeignObject#valign_box {\r\n    font-size: 20px;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n    padding: 4px 2px;\r\n}\r\n\r\nforeignObject#valign_box a {\r\n    text-decoration: none;\r\n    color: #b7b7b7;\r\n    font-size: 20px;\r\n    display: inline-grid;\r\n}\r\n\r\nforeignObject#valign_box a:hover {\r\n    color: #ffc107;\r\n}\r\n\r\na#valign_icon {\r\n    float: left;\r\n    margin: 5px 4px;\r\n}\r\n\r\na.standardcat.button {\r\n    width: 32px;\r\n    height: 32px;\r\n    border: 1px solid black;\r\n    display: inline-grid;\r\n}\r\n\r\ndiv#leftbarcontainer {\r\n    width: 225px;\r\n    min-height: 250px;\r\n    float: left;\r\n    margin-top: 2.5px;\r\n}\r\n\r\n.toolbarTopToggleItem {\r\n    height: 25px;\r\n    display: block;\r\n    line-height: 25px;\r\n    color: #1c1c1c;\r\n    font-size: small;\r\n    float: left;\r\n}\r\n\r\n.toolbarTopToggleContainer {\r\n    width: 225px;\r\n    background-color: #aaaaaa;\r\n    height: 25px;\r\n    text-align: center;\r\n    float: left;\r\n}\r\n\r\ndiv#toolbar_container_1_1_2 {\r\n    width: 25px;\r\n    float: left;\r\n    background-color: red;\r\n    height: 25px;\r\n    text-align: center;\r\n}\r\n\r\ndiv#toolbar_container_1_2 {\r\n    background-color: #2d2d2d;\r\n    width: 225px;\r\n    height: 250px;\r\n}\r\n\r\ndiv#toolbar_container_1_2_1 {\r\n    box-sizing: border-box;\r\n    width: 200px;\r\n    background-color: #e6e6e6;\r\n    min-height: 200px;\r\n    float: left;\r\n    border: 1px solid #cfcfcf;\r\n}\r\n\r\n.mainButtonItem {\r\n    box-sizing: border-box;\r\n    width: 49.5px;\r\n    height: 49.5px;\r\n    float: left;\r\n    background-color: #6060601f;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    background-image: url(https://user-images.githubusercontent.com/6969514/70328473-107b2400-1874-11ea-88ff-dcca67fd98a9.png);\r\n    line-height: 50px;\r\n    text-align: center;\r\n    border: 1px solid #252525;\r\n    color: #ffffffed;\r\n    background-size: 36px;\r\n    font-size: x-small;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    overflow: hidden;\r\n}\r\n\r\n.mainButtonItem:hover {\r\n    overflow: visible;\r\n}\r\n\r\ndiv#toolbar_container_1_2_2 {\r\n    width: 25px;\r\n    float: left;\r\n    height: 200px;\r\n    background-color: #c1c1c1;\r\n    box-sizing: border-box;\r\n    border-right: 1px solid #373737;\r\n}\r\n\r\n.rightToggleButton {\r\n    background-image: url(https://www.corasupport.org/wp-content/uploads/2015/11/placeholder-icon-300x300-v1b.png);\r\n    background-size: 20px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    cursor: pointer;\r\n    font-size: small;\r\n    background-color: #a3a3a3;\r\n    width: 23px;\r\n    height: 23px;\r\n    text-align: center;\r\n    line-height: 25px;\r\n    border: 1px solid #2d2d2d;\r\n    border-bottom: 1px solid #565656;\r\n}\r\n\r\ndiv#toolbar_container_1_2_0 {\r\n    background-color: #707070;\r\n    font-size: small;\r\n    color: white;\r\n    line-height: 25px;\r\n    font-size: xx-small;\r\n}\r\n\r\n.mainButtonItem:hover {\r\n    background-color: #252525;\r\n    transition: 0.2s;\r\n    cursor: pointer;\r\n    border: 1px solid #818181;\r\n}\r\n\r\n.toptoggleitem {\r\n    background-color: #d1d1d1;\r\n    margin: 3px 4px 0px 0px;\r\n    height: 20px;\r\n    padding: 0px 5px;\r\n    line-height: 20px;\r\n    border: 1px solid #aaaaaa;\r\n}\r\n\r\n.toptoggleitem.selected {\r\n    background-color: #2b3d50;\r\n    border-color: #2b3d50;\r\n    color: #cfd8dc;\r\n}\r\n\r\n.rightToggleButton:hover {\r\n    background-color: #565656;\r\n    transition: 0.5s;\r\n    color: #ffffff;\r\n    border: 1px solid #cecece;\r\n}\r\n\r\n.rightToggleButton:focus {\r\n    background-color: #ffc107;\r\n    color: black;\r\n    text-shadow: 0px 0px 4px black;\r\n}\r\n\r\n.toptoggleitem:hover {\r\n    border-color: #ffc107;\r\n    cursor: pointer;\r\n}\r\n\r\ndiv#NoneTabbedToolBoxText {\r\n    position: relative;\r\n    top: 50%;\r\n    transform: rotate(-90deg);\r\n    font-size: small;\r\n    line-height: 25px;\r\n    text-shadow: 0px 0px 4px #000000;\r\n}\r\n\r\ndiv.rightToggleButton span#hint {\r\n    position: relative;\r\n    left: 30px;\r\n    padding: 0px 4px;\r\n    border-radius: 5px;\r\n    width: fit-content;\r\n    display: none;\r\n    background-color: #00000066;\r\n    border: 1px solid #565656;\r\n    opacity: 0;\r\n}\r\n\r\n.tooltip {\r\n    position: relative;\r\n    display: inline-block;\r\n    /* border-bottom: 1px dotted black; */\r\n  }\r\n  \r\nspan.tooltiptext {\r\n    visibility: hidden;\r\n    text-align: center;\r\n    border-radius: 6px;\r\n    padding: 0px 4px;\r\n    /* Position the tooltip */\r\n    position: absolute;\r\n    display: block;\r\n    color: black;\r\n    background-color: white;\r\n    line-height: normal;\r\n    width: fit-content;\r\n    top: 3px;\r\n    left: 25px;  \r\n    z-index: 1;\r\n}\r\n\r\n.tooltip:hover .tooltiptext {\r\n    visibility: visible;\r\n}\r\n\r\np.iconText {\r\n    display: block;\r\n    text-overflow: ellipsis;\r\n    width: 40px;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    padding: 5px;\r\n    line-height: normal;\r\n}\r\n  \r\ndiv.mainButtonItem span#hint {\r\n    position: relative;\r\n    width: fit-content;\r\n    display: none;\r\n    opacity: 0;\r\n    background-color: #ffffff;\r\n    color: #000000;\r\n    left: 30px;\r\n    padding: 0px 4px;\r\n    overflow: visible;\r\n}\r\n\r\ndiv.mainButtonItem:hover span#hint {\r\n    opacity: 1;\r\n    display: block;\r\n    position: relative;\r\n    left: 30px;\r\n    padding: 0px 4px;\r\n    border-radius: 5px;\r\n    width: fit-content;\r\n}\r\n\r\ndiv.rightToggleButton:hover span#hint {\r\n    opacity: 1;\r\n    display: block;\r\n}\r\n\r\n.canvas_container {\r\n    position: fixed;\r\n    top: 30px;\r\n    left: 225px;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.canvas_container_inner {\r\n    margin: 3px;\r\n}\r\n\r\n.canvas_tab_container {\r\n    background-color: #aaaaaa;\r\n    height: 25px;\r\n}\r\n\r\nh1 {\r\n    margin: 0px;\r\n}\r\n\r\ndiv#somethingLater {\r\n    width: 100%;\r\n    height: 1000px;\r\n    background-color: #666666;\r\n    overflow: scroll;\r\n}\r\n\r\ndiv.mainButtonItem:hover span#hint {\r\n    opacity: 1;\r\n    display: block;\r\n}\r\n\r\ntextarea#script_body_editor {\r\n    height: 100vh;\r\n}\r\n\r\ndiv#codeBody {\r\n    height: 100vh;\r\n}\r\n\r\n.toptoggleitem.selected {\r\n    transition: 2s;\r\n}\r\n\r\n.toptoggleitem.selected:hover {\r\n    transition: 2s;\r\n    min-height: 36%;\r\n}\r\n\r\n/* Copy from jsonview.css */\r\n/*\r\nbody {\r\n    font-family: 'Open Sans';\r\n    font-size: 16px;\r\n    background-color: #252525;\r\n    color: #808080;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.line {\r\n    margin: 4px 0;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.caret-icon {\r\n    width: 18px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.empty-icon {\r\n    width: 18px;\r\n}\r\n\r\n.json-type {\r\n    margin-right: 4px;\r\n    margin-left: 4px;\r\n}\r\n\r\n.json-key {\r\n    color: #444;\r\n    margin-right: 4px;\r\n    margin-left: 4px;\r\n}\r\n\r\n.json-index {\r\n    margin-right: 4px;\r\n    margin-left: 4px;\r\n}\r\n\r\n\r\n.json-value {\r\n    margin-left: 8px;\r\n}\r\n\r\n.json-number {\r\n    color: #f9ae58;\r\n}\r\n\r\n.json-boolean {\r\n    color: #ec5f66;\r\n}\r\n\r\n.json-string {\r\n    color: #86b25c;\r\n}\r\n\r\n.json-size {\r\n    margin-right: 4px;\r\n    margin-left: 4px;\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n}\r\n\r\n*/";
styleInject(css_248z);

var Canvas = /*#__PURE__*/function (_React$Component) {
  _inherits(Canvas, _React$Component);

  var _super = _createSuper(Canvas);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _super.call(this, props);
    _this.state = globalVars;
    _this.handleComponentSelection = handleComponentSelection.bind(_assertThisInitialized(_this));
    _this.handleDoubleClick = handleDoubleClick.bind(_assertThisInitialized(_this));
    _this.handleEdgeInitialization = handleEdgeInitialization.bind(_assertThisInitialized(_this));
    _this.handleTheClickOnAllComponents = handleTheClickOnAllComponents.bind(_assertThisInitialized(_this));
    _this.manageCanvas = manageCanvas.bind(_assertThisInitialized(_this));
    _this.manageGrid = manageGrid.bind(_assertThisInitialized(_this));
    _this.dummyToSetState = dummyToSetState.bind(_assertThisInitialized(_this));
    _this.addGenericComponentIcon = addGenericComponentIcon.bind(_assertThisInitialized(_this));
    _this.saveData = saveData.bind(_assertThisInitialized(_this));
    _this.loadData = loadData.bind(_assertThisInitialized(_this));
    _this.downloadData = downloadData.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      addAllUdo(this.props.udo);
      this.manageCanvas();
      this.loadData();
      this.addGenericComponentIcon();
      addRightToggleButton();
    }
  }, {
    key: "print",
    value: function print() {
      console.log(this.state);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        style: {
          backgroundColor: '#2b3d50',
          width: '100vw',
          height: '100vh'
        }
      }, /*#__PURE__*/React__default['default'].createElement(ScriptTag__default['default'], null, this.dummyToSetState()), /*#__PURE__*/React__default['default'].createElement(ScriptTag__default['default'], null, this.manageGrid()), /*#__PURE__*/React__default['default'].createElement(ScriptTag__default['default'], null, this.handleComponentSelection()), /*#__PURE__*/React__default['default'].createElement(ScriptTag__default['default'], null, this.handleDoubleClick()), /*#__PURE__*/React__default['default'].createElement(ScriptTag__default['default'], null, this.handleEdgeInitialization()), /*#__PURE__*/React__default['default'].createElement(ScriptTag__default['default'], null, this.handleTheClickOnAllComponents()), /*#__PURE__*/React__default['default'].createElement(Grid, null), /*#__PURE__*/React__default['default'].createElement(TopBar, {
        saveData: this.saveData,
        downloadData: this.downloadData
      }), /*#__PURE__*/React__default['default'].createElement(LeftContainer, {
        context: this
      }));
    }
  }]);

  return Canvas;
}(React__default['default'].Component);

exports.Canvas = Canvas;
