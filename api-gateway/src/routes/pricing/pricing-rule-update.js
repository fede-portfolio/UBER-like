const axios = require('axios');
const settings = require('../../conf/config');

async function pricingRuleUpdate(req, reply) {
  const URI = `${settings.servicePricingURL()}/rules/${req.params.id}`;
  const response = await axios.patch(URI, req.body);
  return reply.status(202).send(response.data);
}

module.exports = pricingRuleUpdate;
