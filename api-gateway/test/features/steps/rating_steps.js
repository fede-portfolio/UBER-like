/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('como pasajero {string} califico al chofer {string} con {int} estrellas', async function (rider, driver, stars) {
  const body = {
    rider_username: rider,
    qualy: stars,
    opinion: 'no comments',
    driver_username: driver,
  };
  this.rating_creation_response = await app.inject({
    method: 'POST',
    url: '/api/v1/drivers/qualy/create',
    payload: body,
  });
  assert.equal(this.rating_creation_response.statusCode, 201);
});

Then('la calificacion promedio del chofer {string} es {float}', async function (driver, stars) {
  this.rating_get_response = await app.inject({
    method: 'GET',
    url: `/api/v1/drivers/${driver}/qualy/average`,
  });
  assert.equal(this.rating_get_response.statusCode, 200);
  assert.equal(this.rating_get_response.json(), stars);
});

When('como chofer {string} califico al pasajero {string} con {int} estrellas', async function (driver, rider, stars) {
  const body = {
    rider_username: rider,
    qualy: stars,
    opinion: 'no comments',
    driver_username: driver,
  };
  this.rating_creation_response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders/qualy/create',
    payload: body,
  });
  assert.equal(this.rating_creation_response.statusCode, 201);
});

Then('la calificacion promedio del pasajero {string} es {float}', async function (rider, stars) {
  this.rating_get_response = await app.inject({
    method: 'GET',
    url: `/api/v1/riders/${rider}/qualy/average`,
  });
  assert.equal(this.rating_get_response.statusCode, 200);
  assert.equal(this.rating_get_response.json(), stars);
});
