const axios = require('axios');
const settings = require('../../conf/config');

async function contractBalanceGET(req, reply) {
  let getContractBalanceResponse;
  try {
    getContractBalanceResponse = await axios.get(`${settings.servicePaymentsURL()}/payments/contract/balance`);
  } catch (error) {
    console.log('ERROR');
  }
  return reply.status(200).send(getContractBalanceResponse.data);
}
module.exports = contractBalanceGET;
