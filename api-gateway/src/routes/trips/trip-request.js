const axios = require('axios');
const settings = require('../../conf/config');
const verifyRider = require('../../auth/verify_rider');

async function tripRequest(req, reply) {
  const uri = `${settings.serviceTripsURL()}/trips`;
  let tripResponse;
  console.log('VERIFICO RIDER');
  const passVerification = await verifyRider.verifyRider(req.headers.authorization.split(' ')[1], req.body.rider_username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  try {
    tripResponse = await axios.post(uri, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }
  tripResponse.data.trip_id = tripResponse.data.id;
  return reply.status(201).send(tripResponse.data);
}

module.exports = tripRequest;
