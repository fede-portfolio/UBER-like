const axios = require('axios');
const settings = require('../conf/config');
const verifyRiders = require('../auth/verify_rider');

const riderPOSTSchema = {
  description: 'Endpoint for creating rider',
  tags: ['riders'],
  body: {
    description: 'Payload for creating a new rider',
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      phone_number: { type: 'string' },
      wallet: { type: 'string' },
      preferred_location_name: { type: 'string' },
    },
  },
  response: {
    201: {
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
      },
    },
  },
};

const riderPATCHchema = {
  description: 'Endpoint for updating rider info',
  params: {
    email: {
      type: 'string',
      default: 'email',
    },
  },
  tags: ['riders'],
  body: {
    description: 'Payload for updating an existing rider',
    type: 'object',
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      phone_number: { type: 'string' },
      wallet: { type: 'string' },
      preferred_location_name: { type: 'string' },
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
      },
    },
  },
};

async function ridersPOST(req, reply) {
  // FIXME: DO NOT HARDCODE 201
  req.body.preferred_location_latitude = -32.4;
  req.body.preferred_location_longitude = -33.4;
  let riderRegistrationResponse;
  let riderWalletCreationResponse;
  try {
    riderRegistrationResponse = await axios.post(`${settings.serviceUsersURL()}/riders`, req.body);
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
    riderWalletCreationResponse = await axios.post(`${settings.servicePaymentsURL()}/payments/${req.body.username}/wallet/create`);
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
  console.log(riderWalletCreationResponse.data);
  return reply.status(201).send(riderRegistrationResponse.data);
}

async function ridersPATCH(req, reply) {
  req.body.preferred_location_latitude = -32.4;
  req.body.preferred_location_longitude = -33.4;
  const passVerification = await verifyRiders.verifyRiderEmail(req.headers.authorization.split(' ')[1], req.params.email);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  const riderUpdate = await axios.patch(`${settings.serviceUsersURL()}/riders/${req.params.email}/status`, req.body);
  return reply.status(202).send(riderUpdate.data);
}

async function ridersRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/riders',
    {
      schema: riderPOSTSchema,
      handler: ridersPOST,
    },
  );
  fastify.patch(
    '/riders/:email/status',
    {
      onRequest: [fastify.verify],
      schema: riderPATCHchema,
      handler: ridersPATCH,
    },
  );
  done();
}

module.exports = ridersRoutes;
