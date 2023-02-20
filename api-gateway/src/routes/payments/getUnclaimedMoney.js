const axios = require('axios');
const settings = require('../../conf/config');
const verifyUser = require('../../auth/verify_username');

async function driverEarnedMoneyGET(req, reply) {
  const passVerification = await verifyUser(req.headers.authorization.split(' ')[1], req.params.username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  let getUnclaimedMoneyResponse;
  try {
    getUnclaimedMoneyResponse = await axios.get(`${settings.servicePaymentsURL()}/payments/${req.params.username}/unclaimed/money`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: error.response.data.message,
          username: error.response.data.username,
        },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(error.response.status).send(
        {
          message: error.response.data.message,
          username: error.response.data.username,
        },
      );
    }
  }
  return reply.status(200).send(getUnclaimedMoneyResponse.data);
}

module.exports = driverEarnedMoneyGET;
