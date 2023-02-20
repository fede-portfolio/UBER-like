const tripMetricSchema = require('../../schemas/metrics-schemas');

const tripMetricsGet = require('./last-trips-get');

const tripMetricsGetSchema = {
  description: 'Get trips for last n minutes',
  tags: ['metrics'],
  params: {
    last_n_minutes: {
      type: 'string',
      default: '30',
    },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'array',
      items: { type: 'object', properties: tripMetricSchema },
    },
  },
};

async function metricsRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/metrics/trips/:last_n_minutes',
    {
      onRequest: [fastify.verifyAdmin],
      schema: tripMetricsGetSchema,
      handler: tripMetricsGet,
    },
  );
  done();
}

module.exports = metricsRoutes;
