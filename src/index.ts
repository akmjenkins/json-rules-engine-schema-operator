import { Operator } from 'json-rules-engine';

type Options = {
  name?: string;
};

export default (
  schemaEvaluator: (subject: any, schema: any) => boolean,
  options?: Options,
) =>
  new Operator(options?.name ?? 'schema', (value: any, compare: any) =>
    schemaEvaluator(value, compare),
  );
