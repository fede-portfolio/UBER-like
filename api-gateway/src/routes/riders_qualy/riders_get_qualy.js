const axios = require('axios');
const settings = require('../../conf/config');
const verifyRiders = require('../../auth/verify_rider');

async function ridersQualyGET(req, reply) {
  const passVerification = await verifyRiders.verifyRider(req.headers.authorization.split(' ')[1], req.params.username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  let riderQualyGetResponse;
  try {
    riderQualyGetResponse = await axios.get(`${settings.serviceUsersURL()}/riders/${req.params.username}/qualy`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          message: 'Error. Rider not found',
          username: req.params.username,
        },
      );
    }
  }
  console.log(riderQualyGetResponse.data);
  return reply.status(200).send(riderQualyGetResponse.data);
}

module.exports = ridersQualyGET;
