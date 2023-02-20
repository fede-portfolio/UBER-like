const axios = require('axios');
const settings = require('../conf/config');
const verifyDrivers = require('../auth/verify_driver');

const driverSchema = {
  description: 'Endpoint for creating drivers',
  tags: ['drivers'],
  body: {
    description: 'Payload for creating a new driver',
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      phone_number: { type: 'string' },
      wallet: { type: 'string' },
      preferred_location_name: { type: 'string' },
      car_manufacturer: { type: 'string' },
      car_model: { type: 'string' },
      car_year_of_production: { type: 'integer' },
      car_color: { type: 'string' },
      car_plate: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string', example: 'unique_username' },
        first_name: { type: 'string', example: 'fname' },
        last_name: { type: 'string', example: 'lname' },
        email: { type: 'string', example: 'service@drivers.com' },
        wallet: { type: 'string', example: 'as4d65a4s654aeeg54a6s5d4' },
        phone_number: { type: 'string', example: '+541155555555' },
        preferred_location_name: { type: 'string', example: 'Av. Paseo Colón 850' },
        car_manufacturer: { type: 'string', example: 'Audi' },
        car_model: { type: 'string', example: 'TT' },
        car_year_of_production: { type: 'integer', example: 2022 },
        car_color: { type: 'string', example: 'Abyss Blue' },
        car_plate: { type: 'string', example: 'AAA 123' },
      },
    },
  },
};

const driverPATCHchema = {
  description: 'Endpoint for updating driver info',
  params: {
    email: {
      type: 'string',
      default: 'email',
    },
  },
  tags: ['drivers'],
  body: {
    description: 'Payload for updating an existing driver',
    type: 'object',
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      phone_number: { type: 'string' },
      wallet: { type: 'string' },
      preferred_location_name: { type: 'string' },
      car_manufacturer: { type: 'string' },
      car_model: { type: 'string' },
      car_year_of_production: { type: 'integer' },
      car_color: { type: 'string' },
      car_plate: { type: 'string' },
    },
  },
  response: {
    202: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string', example: 'unique_username' },
        email: { type: 'string', example: 'service@domain.com' },
        first_name: { type: 'string', example: 'fname' },
        last_name: { type: 'string', example: 'lname' },
        phone_number: { type: 'string', example: '+541155555555' },
        wallet: { type: 'string', example: 'as4d65a4s654aeeg54a6s5d4' },
        preferred_location_name: { type: 'string', example: 'Av. Paseo Colón 850' },
        car_manufacturer: { type: 'string' },
        car_model: { type: 'string' },
        car_year_of_production: { type: 'integer' },
        car_color: { type: 'string' },
        car_plate: { type: 'string' },
      },
    },
  },
};

async function driversPOST(req, reply) {
  req.body.preferred_location_latitude = -32.4;
  req.body.preferred_location_longitude = -33.4;
  let driverRegistrationResponse;
  let driverWalletCreationResponse;
  console.log(settings.serviceUsersURL());
  try {
    driverRegistrationResponse = await axios.post(`${settings.serviceUsersURL()}/drivers`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  try {
    driverWalletCreationResponse = await axios.post(`${settings.servicePaymentsURL()}/payments/${req.body.username}/wallet/create`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 400) {
      return reply.status(400).send(
        {
          message: 'Error. Driver Username already in use',
          username: req.params.username,
        },
      );
    }
  }
  console.log(driverWalletCreationResponse.data);
  console.log(driverRegistrationResponse);
  return reply.status(201).send(driverRegistrationResponse.data);
}

async function driversPATCH(req, reply) {
  req.body.preferred_location_latitude = -32.4;
  req.body.preferred_location_longitude = -33.4;
  const passVerification = await verifyDrivers.verifyDriverEmail(req.headers.authorization.split(' ')[1], req.params.email);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  const driverUpdate = await axios.patch(`${settings.serviceUsersURL()}/drivers/${req.params.email}/status`, req.body);
  return reply.status(202).send(driverUpdate.data);
}

async function driversRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/drivers',
    {
      schema: driverSchema,
      handler: driversPOST,
    },
  );
  fastify.patch(
    '/drivers/:email/status',
    {
      onRequest: [fastify.verify],
      schema: driverPATCHchema,
      handler: driversPATCH,
    },
  );
  done();
}

module.exports = driversRoutes;
