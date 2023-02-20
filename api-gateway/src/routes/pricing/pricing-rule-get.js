const axios = require('axios');
const settings = require('../../conf/config');

async function pricingRulesGet(req, reply) {
  const pricingRulesURI = `${settings.servicePricingURL()}/rules/${req.params.id}`;
  let rulesResponse;
  try {
    rulesResponse = await axios.get(pricingRulesURI);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }

  return reply.status(200).send(rulesResponse.data);
}

module.exports = pricingRulesGet;
