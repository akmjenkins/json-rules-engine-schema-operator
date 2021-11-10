import { Engine } from 'json-rules-engine';
import Ajv from 'ajv';
import createSchemaOperator from '../src';

const ajv = new Ajv();
const validator = (subject: any, schema: any) => ajv.validate(schema, subject);

describe('test', () => {
  it('should work', async () => {
    const engine = new Engine();
    engine.addOperator(createSchemaOperator(validator));

    engine.addRule({
      conditions: {
        any: [
          {
            fact: 'firstName',
            operator: 'schema',
            value: {
              type: 'string',
              pattern: '^J',
            },
          },
        ],
      },
      event: {
        type: 'first_name_starts_with_j',
      },
    });

    const results1 = await engine.run({ firstName: 'bill' });
    expect(results1.events).toHaveLength(0);
    const results2 = await engine.run({ firstName: 'Jill' });
    expect(results2.events).toEqual([{ type: 'first_name_starts_with_j' }]);
  });

  it('should work with a custom name', async () => {
    const name = 'foo';
    const engine = new Engine();
    engine.addOperator(createSchemaOperator(validator, { name }));

    engine.addRule({
      conditions: {
        any: [
          {
            fact: 'firstName',
            operator: name,
            value: {
              type: 'string',
              pattern: '^J',
            },
          },
        ],
      },
      event: {
        type: 'first_name_starts_with_j',
      },
    });

    const results1 = await engine.run({ firstName: 'bill' });
    expect(results1.events).toHaveLength(0);
    const results2 = await engine.run({ firstName: 'Jill' });
    expect(results2.events).toEqual([{ type: 'first_name_starts_with_j' }]);
  });
});
