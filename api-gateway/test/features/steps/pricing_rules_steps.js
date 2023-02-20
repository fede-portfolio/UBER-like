/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const assert = require('assert');

const {
  Given, When, Then,
} = require('@cucumber/cucumber');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('como usuario {string} obtengo los coeficientes de cotizacion', async function (username) {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/pricing/rules',
  });
  assert.equal(response.statusCode, 200);
  this.found_rules = response.json();
  [this.current_rule] = this.found_rules;
});

Then('el coeficiente {string} llamado {string} es {string}', function (name, repr, value) {
  assert.equal(this.current_rule[repr], value);
});

When('quiero utilizar valor {string} para el coeficiente {string}', function (value, repr) {
  this.pricing_rules_coefficients[repr] = value;
});

When('creo una regla de cotizacion', async function () {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/pricing/rules',
    body: this.pricing_rules_coefficients,
  });
  assert.equal(response.statusCode, 201);
  this.current_rule = response.json();
});

When('modifico la regla de cotizacion', async function () {
  const ruleID = this.current_rule.id;
  const payload = {
    c_km: this.pricing_rules_coefficients.c_km,
    c_trips_last_30m: this.pricing_rules_coefficients.c_trips_last_30m,
    c_rating: this.pricing_rules_coefficients.c_rating,
    c_min_price: this.pricing_rules_coefficients.c_min_price,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/pricing/rules/${ruleID}`,
    payload,
  });
  this.current_rule = response.json();
  assert.equal(response.statusCode, 202);
});

When('quiero utilizar valor {string} para el parametro {string}', function (value, repr) {
  this.pricing_rules_arguments[`n_${repr.slice(2)}`] = value;
});

When('evaluo la regla de cotizacion', async function () {
  const body = { ...this.pricing_rules_coefficients, ...this.pricing_rules_arguments };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/pricing/rules/trial',
    body,
  });
  assert.equal(response.statusCode, 201);
  this.priceResponse = response.json();
});

Then('el precio calculado para la regla de cotizacion es {string}', function (value) {
  assert.equal(this.priceResponse.price, value);
});

When('activo la regla de cotizacion', async function () {
  const ruleID = this.current_rule.id;
  const payload = {
    active: true,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/pricing/rules/${ruleID}`,
    payload,
  });
  this.current_rule = response.json();
  assert.equal(response.statusCode, 202);
  assert.equal(response.json().active, true);
});

When('obtengo la regla de cotizacion', async function () {
  const ruleID = this.current_rule.id;
  const response = await app.inject({
    method: 'GET',
    url: `/api/v1/pricing/rules/${ruleID}`,
  });
  assert.equal(response.statusCode, 200);
  this.current_rule = response.json();
});

Given('desactivo la regla de cotizacion por defecto', async function () {
  const ruleID = 'DEFAULT_RULE';
  const payload = {
    active: false,
  };
  const response = await app.inject({
    method: 'PATCH',
    url: `/api/v1/pricing/rules/${ruleID}`,
    payload,
  });
  this.current_rule = response.json();
  assert.equal(response.statusCode, 202);
  assert.equal(response.json().active, false);
});
