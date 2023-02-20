const tripSchemas = require('../../schemas/trip-schemas');

const {
  requestedByRiderTripSchema,
  estimatedTripSchema,
  riderRequestTripSchema,
  acceptedByDriverTripSchema,
} = tripSchemas;

const tripRequest = require('./trip-request');
const tripPrice = require('./trip-price');
const tripGet = require('./trip-get');
const tripGetForDriver = require('./tirp-get-for-driver');
const tripTakeAsDriver = require('./trip-take-as-driver');

const tripRequestSchema = {
  description: 'Request a new trip as a rider',
  tags: ['trips'],
  body: {
    description: 'Payload for starting a new trip as a rider',
    type: 'object',
    properties: riderRequestTripSchema,
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: requestedByRiderTripSchema,
    },
  },
};

const tripGetSchema = {
  description: 'Get trip by id',
  tags: ['trips'],
  params: {
    id: {
      type: 'string',
      default: 'a8ae2781-c86a-4719-a4b5-2117942c23c6',
    },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: acceptedByDriverTripSchema,
    },
  },
};

const tripPatchSchema = {
  description: 'Update trip status',
  tags: ['trips'],
  body: {
    description: 'Payload for updatin existing rider',
    type: 'object',
    properties: {
      driver_username: { type: 'string' },
      driver_current_latitude: { type: 'number' },
      driver_current_longitude: { type: 'number' },
      trip_state: { type: 'string' },
    },
  },
  params: {
    id: { type: 'string' },
  },
  response: {
    202: {
      description: 'Successful Response',
      type: 'object',
      properties: acceptedByDriverTripSchema,
    },
  },
};

const tripPriceSchema = {
  description: 'Estimate price of a trip as a rider',
  tags: ['trips'],
  querystring: {
    origin_address: { type: 'string', description: 'Current location address' },
    destination_address: { type: 'string', description: 'Destination address' },
    trip_type: { type: 'string', description: 'Trip type' },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: estimatedTripSchema,
    },
  },
};

const tripGetForDriverSchema = {
  description: 'Get driver trips by state, offset, limit',
  tags: ['trips'],
  querystring: {
    driver_username: { type: 'string', description: 'driver\'s username' },
    trip_state: { type: 'string', description: 'trip state, for example looking_for_driver' },
    offset: { type: 'integer', description: 'offset for all trips' },
    limit: { type: 'integer', description: 'limit for all trips' },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'array',
      items: { type: 'object', properties: requestedByRiderTripSchema },
    },
  },
};

async function tripsRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/trips',
    {
      onRequest: [fastify.verify],
      schema: tripRequestSchema,
      handler: tripRequest,
    },
  );
  fastify.get(
    '/trips/price',
    {
      onRequest: [fastify.verify],
      schema: tripPriceSchema,
      handler: tripPrice,
    },
  );
  fastify.get(
    '/trips/:id',
    {
      onRequest: [fastify.verify],
      schema: tripGetSchema,
      handler: tripGet,
    },
  );
  fastify.get(
    '/trips',
    {
      onRequest: [fastify.verify],
      schema: tripGetForDriverSchema,
      handler: tripGetForDriver,
    },
  );
  fastify.patch(
    '/trips/:id',
    {
      onRequest: [fastify.verify],
      schema: tripPatchSchema,
      handler: tripTakeAsDriver,
    },
  );
  done();
}

module.exports = tripsRoutes;
