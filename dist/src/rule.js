"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReactIntlCollector_1 = __importDefault(require("./ReactIntlCollector"));
const collector = new ReactIntlCollector_1.default();
process.on('exit', () => {
    collector.flush();
});
;
exports.default = {
    create: (context) => {
        if (context.options.length > 0) {
            if (context.options[0].dir) {
                collector.setTargetDir(context.options[0].dir);
            }
            if (context.options[0].locale) {
                collector.setDefaultLocale(context.options[0].locale);
            }
        }
        const tags = ['FormattedMessage', 'FormattedHTMLMessage'];
        return {
            JSXOpeningElement(node) {
                if (node.type == 'JSXOpeningElement') {
                    if (tags.includes(node.name.name)) {
                        const id = node.attributes.find(tag => tag.name.name == 'id');
                        const defaultMessage = node.attributes.find(tag => tag.name.name == 'defaultMessage');
                        if (id && defaultMessage) {
                            if (!collector.collectTranslationPair(id.value.value, defaultMessage.value.value ||
                                defaultMessage.value.expression.quasis[0].value.raw)) {
                                context.report({
                                    node: node,
                                    message: 'Duplicate translation id {{id}} with different defaultMessage',
                                    data: {
                                        id: id.value.value
                                    }
                                });
                            }
                        }
                    }
                }
            }
        };
    }
};
//# sourceMappingURL=rule.js.map