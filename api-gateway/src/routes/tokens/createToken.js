const axios = require('axios');
const settings = require('../../conf/config');

async function pushTokenPOST(req, reply) {
  let postTokenResponse;
  try {
    postTokenResponse = await axios.post(`${settings.serviceUsersURL()}/users/push/token`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status >= 400) {
      return reply.status(error.response.status).send(
        {
          message: error.response.message,
          username: error.response.username,
        },
      );
    }
  }
  return reply.status(200).send(postTokenResponse.data);
}

module.exports = pushTokenPOST;
