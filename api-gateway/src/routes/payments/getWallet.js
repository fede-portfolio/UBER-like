const axios = require('axios');
const settings = require('../../conf/config');
const verifyUser = require('../../auth/verify_username');

async function userWalletGET(req, reply) {
  console.log('VERIFICO Wallet owner');
  const passVerification = await verifyUser(req.headers.authorization.split(' ')[1], req.params.username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  console.log(passVerification);
  let getUserWalletResponse;
  try {
    getUserWalletResponse = await axios.get(`${settings.servicePaymentsURL()}/payments/${req.params.username}/wallet`);
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
  return reply.status(200).send(getUserWalletResponse.data);
}

module.exports = userWalletGET;
