const axios = require('axios');
const settings = require('../../conf/config');

async function usersGetByUsername(req, reply) {
  const route = `${settings.serviceUsersURL()}/users/${req.params.username}`;
  const responseData = {};
  let userResponse;
  try {
    userResponse = await axios.get(route);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          message: 'Error. User not found',
          username: req.params.username,
        },
      );
    }
  }

  responseData.username = userResponse.data.username;
  responseData.email = userResponse.data.email;
  responseData.first_name = userResponse.data.first_name;
  responseData.last_name = userResponse.data.last_name;

  const riderResponse = await axios.get(
    `${settings.serviceUsersURL()}/riders/${responseData.email}`,
    { validateStatus: false },
  );

  if (riderResponse.status === 200) {
    let riderAvgRating;
    let riderQualyAvgGetRresponse;
    try {
      riderQualyAvgGetRresponse = await axios.get(`${settings.serviceUsersURL()}/riders/${req.params.username}/qualy/average`);
      riderAvgRating = riderQualyAvgGetRresponse.data;
    } catch (error) {
      riderAvgRating = -1;
    }

    responseData.rider_information = {};
    const riderInformation = responseData.rider_information;
    riderInformation.phone_number = riderResponse.data.phone_number;
    riderInformation.preferred_location_name = riderResponse.data.preferred_location_name;
    riderInformation.avg_rating = riderAvgRating;
  }

  const driverResponse = await axios.get(
    `${settings.serviceUsersURL()}/drivers/${responseData.email}`,
    { validateStatus: false },
  );

  if (driverResponse.status === 200) {
    let driverAvgRating;
    let driverQualyAvgGetRresponse;
    try {
      driverQualyAvgGetRresponse = await axios.get(`${settings.serviceUsersURL()}/drivers/${req.params.username}/qualy/average`);
      driverAvgRating = driverQualyAvgGetRresponse.data;
    } catch (error) {
      driverAvgRating = -1;
    }

    responseData.driver_information = {
      phone_number: driverResponse.data.phone_number,
      preferred_location_name: driverResponse.data.preferred_location_name,
      avg_rating: driverAvgRating,
    };
    responseData.driver_information.car = {
      plate: driverResponse.data.car_plate,
      manufacturer: driverResponse.data.car_manufacturer,
      model: driverResponse.data.car_model,
      year_of_production: driverResponse.data.car_year_of_production,
      color: driverResponse.data.car_color,
    };
  }

  return reply.status(200)
    .send(responseData);
}

module.exports = usersGetByUsername;
