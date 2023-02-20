/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  Given, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

Given('registro un pasajero con usuario {string} y ubicacion preferida {string}', async function (username, preferredLocationAddress) {
  const payload = {
    username,
    email: `${username}@${username}.com`,
    first_name: username,
    last_name: username,
    phone_number: '15555555',
    preferred_location_name: preferredLocationAddress,
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload,
  });
  this.full_rider_response = response;
  assert.equal(response.statusCode, 201);
  this.riders[username] = response.json();
});

Given('registro un chofer con usuario {string}', async function (username) {
  const payload = {
    username,
    email: `${username}@${username}.com`,
    first_name: username,
    last_name: username,
    phone_number: '15555555',
    preferred_location_name: 'Av. Paseo Colón 850, Buenos Aires',
    car_plate: 'AAA 123',
    car_manufacturer: 'Toyota',
    car_model: 'Corolla',
    car_year_of_production: 2015,
    car_color: 'Red',
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/drivers',
    payload,
  });
  this.full_driver_response = response;
  this.drivers[username] = response.json();
});

Given('como pasajero {string} solicito iniciar un viaje normal hacia {string}', async function (username, destination) {
  const body = {
    rider_username: this.riders[username].username,
    rider_origin_address: this.riders[username].preferred_location_name,
    rider_destination_address: destination,
    trip_type: 'regular',
  };
  this.tripResponse = await app.inject({
    method: 'POST',
    url: '/api/v1/trips',
    payload: body,
  });
  this.requested_trips[username] = this.tripResponse.json();
  assert.equal(this.tripResponse.statusCode, 201);
});

Then('uno de los viajes es del usuario {string}', function (username) {
  const names = this.allAvailableTrips.map((trip) => trip.rider_username);
  assert.equal(names.includes(username), true);
});

Then('el viaje {int} es del usuario {string}', function (priority, username) {
  const riderTrip = this.allAvailableTrips.filter((trip) => trip.rider_username === username)[0];
  assert.equal(riderTrip.priority, priority);
});
