/* eslint-disable */
const axios = require('axios');
const settings = require('../../conf/config');

// FIXME: reuse

async function responseToTrip(tripResponse, priority) {
  let riderAvgRating;
  let riderQualyAvgGetRresponse;
  try {
    riderQualyAvgGetRresponse = await axios.get(`${settings.serviceUsersURL()}/riders/${tripResponse.rider_username}/qualy/average`);
    riderAvgRating = riderQualyAvgGetRresponse.data;
  } catch (error) {
    riderAvgRating = -1;
  }
  
  const origin = {};
  origin.address = tripResponse.origin.address;
  origin.latitude = tripResponse.origin.latitude;
  origin.longitude = tripResponse.origin.longitude;

  const destination = {};
  destination.address = tripResponse.destination.address;
  destination.latitude = tripResponse.destination.latitude;
  destination.longitude = tripResponse.destination.longitude;

  const responseBody = {};
  responseBody.trip_id = tripResponse.id;
  responseBody.origin = origin;
  responseBody.destination = destination;
  responseBody.trip_type = tripResponse.type;
  responseBody.estimated_time = tripResponse.estimated_time;
  responseBody.distance = tripResponse.distance;
  responseBody.estimated_price = tripResponse.estimated_price;
  responseBody.trip_state = tripResponse.state;
  responseBody.rider_username = tripResponse.rider_username;
  responseBody.rider_rating = riderAvgRating;

  responseBody.priority = priority;

  return responseBody;
}

async function tripGetForDriver(req, reply) {
  const tripsURI = `${settings.serviceTripsURL()}/trips`;
  const params = {
    driver_username: req.query.driver_username,
    trip_state: req.query.trip_state,
    offset: req.query.offset,
    limit: req.query.limit,
  };
  let tripResponse;
  try {
    tripResponse = await axios.get(tripsURI, { params });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }
  const foundTrips = [];

  let priority = 1;
  for (const trip of tripResponse.data) {
    const formatTrip = await responseToTrip(trip, priority);
    priority += 1;
    foundTrips.push(formatTrip);
  }
  /*
  tripResponse.data.forEach((trip) => {
    foundTrips.push(responseToTrip(trip));
  });*/

  return reply.status(200).send(foundTrips);
}

module.exports = tripGetForDriver;
