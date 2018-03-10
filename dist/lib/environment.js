'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _operations = require('./operations');

var _operations2 = _interopRequireDefault(_operations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new environment
 *
 * @param {string} name The environment name
 * @returns {
 *    {
 *      add: function(key:string, value:string),
 *      findIndex: function(item:object),
 *      find: function(item:object),
 *      has: function(item:object),
 *      remove: function(item:object)
 *    }
 *  } The operations object
 */
const environment = name => {
  const environment = {
    name: name,
    values: []
  };

  return (0, _extends3.default)({
    environment,
    add: add(environment)
  }, (0, _operations2.default)(environment.values, 'key'));
};

/**
 * Add constructor
 * @param {object} environment The environment object
 * @returns {function(variable:object): object} add function
 */
const add = environment =>
/**
 * @param {object} variable A variable object
 * @returns {Object}
 */
variable => {
  environment.values.push(variable);
};

exports.default = environment;