const axios = require('axios');
const settings = require('../../conf/config');

async function adminGet(req, reply) {
  const uri = `${settings.serviceUsersURL()}/`;
  let userFullResponse;
  try {
    userFullResponse = await axios.get(`${uri}users/${req.params.username}`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(409).send(
        {
          message: 'Error: Username does not exist',
        },
      );
    }
  }
  const adminsURI = `${settings.serviceUsersURL()}/admins/${userFullResponse.data.email}`;
  let adminFullResponse;
  try {
    adminFullResponse = await axios.get(adminsURI);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(409).send(
        {
          message: `Error: user ${req.params.username} is not an admin`,
        },
      );
    }
  }
  return reply.status(200).send(adminFullResponse.data);
}

module.exports = adminGet;
