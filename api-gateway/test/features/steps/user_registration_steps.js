/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const settings = require('../../../src/conf/config');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

Given('No hay usuarios registrados', async function () {
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
});

When('Me registro como pasajero con email {string}', async function (email) {
  const username = email.split('@')[0];
  this.registered_username = username;
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    phone_number: '1234567788',
    preferred_location_name: 'El Monumental',
  };
  this.response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

Given('Me registro como pasajero con email {string} y usuario {string}', async function (email, username) {
  this.registered_username = username;
  this.registered_email = email;
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    phone_number: '1234567788',
    preferred_location_name: 'El Monumental',
  };
  this.response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

Then('Un pasajero con email {string} es creado', async function (userEmail) {
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${this.registered_username}`,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().email, userEmail);
});

When('Me registro como pasajero con email {string} y ubicación preferida {string}', async function (email, preferredLocation) {
  const username = email.split('@')[0];
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    phone_number: '1234567788',
    preferred_location_name: preferredLocation,
  };
  this.response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

Then('La ubicación preferida para el pasajero con email {string} es {string}', async function (email, preferredLocation) {
  const username = email.split('@')[0];
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${username}`,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().rider_information.preferred_location_name, preferredLocation);
});

When('Quiero registrarme como chofer con email {string}', function (email) {
  this.driver_data = {};
  [this.driver_data.username] = email.split('@');
  this.driver_data.email = email;
  this.driver_data.first_name = 'fname';
  this.driver_data.last_name = 'lname';
  this.driver_data.phone_number = '+54123';
  this.driver_data.preferred_location_name = 'Av Paseo Colón 850';
});

When('quiero registrar patente del auto {string}', function (carPlate) {
  this.driver_data.car_plate = carPlate;
});

When('quiero registrar fabricante del auto {string}', function (carManufacturer) {
  this.driver_data.car_manufacturer = carManufacturer;
});

When('quiero registrar modelo del auto {string}', function (carModel) {
  this.driver_data.car_model = carModel;
});

When('quiero registrar año de fabricación del auto {int}', function (carYearOfProduction) {
  this.driver_data.car_year_of_production = carYearOfProduction;
});

When('quiero registrar color del auto {string}', function (carColor) {
  this.driver_data.car_color = carColor;
});

When('me registro como chofer', async function () {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/drivers',
    payload: this.driver_data,
  });
  this.full_response = response;
  this.response = response.json();
});

Given('me registro como chofer {string}', async function (username) {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/drivers',
    payload: this.driver_data,
  });
  this.drivers[username] = response.json();
});

Given('me registro como pasajero {string}', async function (username) {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: this.rider_data,
  });
  this.riders[username] = response.json();
});

Then('La patente del auto registrado es {string}', function (carPlate) {
  assert.equal(this.response.car_plate, carPlate);
});

Then('el fabricante del auto es {string}', function (carManufacturer) {
  assert.equal(this.response.car_manufacturer, carManufacturer);
});

Then('el modelo del auto es {string}', function (carModel) {
  assert.equal(this.response.car_model, carModel);
});

Then('el año de fabricación del auto es {int}', function (carYearOfProduction) {
  assert.equal(this.response.car_year_of_production, carYearOfProduction);
});

Then('el color del auto es {string}', function (carColor) {
  assert.equal(this.response.car_color, carColor);
});

Given('el registro fallara por un error del servicio', function () {
  settings.changeServiceURL('users', 'invalid');
});

Then('se devuelve un mensaje de error {string}', function (message) {
  assert.equal(this.full_response.statusCode, 503);
  // TODO: Normalizar el this.full_response, se accede de varios steps
  //       en varios escenarios
  assert.equal(this.full_response.json().message, message);
});

Given('Me registro como pasajero con nombre de usuario {string}', async function (username) {
  const email = `${username}@${username}.com`;
  this.registered_username = username;
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    phone_number: '1234567788',
    preferred_location_name: 'El Monumental',
  };
  this.response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

Then('obtengo un chofer con email {string}', function (email) {
  assert.equal(this.searched_user.email, email);
});

Then('obtengo un chofer con patente del auto {string}', function (plate) {
  assert.equal(this.searched_user.driver_information.car.plate, plate);
});

Then('obtengo un chofer con fabricante del auto {string}', function (manufacturer) {
  assert.equal(this.searched_user.driver_information.car.manufacturer, manufacturer);
});

Then('obtengo un chofer con color de auto {string}', function (color) {
  assert.equal(this.searched_user.driver_information.car.color, color);
});

Then('el usuario {string} tiene tanto datos de chofer como de pasajero', async function (username) {
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${username}`,
  });
  assert.equal(response.statusCode, 200);
  assert.notEqual(response.json().rider_information.phone_number, undefined);
});
