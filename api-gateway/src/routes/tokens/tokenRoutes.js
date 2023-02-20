const {
  PushTokenPostSchema,
} = require('../../schemas/token_schema');

const createTokenHandler = require('./createToken');

async function paymentsRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/users/push/token',
    {
      schema: PushTokenPostSchema,
      handler: createTokenHandler,
    },
  );
  done();
}

module.exports = paymentsRoutes;
