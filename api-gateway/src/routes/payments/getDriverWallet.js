const axios = require('axios');
const settings = require('../../conf/config');

async function driverWalletGET(req, reply) {
  let getDriverWalletResponse;
  try {
    getDriverWalletResponse = await axios.get(`${settings.servicePaymentsURL()}/drivers/${req.params.username}/wallet`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(error.response.status).send(
        {
          message: error.response.message,
          username: error.response.username,
        },
      );
    }
  }
  return reply.status(200).send(getDriverWalletResponse.data);
}

module.exports = driverWalletGET;
