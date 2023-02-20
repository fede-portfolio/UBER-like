const axios = require('axios');
const settings = require('../../conf/config');

function locationFromResponse(response) {
  return {
    address: response.address,
    latitude: response.latitude,
    longitude: response.longitude,
  };
}

async function getDriverData(driverUsername) {
  const route = `${settings.serviceUsersURL()}/users/${driverUsername}`;
  const userResponse = await axios.get(route);
  const response = {};
  const { username } = userResponse.data;
  response.username = username;
  response.first_name = userResponse.data.first_name;
  response.last_name = userResponse.data.last_name;

  const driverResponse = await axios.get(
    `${settings.serviceUsersURL()}/drivers/${userResponse.data.email}`,
    { validateStatus: false },
  );

  if (driverResponse.status === 200) {
    response.car = {
      plate: driverResponse.data.car_plate,
      manufacturer: driverResponse.data.car_manufacturer,
      model: driverResponse.data.car_model,
      color: driverResponse.data.car_color,
    };
  }
  return response;
}

async function tripGet(req, reply) {
  const tripsURI = `${settings.serviceTripsURL()}/trips/${req.params.id}`;
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

  const origin = locationFromResponse(tripResponse.data.origin);
  const destination = locationFromResponse(tripResponse.data.destination);

  const responseBody = {};
  responseBody.trip_id = tripResponse.data.id;
  responseBody.rider_username = tripResponse.data.rider_username;
  responseBody.origin = origin;
  responseBody.destination = destination;
  responseBody.trip_type = tripResponse.data.type;
  responseBody.estimated_time = tripResponse.data.estimated_time;
  responseBody.distance = tripResponse.data.distance;
  responseBody.estimated_price = tripResponse.data.estimated_price;
  responseBody.trip_state = tripResponse.data.state;
  const ongoingStates = [
    'accepted_by_driver',
    'driver_arrived',
    'start_confirmed_by_driver',
    'finished_confirmed_by_driver',
  ];
  if (ongoingStates.includes(responseBody.trip_state)) {
    responseBody.driver = await getDriverData(tripResponse.data.driver_username);
    responseBody.driver.latitude = tripResponse.data.driver_latitude;
    responseBody.driver.longitude = tripResponse.data.driver_longitude;
  }

  return reply.status(200).send(responseBody);
}

module.exports = tripGet;
