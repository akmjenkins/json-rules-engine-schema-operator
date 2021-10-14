# json-rules-engine-schema-operator

[![npm version](https://img.shields.io/npm/v/json-rules-engine-schema-operator)](https://npmjs.org/package/json-rules-engine-schema-operator)
[![codecov](https://codecov.io/gh/akmjenkins/json-rules-engine-schema-operator/branch/main/graph/badge.svg)](https://codecov.io/gh/akmjenkins/json-rules-engine-schema-operator)
![Build Status](https://github.com/akmjenkins/json-rules-engine-schema-operator/actions/workflows/test.yaml/badge.svg)
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/json-rules-engine-schema-operator)](https://bundlephobia.com/result?p=json-rules-engine-schema-operator)

## What's This?

It's an operator to evaluate a value against a [JSON Schema](https://json-schema.org/) for the totally awesome [json-rules-engine](https://github.com/CacheControl/json-rules-engine) package.

## Why?

Because a JSON Schema **is a predicate**. A value either validates against a schema, or it doesn't. Rather than writing (and maintaining) a bunch of custom operators and bloating your codebase with them, you only need one operator - a schema operator.

## Installation

```bash
npm install json-rules-engine-schema-operator
# or
yarn add json-rules-engine-schema-operator
```

## Usage

This package is BYOV - bring your own validator (highly recommend [AJV](https://github.com/ajv-validator/ajv)!!)

```js
import Ajv from 'ajv';
import { Engine } from 'json-rules-engine';
import createSchemaOperator from 'json-rules-engine-schema-operator';


const operator = createSchemaOperator((subject,schema) => ajv.compile(schema)(subject);

const engine = new Engine();
engine.addOperator(operator);
```

and now you can do this:

```js
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
    type: 'j_firstName',
  },
});
```

## Related

I ❤️ JSON schema and [json-rules-engine](https://github.com/CacheControl/json-rules-engine) both so much, that I created a package [json-schema-rules-engine](https://github.com/akmjenkins/json-schema-rules-engine) that works very similarly, but it relies entirely on JSON schemas for predicates (or "operators"), which greatly simplifies the concept of the rules engine.
