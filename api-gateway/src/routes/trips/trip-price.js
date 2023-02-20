const axios = require('axios');
const settings = require('../../conf/config');

async function tripPrice(req, reply) {
  const directionsURI = `${settings.serviceTripsURL()}/directions/search`;
  const pricingURI = `${settings.servicePricingURL()}/estimations`;
  const directionsParams = {
    origin: req.query.origin_address,
    destination: req.query.destination_address,
  };

  let directionsResponse;
  try {
    directionsResponse = await axios.get(directionsURI, { params: directionsParams });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }

  let pricingResponse;
  try {
    const pricingParams = directionsParams;
    pricingParams.type = req.query.type;
    pricingParams.estimated_time = directionsResponse.data.estimated_time.seconds;
    pricingParams.distance = directionsResponse.data.distance.meters;
    pricingParams.origin_address = req.query.origin_address;
    pricingParams.origin_latitude = directionsResponse.data.origin_latitude;
    pricingParams.origin_longitude = directionsResponse.data.origin_longitude;
    pricingParams.destination_address = req.query.destination_address;
    pricingParams.destination_latitude = directionsResponse.data.destination_latitude;
    pricingParams.destination_longitude = directionsResponse.data.destination_longitude;
    pricingResponse = await axios.get(pricingURI, { params: pricingParams });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
    if (error.response && error.response.status === 422) {
      return reply.status(422).send(
        { message: 'Wrong query params' },
      );
    }
  }
  const origin = {};
  origin.address = req.query.origin_address;
  origin.latitude = directionsResponse.data.origin_latitude;
  origin.longitude = directionsResponse.data.origin_longitude;
  const destination = {};
  destination.address = req.query.destination_address;
  destination.latitude = directionsResponse.data.destination_latitude;
  destination.longitude = directionsResponse.data.destination_longitude;

  const responseBody = {};
  responseBody.origin = origin;
  responseBody.destination = destination;
  responseBody.trip_type = req.query.trip_type;
  responseBody.estimated_time = directionsResponse.data.estimated_time.repr;
  responseBody.distance = directionsResponse.data.distance.repr;
  responseBody.estimated_price = pricingResponse.data.estimated_price;

  return reply.status(200).send(responseBody);
}

module.exports = tripPrice;
