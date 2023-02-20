const axios = require('axios');
const settings = require('../../conf/config');

async function tripTakeAsDriver(req, reply) {
  const tripsURI = `${settings.serviceTripsURL()}/trips/${req.params.id}`;
  const tripUpdate = await axios.patch(tripsURI, req.body);
  return reply.status(202).send(tripUpdate.data);
}

module.exports = tripTakeAsDriver;
