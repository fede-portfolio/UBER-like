const {
  pricingRuleSchema,
  pricingRulePOSTSchema,
  pricingRuleEvaluateSchema,
  pricingRuleEvaluatedSchema,
  pricingRulePATCHSchema,
} = require('../../schemas/pricing-rules-schemas');

const pricingRulesGetAll = require('./pricing-rules-get-all');

const pricingRulesGet = require('./pricing-rule-get');

const pricingRulesCreate = require('./pricing-rule-create');

const pricingRuleUpdate = require('./pricing-rule-update');

const pricingRuleEvaluate = require('./pricing-rule-evaluate');

const pricingRulesGetAllSchema = {
  description: 'Get current pricing rules',
  tags: ['pricing'],
  response: {
    200: {
      description: 'Successful Response',
      type: 'array',
      items: { type: 'object', properties: pricingRuleSchema },
    },
  },
};

const pricingRulesGetSchema = {
  description: 'Get pricing rule by id',
  tags: ['pricing'],
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: pricingRuleSchema,
    },
  },
};

const pricingRulesPostSchema = {
  description: 'Create new pricing rules',
  tags: ['pricing'],
  body: {
    description: 'Payload for creating new rule',
    type: 'object',
    properties: pricingRulePOSTSchema,
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: pricingRuleSchema,
    },
  },
};

const pricingRulesEvaluateSchema = {
  description: 'Evaluate a pricing rule',
  tags: ['pricing'],
  body: {
    description: 'Payload for evaluating new rule',
    type: 'object',
    properties: pricingRuleEvaluateSchema,
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: pricingRuleEvaluatedSchema,
    },
  },
};

const pricingRulePatchSchema = {
  description: 'Update rule coefficients',
  tags: ['pricing'],
  body: {
    description: 'Payload for updating existing rule',
    type: 'object',
    properties: pricingRulePATCHSchema,
  },
  params: {
    id: { type: 'string' },
  },
  response: {
    202: {
      description: 'Successful Response',
      type: 'object',
      properties: pricingRuleSchema,
    },
  },
};

async function pricingRulesRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/pricing/rules',
    {
      onRequest: [fastify.verifyAdmin],
      schema: pricingRulesGetAllSchema,
      handler: pricingRulesGetAll,
    },
  );
  fastify.get(
    '/pricing/rules/:id',
    {
      onRequest: [fastify.verifyAdmin],
      schema: pricingRulesGetSchema,
      handler: pricingRulesGet,
    },
  );
  fastify.post(
    '/pricing/rules',
    {
      onRequest: [fastify.verifyAdmin],
      schema: pricingRulesPostSchema,
      handler: pricingRulesCreate,
    },
  );
  fastify.patch(
    '/pricing/rules/:id',
    {
      onRequest: [fastify.verifyAdmin],
      schema: pricingRulePatchSchema,
      handler: pricingRuleUpdate,
    },
  );
  fastify.post(
    '/pricing/rules/trial',
    {
      onRequest: [fastify.verifyAdmin],
      schema: pricingRulesEvaluateSchema,
      handler: pricingRuleEvaluate,
    },
  );
  done();
}

module.exports = pricingRulesRoutes;
