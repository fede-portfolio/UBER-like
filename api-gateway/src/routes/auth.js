const axios = require('axios');
const settings = require('../conf/config');

const authSchema = {
  description: 'Endpoint for loging in and obtaining a session token',
  tags: ['auth'],
  body: {
    description: 'Payload for obtaining a new token',
    type: 'object',
    properties: {
      email: { type: 'string', default: 'service@domain.com' },
      password: { type: 'string', default: 'secure' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        token: { type: 'string', default: 'X.Y.Z' },
        token_type: { type: 'string', default: 'bearer' },
      },
    },
  },
};

async function authTokenPOST(req, reply) {
  const riderRegistration = await axios.post(`${settings.SERVICE_AUTH_URL}/auth/token`, req.body);
  return reply.status(201).send(riderRegistration.data);
}

async function authRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/auth/token',
    {
      schema: authSchema,
      handler: authTokenPOST,
    },
  );
  done();
}

module.exports = authRoutes;
