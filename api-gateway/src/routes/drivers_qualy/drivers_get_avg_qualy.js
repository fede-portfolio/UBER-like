const axios = require('axios');
const settings = require('../../conf/config');
const verifyDrivers = require('../../auth/verify_driver');

async function driversQualyAvgGET(req, reply) {
  const passVerification = await verifyDrivers.verifyDriver(req.headers.authorization.split(' ')[1], req.params.username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  let driverQualyAvgGetResponse;
  try {
    driverQualyAvgGetResponse = await axios.get(`${settings.serviceUsersURL()}/drivers/${req.params.username}/qualy/average`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          message: 'Error. Driver not found',
          username: req.params.username,
        },
      );
    }
  }
  return reply.status(200).send(driverQualyAvgGetResponse.data);
}

module.exports = driversQualyAvgGET;
