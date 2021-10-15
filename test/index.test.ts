import { Engine } from 'json-rules-engine';
import Ajv from 'ajv';
import createSchemaOperator from '../src';

describe('test', () => {
  const ajv = new Ajv();
  const operator = createSchemaOperator((subject, schema) =>
    ajv.compile(schema)(subject),
  );

  it('should work', async () => {
    const engine = new Engine();

    engine.addOperator(operator);

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
    expect(results2.events).toEqual([{ type: 'test' }]);
  });
});
