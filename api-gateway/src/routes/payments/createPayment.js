const axios = require('axios');
const settings = require('../../conf/config');

async function createPaymentPOST(req, reply) {
  const tripsURI = `${settings.serviceTripsURL()}/trips/${req.body.tripID}`;
  let tripResponse;
  try {
    tripResponse = await axios.get(tripsURI);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }
  const paymentBody = {};
  paymentBody.tripID = tripResponse.data.id;
  paymentBody.rider_username = tripResponse.data.rider_username;
  paymentBody.driver_username = tripResponse.data.driver_username;
  paymentBody.amount = req.body.amount;
  let createPaymentResponse;
  try {
    createPaymentResponse = await axios.post(`${settings.servicePaymentsURL()}/payments/create/payment`, paymentBody);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(error.response.status).send(
        {
          code: error.response.data.code,
          message: error.response.data.message,
        },
      );
    }
    if (error.response && error.response.status >= 400) {
      return reply.status(error.response.status).send(
        {
          message: error.response.data.message,
          username: error.response.data.username,
        },
      );
    }
  }
  return reply.status(201).send(createPaymentResponse.data);
}

module.exports = createPaymentPOST;
