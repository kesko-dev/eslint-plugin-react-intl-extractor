"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __importDefault(require("../src/rule"));
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
ruleTester.run('react-intl-extractor', rule_1.default, {
    invalid: [
        {
            // @TODO: Pass JSX to ESLint.
            code: 'var x = (<FormattedMessage id="test" defaultMessage="Hello"/>);',
            errors: [{ message: 'Duplicate translation id' }]
        }
    ]
});
//# sourceMappingURL=index.js.map