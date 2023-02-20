const axios = require('axios');
const settings = require('../../conf/config');

async function ruleCreate(req, reply) {
  const uri = `${settings.servicePricingURL()}`;

  let ruleResponse;
  try {
    ruleResponse = await axios.post(`${uri}/rules`, req.body);
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
  return reply.status(201).send(ruleResponse.data);
}

module.exports = ruleCreate;
