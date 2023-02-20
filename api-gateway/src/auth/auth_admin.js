/* eslint-disable */
const fastifyPlugin = require('fastify-plugin');
const firebaseApp = require('./firebase_app');
const { getAuth } = require('firebase-admin/auth');
const axios = require('axios');
const settings = require('../conf/config');

async function verifyAdmin(fastify) {
  fastify.decorate('verifyAdmin', async (request, reply) => {
    let emailAdmin;
    try {
      await getAuth()
        .verifyIdToken(request.headers.authorization.split(' ')[1])
        .then((decodedToken) => {
          console.log('EL TOKEN ES CORRECTO');
          console.log('SOY ADMIN');
          const { uid } = decodedToken;
          const { email } = decodedToken;
          emailAdmin = email;
          console.log(emailAdmin);
          console.log(uid);

        })
        .catch((error) => {
          console.log('ERROR EN EL TOKEN');
          console.log(error);
          reply.status(401).send(error);
          return reply;
        });
        const adminsURI = `${settings.serviceUsersURL()}/admins/${emailAdmin}`;
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
                message: `Error: user is not an admin`,
                },
            );
            }
        }
    } catch (error) {
      console.log('ERROR NO SE ENVIO EL TOKEN');
      console.log(error);
      reply.status(401).send({
        error: 'The request sent doesnt has an authorization token',
        status: 401,
      });
      return reply;
    }
  });
}

module.exports = fastifyPlugin(verifyAdmin);
