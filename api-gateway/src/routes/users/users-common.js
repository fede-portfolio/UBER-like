const axios = require('axios');
const settings = require('../../conf/config');

async function fetchRiderData(email) {
  const riderResponse = await axios.get(
    `${settings.serviceUsersURL()}/riders/${email}`,
    { validateStatus: false },
  );
  let result = {};
  if (riderResponse.status === 200) {
    result = {
      phone_number: riderResponse.data.phone_number,
      preferred_location_name: riderResponse.data.preferred_location_name,
    };
  }
  return result;
}

async function fetchDriverData(email) {
  const driverResponse = await axios.get(
    `${settings.serviceUsersURL()}/drivers/${email}`,
    { validateStatus: false },
  );
  let result = {};
  if (driverResponse.status === 200) {
    result = driverResponse.data;
  }
  return {
    phone_number: result.phone_number,
    preferred_location_name: result.preferred_location_name,
    car: {
      plate: result.car_plate,
      manufacturer: result.car_manufacturer,
      model: result.car_model,
      year_of_production: result.car_year_of_production,
      color: result.car_color,
    },
  };
}

async function fetchUserData(user) {
  const fullUserData = user;
  fullUserData.rider_information = await fetchRiderData(user.email);
  fullUserData.driver_information = await fetchDriverData(user.email);
  return fullUserData;
}

exports.fetchDriverData = fetchDriverData;
exports.fetchRiderData = fetchRiderData;
exports.fetchUserData = fetchUserData;
