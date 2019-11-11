import { Rule } from 'eslint';
import { Node } from 'estree';

import ReactIntlCollector from './ReactIntlCollector';

const collector = new ReactIntlCollector();

process.on('exit', () => {
  collector.flush();
});

interface JSXOpeningElement {
  type: 'JSXOpeningElement';
  name: { name: string };
  attributes: { name: { name: string }; value: { value: string } }[];
}

export default {
  create: (context: Rule.RuleContext) => {
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
      JSXOpeningElement(node: Node | JSXOpeningElement) {
        if (node.type == 'JSXOpeningElement') {
          if (tags.includes(node.name.name)) {
            const id = node.attributes.find(tag => tag.name.name == 'id');
            const defaultMessage = node.attributes.find(
              tag => tag.name.name == 'defaultMessage'
            );
            if (id && defaultMessage) {
              if (
                !collector.collectTranslationPair(
                  id.value.value,
                  defaultMessage.value.value
                )
              ) {
                context.report({
                  node: (node as unknown) as Node,
                  message:
                    'Duplicate translation id {{id}} with different defaultMessage',
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
} as Rule.RuleModule;
