/* eslint-disable */
const fastifyPlugin = require('fastify-plugin');
const firebaseApp = require('./firebase_app');
const { getAuth } = require('firebase-admin/auth');

async function verify(fastify) {
  fastify.decorate('verify', async (request, reply) => {
    try {
      await getAuth()
        .verifyIdToken(request.headers.authorization.split(' ')[1])
        .then((decodedToken) => {
          console.log('EL TOKEN ES CORRECTO');
          const { uid } = decodedToken;
          const { email } = decodedToken;
          console.log(email);
          console.log(uid);
        })
        .catch((error) => {
          console.log('ERROR EN EL TOKEN');
          console.log(error);
          reply.status(401).send(error);
          return reply;
        });
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

module.exports = fastifyPlugin(verify);
