const adminSchemas = require('../../schemas/admin-schemas');

const { adminSchema } = adminSchemas;

const adminCreate = require('./admin-create');
const adminGet = require('./admin-get-by-username');

const adminPOSTSchema = {
  description: 'Create new admin account',
  tags: ['admins'],
  body: {
    description: 'Payload for creating a new admin',
    type: 'object',
    properties: {
      username: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: adminSchema,
    },
  },
};

const adminGETSchema = {
  description: 'Get admin by username',
  tags: ['admins'],
  params: {
    username: {
      type: 'string',
      default: 'some_admin_username',
    },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: adminSchema,
    },
  },
};

async function adminRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/admins',
    {
      onRequest: [fastify.verifyAdmin],
      schema: adminPOSTSchema,
      handler: adminCreate,
    },
  );
  fastify.get(
    '/admins/:username',
    {
      onRequest: [fastify.verifyAdmin],
      schema: adminGETSchema,
      handler: adminGet,
    },
  );
  done();
}

module.exports = adminRoutes;
