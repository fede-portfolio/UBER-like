const settings = require('../conf/config');

const healthGETSchema = {
  description: 'Ping Utility',
  tags: ['healthcheck'],
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        version: { type: 'string' },
        status: { type: 'string' },
      },
    },
  },
};

async function healthGET(req, reply) {
  return reply.status(200).send(
    {
      version: settings.apiGatewayVersion(),
      status: 'UP',
    },
  );
}

async function healthcheckRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/health',
    {
      schema: healthGETSchema,
      handler: healthGET,
    },
  );
  done();
}

module.exports = healthcheckRoutes;
