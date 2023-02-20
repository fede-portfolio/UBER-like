/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('solicito cotizar un viaje {string} hacia {string}', async function (type, destinationLocationName) {
  const originLocationName = this.currentRider.preferred_location_name;

  this.pricingResponse = await app.inject({
    method: 'GET',
    url: '/api/v1/trips/price',
    query: {
      origin_address: originLocationName,
      destination_address: destinationLocationName,
      trip_type: type,
    },
  });
  this.pricedTrip = this.pricingResponse.json();
});

Then('se devuelve el precio para el viaje', function () {
  const price = this.pricedTrip.estimated_price;
  assert(typeof price === 'string', `type was: ${typeof price}`);
});

Then('se devuelve como nombre de origen {string}', function (address) {
  assert.equal(this.pricedTrip.origin.address, address);
});

Then('se devuelve como latitud de origen aproximadamente {float}', function (locationLatitude) {
  // https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
  const obtainedLatitude = this.pricedTrip.origin.latitude.toFixed(4);
  const desiredLatitude = locationLatitude.toFixed(4);
  const delta = Math.abs(obtainedLatitude - desiredLatitude);
  assert(delta <= 0.005);
});

Then('se devuelve como longitud de origen aproximadamente {float}', function (locationLongitude) {
  const obtainedLongitude = this.pricedTrip.origin.longitude.toFixed(4);
  const desiredLongitude = locationLongitude.toFixed(4);
  const delta = Math.abs(obtainedLongitude - desiredLongitude);
  assert(delta <= 0.005, `was: ${delta}`);
});

Then('se devuelve como nombre de destino {string}', function (address) {
  assert.equal(this.pricedTrip.destination.address, address);
});

Then('se devuelve como latitud de destino aproximadamente {float}', function (destinationLongitude) {
  const obtainedLatitude = this.pricedTrip.destination.latitude.toFixed(4);
  const desiredLatitude = destinationLongitude.toFixed(4);
  const delta = Math.abs(obtainedLatitude - desiredLatitude);
  assert(delta <= 0.0005);
});

Then('se devuelve como longitud de destino aproximadamente {float}', function (destinationLongitude) {
  const obtainedLongitude = this.pricedTrip.destination.longitude.toFixed(4);
  const desiredLongitude = destinationLongitude.toFixed(4);
  const delta = Math.abs(obtainedLongitude - desiredLongitude);
  assert(delta <= 0.0005);
});

Then('se devuelve un tiempo estimado', function () {
  // const floatRegex = /^[+-]?([0-9]*[.])?[0-9]+$/i;
  const time = this.pricedTrip.estimated_time;
  // const [value, unit] = time.split(' ');
  assert(time.includes('hr') || time.includes('mins'));
  // assert(floatRegex.test(value));
});

Then('se devuelve una distancia', function () {
  // FIXME IS NUMERIC AND km
  const { distance } = this.pricedTrip;
  const [value, unit] = distance.split(' ');
  assert(unit === 'm' || distance.includes('m'));
  let regex;
  if (unit === 'm') {
    regex = /^\d*$/;
  }
  if (unit === 'km') {
    regex = /^(\d*\.)?\d+$/gim;
  }
  assert(regex.test(value), `was: ${value}`);
});

Then('el precio calculado para el viaje es {string}', function (value) {
  assert.equal(this.pricedTrip.estimated_price, value);
});
