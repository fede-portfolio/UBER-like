const driverQualySchemas = require('../../schemas/driver_qualy_schema');
const driverGetHandler = require('./drivers_get_qualy');
const driverGetAvgHandler = require('./drivers_get_avg_qualy');
const driverPostHandler = require('./drivers_create_qualy');

const {
  driverQualyPostSchema,
  driverQualyGETSchema,
  driverQualyAvgGETSchema,
} = driverQualySchemas;

async function driversQualyRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/drivers/:username/qualy',
    {
      onRequest: [fastify.verify],
      schema: driverQualyGETSchema,
      handler: driverGetHandler,
    },
  );
  fastify.get(
    '/drivers/:username/qualy/average',
    {
      onRequest: [fastify.verify],
      schema: driverQualyAvgGETSchema,
      handler: driverGetAvgHandler,
    },
  );
  fastify.post(
    '/drivers/qualy/create',
    {
      onRequest: [fastify.verify],
      schema: driverQualyPostSchema,
      handler: driverPostHandler,
    },
  );
  done();
}

module.exports = driversQualyRoutes;
