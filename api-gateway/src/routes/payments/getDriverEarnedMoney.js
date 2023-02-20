const axios = require('axios');
const settings = require('../../conf/config');

async function driverEarnedMoneyGET(req, reply) {
  let getDriverMoneyResponse;
  try {
    getDriverMoneyResponse = await axios.get(`${settings.servicePaymentsURL()}/drivers/${req.params.username}/earned/money`);
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
  return reply.status(200).send(getDriverMoneyResponse.data);
}

module.exports = driverEarnedMoneyGET;
