const fastifyPlugin = require('fastify-plugin');

// eslint-disable-next-line no-unused-vars
async function verify(fastify, options) {
  // eslint-disable-next-line no-unused-vars
  fastify.decorate('verify', async (request, reply) => {
  });
}

module.exports = fastifyPlugin(verify);
