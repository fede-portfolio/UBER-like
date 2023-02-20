const axios = require('axios');
const settings = require('../../conf/config');
const verifyRiders = require('../../auth/verify_rider');

async function driversQualyPOST(req, reply) {
  const passVerification = await verifyRiders.verifyRider(req.headers.authorization.split(' ')[1], req.body.rider_username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  let driverQualyCreationResponse;
  try {
    driverQualyCreationResponse = await axios.post(`${settings.serviceUsersURL()}/drivers/qualy/create`, req.body);
  } catch (error) {
    if (error.response && error.response.status >= 400) {
      return reply.status(error.response.status).send(
        {
          message: error.response.data,
        },
      );
    }
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(201).send(driverQualyCreationResponse.data);
}

module.exports = driversQualyPOST;
