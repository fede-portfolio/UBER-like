const axios = require('axios');
const settings = require('../../conf/config');

async function findyByAddress(address) {
  const uri = `${settings.serviceTripsURL()}/locations/search/`;
  const foundAddress = await axios.get(
    uri,
    { params: { address } },
  );
  return foundAddress.data;
}

async function locationsSearch(req, reply) {
  const { address } = req.query;
  let found;
  if (address !== undefined) {
    try {
      found = await findyByAddress(address);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return reply.status(404).send(
          {
            message: `Ubicación ${address} no encontrada`,
          },
        );
      }
    }
    return reply.status(200).send(found);
  }
  return reply.status(500).send();
}

module.exports = locationsSearch;
