const axios = require('axios');
const settings = require('../../conf/config');

async function transactions24GET(req, reply) {
  let getTransaction24Response;
  try {
    getTransaction24Response = await axios.get(`${settings.servicePaymentsURL()}/payments/transactions/24`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(200).send(getTransaction24Response.data);
}

module.exports = transactions24GET;
