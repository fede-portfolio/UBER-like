const axios = require('axios');
const settings = require('../../conf/config');

async function adminCreate(req, reply) {
  if (!req.body.username) {
    return reply.status(422).send(
      {
        message: 'Error: Missing username',
      },
    );
  }
  const uri = `${settings.serviceUsersURL()}/`;
  let userFullResponse;
  try {
    userFullResponse = await axios.get(`${uri}users/${req.body.username}`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (!error.response || error.response.status === 404) {
      return reply.status(409).send(
        {
          message: 'Error: Username does not exist',
        },
      );
    }
  }

  let adminFullResponse;
  const body = {
    email: userFullResponse.data.email,
  };
  try {
    adminFullResponse = await axios.post(`${uri}admins`, body);
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
          message: 'Error: Missing username',
        },
      );
    }
  }
  return reply.status(201).send(adminFullResponse.data);
}

module.exports = adminCreate;
