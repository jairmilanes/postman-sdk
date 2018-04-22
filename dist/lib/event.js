"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _operations = require("./operations");

var _operations2 = _interopRequireDefault(_operations);

var _index = require("uuid-by-string/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = collection => {
    return (0, _extends3.default)({
        add: add(collection)
    }, (0, _operations2.default)(collection.event, 'id'));
};

const add = collection => params => {
    const { name, listen, disabled, type, exec, source } = params;

    const event = {
        id: (0, _index2.default)(name),
        listen: listen || 'prerequest',
        disabled: disabled || false,
        script: {
            id: (0, _index2.default)(name),
            type: type || 'text/javascript',
            name: name
        }
    };

    if (!exec && !source) {
        throw new Error("Cannot create an event without a script to run");
    }

    if (exec) {
        event.script.exec = exec;
    }

    if (source) {
        event.script.source = source;
    }

    collection.event.push(event);
};