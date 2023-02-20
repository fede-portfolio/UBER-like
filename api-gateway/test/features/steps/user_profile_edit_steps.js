/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('Quiero registrarme como pasajero con usuario {string}', function (username) {
  this.rider_data = {};
  this.rider_data.username = username;
});

When('quiero registrarme como pasajero con email {string}', function (email) {
  this.rider_data.email = email;
});

When('quiero registrarme como pasajero con nombre {string}', function (fName) {
  this.rider_data.first_name = fName;
});

When('quiero registrarme como pasajero con apellido {string}', function (lName) {
  this.rider_data.last_name = lName;
});

When('quiero registrarme como pasajero con telefono {string}', function (phoneNumber) {
  this.rider_data.phone_number = phoneNumber;
});

When('quiero registrarme como pasajero con ubicacion preferida {string}', function (locationName) {
  this.rider_data.preferred_location_name = locationName;
});

When('me registro como pasajero', async function () {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: this.rider_data,
  });
  this.full_rider_response = response;
  this.rider_response = response.json();
  this.currentRider = response.json();
});

When('como pasajero con email {string} cambio mi nombre a {string}', async function (email, newName) {
  const payload = {
    first_name: newName,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/riders/${email}/status`,
    payload,
  });
  this.full_rider_response = response;
  this.rider_response = response.json();
});

Then('El nombre del pasajero con email {string} cambio a {string}', function (email, name) {
  assert.equal(this.full_rider_response.statusCode, 202);
  assert.equal(this.rider_response.first_name, name);
  assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi apellido a {string}', async function (email, newLName) {
  const payload = {
    last_name: newLName,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/riders/${email}/status`,
    payload,
  });
  this.full_rider_response = response;
  this.rider_response = response.json();
});

Then('El apellido del pasajero con email {string} cambio a {string}', function (email, lName) {
  assert.equal(this.full_rider_response.statusCode, 202);
  assert.equal(this.rider_response.last_name, lName);
  assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi telefono a {string}', async function (email, newPhoneNumber) {
  const payload = {
    phone_number: newPhoneNumber,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/riders/${email}/status`,
    payload,
  });
  this.full_rider_response = response;
  this.rider_response = response.json();
});

Then('El telefono del pasajero con email {string} cambio a {string}', function (email, phoneNumber) {
  assert.equal(this.full_rider_response.statusCode, 202);
  assert.equal(this.rider_response.phone_number, phoneNumber);
  assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi ubicacion preferida a {string}', async function (email, newLocationName) {
  const payload = {
    preferred_location_name: newLocationName,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/riders/${email}/status`,
    payload,
  });
  this.full_rider_response = response;
  this.rider_response = response.json();
});

Then('La ubicacion preferida del pasajero con email {string} cambio a {string}', function (email, locationName) {
  assert.equal(this.full_rider_response.statusCode, 202);
  assert.equal(this.rider_response.preferred_location_name, locationName);
  assert.equal(this.rider_response.email, email);
});

When('Quiero registrarme como chofer con usuario {string}', function (username) {
  this.driver_data = {};
  this.driver_data.username = username;
});

When('quiero registrarme como chofer con email {string}', function (email) {
  this.driver_data.email = email;
});

When('quiero registrarme como chofer con nombre {string}', function (fName) {
  this.driver_data.first_name = fName;
});

When('quiero registrarme como chofer con apellido {string}', function (lName) {
  this.driver_data.last_name = lName;
});

When('quiero registrarme como chofer con telefono {string}', function (phoneNumber) {
  this.driver_data.phone_number = phoneNumber;
});

When('quiero registrarme como chofer con ubicacion preferida {string}', function (locationName) {
  this.driver_data.preferred_location_name = locationName;
});

When('como chofer con email {string} cambio mi nombre a {string}', async function (email, newName) {
  const payload = {
    first_name: newName,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/drivers/${email}/status`,
    payload,
  });
  this.full_driver_response = response;
  this.driver_response = response.json();
});

Then('El nombre del chofer con email {string} cambio a {string}', function (email, name) {
  assert.equal(this.full_driver_response.statusCode, 202);
  assert.equal(this.driver_response.first_name, name);
  assert.equal(this.driver_response.email, email);
});

When('como chofer con email {string} cambio mi apellido a {string}', async function (email, newLastName) {
  const payload = {
    last_name: newLastName,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/drivers/${email}/status`,
    payload,
  });
  this.full_driver_response = response;
  this.driver_response = response.json();
});

Then('El apellido del chofer con email {string} cambio a {string}', function (email, lastName) {
  assert.equal(this.full_driver_response.statusCode, 202);
  assert.equal(this.driver_response.last_name, lastName);
  assert.equal(this.driver_response.email, email);
});

When('como chofer con email {string} cambio mi telefono a {string}', async function (email, newPhoneNumber) {
  const payload = {
    phone_number: newPhoneNumber,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/drivers/${email}/status`,
    payload,
  });
  this.full_driver_response = response;
  this.driver_response = response.json();
});

Then('El telefono del chofer con email {string} cambio a {string}', function (email, phone) {
  assert.equal(this.full_driver_response.statusCode, 202);
  assert.equal(this.driver_response.phone_number, phone);
  assert.equal(this.driver_response.email, email);
});

When('como chofer con email {string} cambio mi ubicacion preferida a {string}', async function (email, newLocationName) {
  const payload = {
    preferred_location_name: newLocationName,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/drivers/${email}/status`,
    payload,
  });
  this.full_driver_response = response;
  this.driver_response = response.json();
});

Then('La ubicacion preferida del chofer con email {string} cambio a {string}', function (email, locationName) {
  assert.equal(this.full_driver_response.statusCode, 202);
  assert.equal(this.driver_response.preferred_location_name, locationName);
  assert.equal(this.driver_response.email, email);
});
