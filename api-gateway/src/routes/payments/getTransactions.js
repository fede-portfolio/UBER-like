const axios = require('axios');
const settings = require('../../conf/config');

async function transactionsGET(req, reply) {
  let getTransactionResponse;
  try {
    getTransactionResponse = await axios.get(`${settings.servicePaymentsURL()}/payments/transactions`, { params: req.query });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(200).send(getTransactionResponse.data);
}

module.exports = transactionsGET;
