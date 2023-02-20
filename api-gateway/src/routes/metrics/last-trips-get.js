const axios = require('axios');
const settings = require('../../conf/config');

async function tripMetricsGet(req, reply) {
  const tripsMetricsUri = `${settings.serviceTripsURL()}/metrics/trips/${req.params.last_n_minutes}`;
  let metricsResponse;
  try {
    metricsResponse = await axios.get(tripsMetricsUri);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }

  return reply.status(200).send(metricsResponse.data);
}

module.exports = tripMetricsGet;
