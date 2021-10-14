import { Operator } from 'json-rules-engine';

export default (schemaEvaluator: (subject: any, schema: any) => boolean) =>
  new Operator('schema', (value: any, compare: any) =>
    schemaEvaluator(value, compare),
  );
