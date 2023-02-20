const riderQualySchemas = require('../../schemas/rider_qualy_schema');
const riderGetHandler = require('./riders_get_qualy');
const riderGetAvgHandler = require('./riders_get_avg_qualy');
const riderPostHandler = require('./riders_create_qualy');

const {
  RiderQualyPostSchema,
  RiderQualyGETSchema,
  RiderQualyAvgGETSchema,
} = riderQualySchemas;

async function ridersQualyRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/riders/:username/qualy',
    {
      onRequest: [fastify.verify],
      schema: RiderQualyGETSchema,
      handler: riderGetHandler,
    },
  );
  fastify.get(
    '/riders/:username/qualy/average',
    {
      onRequest: [fastify.verify],
      schema: RiderQualyAvgGETSchema,
      handler: riderGetAvgHandler,
    },
  );
  fastify.post(
    '/riders/qualy/create',
    {
      onRequest: [fastify.verify],
      schema: RiderQualyPostSchema,
      handler: riderPostHandler,
    },
  );
  done();
}

module.exports = ridersQualyRoutes;
