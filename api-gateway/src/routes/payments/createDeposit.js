const axios = require('axios');
const settings = require('../../conf/config');

async function createDepositPOST(req, reply) {
  let createDepositResponse;
  try {
    createDepositResponse = await axios.post(`${settings.servicePaymentsURL()}/payments/create/deposit`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status >= 400) {
      return reply.status(error.response.status).send(
        {
          message: error.response.data.message,
          username: error.response.data.username,
        },
      );
    }
  }
  return reply.status(201).send(createDepositResponse.data);
}

module.exports = createDepositPOST;
