const axios = require('axios');
const settings = require('../../conf/config');

async function ruleEvaluate(req, reply) {
  const uri = `${settings.servicePricingURL()}`;

  let priceResponse;
  try {
    priceResponse = await axios.post(`${uri}/rules/trial`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 422) {
      return reply.status(422).send(
        {
          message: 'Error: cuerpo del mensaje incompleto',
        },
      );
    }
  }
  return reply.status(201).send(priceResponse.data);
}

module.exports = ruleEvaluate;
