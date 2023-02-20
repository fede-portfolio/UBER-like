/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('Realizo una búsqueda con dirección {string}', async function (address) {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/locations/search/',
    query: { address },
  });
  this.full_location_response = response;
  this.location_response = response.json();
});

Then('El resultado es una ubicación válida', function () {
  assert.equal(this.full_location_response.statusCode, 200);
});

Then('la latitud es aproximadamente {float}', function (latitude) {
  const obtainedLatitude = this.location_response.latitude;
  assert.equal(obtainedLatitude, latitude);
});

Then('la longitud es aproximadamente {float}', function (longitude) {
  const obtainedLongitude = this.location_response.longitude;
  assert.equal(obtainedLongitude, longitude);
});

Then('El resultado es una ubicación inválida', function () {
  assert.equal(this.full_location_response.statusCode, 404);
});

Then('se indica como mensaje de error {string}', function (message) {
  const obtainedMessage = this.location_response.message;
  assert.equal(obtainedMessage, message);
});
