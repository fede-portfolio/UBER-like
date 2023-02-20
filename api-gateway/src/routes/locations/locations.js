const locationSchemas = require('../../schemas/location-schemas');

const { locationSchema, locationNotFoundSchema } = locationSchemas;

const locationSearch = require('./location-search');

const locationSearchSchema = {
  description: 'Search location by address',
  tags: ['locations'],
  querystring: {
    address: { type: 'string', description: 'Location address in standard form' },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: locationSchema,
    },
    404: {
      description: 'Location not found',
      type: 'object',
      properties: locationNotFoundSchema,
    },
  },
};

async function locationsRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/locations/search/',
    {
      onRequest: [fastify.verify],
      schema: locationSearchSchema,
      handler: locationSearch,
    },
  );
  done();
}

module.exports = locationsRoutes;
