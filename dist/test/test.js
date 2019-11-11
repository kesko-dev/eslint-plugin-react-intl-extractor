"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __importDefault(require("../src/rule"));
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
ruleTester.run('my-rule', rule_1.default, {
    valid: [
        {
            code: 'var foo = true',
            options: [{ allowFoo: true }]
        }
    ],
    invalid: [
        {
            code: 'var invalidVariable = true',
            errors: [{ message: 'Unexpected invalid variable.' }]
        },
        {
            code: 'var invalidVariable = true',
            errors: [{ message: /^Unexpected.+variable/ }]
        }
    ]
});
//# sourceMappingURL=test.js.map