import rule from '../src/rule';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('react-intl-extractor', rule, {
  invalid: [
    {
      // @TODO: Pass JSX to ESLint.
      code: 'var x = (<FormattedMessage id="test" defaultMessage="Hello"/>);',
      errors: [{ message: 'Duplicate translation id' }]
    }
  ]
});
