/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const settings = require('../../../src/conf/config');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('El administrador por defecto registra al usuario con nombre de usuario {string} como administrador', async function (username) {
  const body = { username };
  this.full_response = await app.inject({
    method: 'POST',
    url: '/api/v1/admins',
    payload: body,
  });
});

Then('Existe un administrador con nombre de usuario {string}', async function (username) {
  assert.equal(this.full_response.statusCode, 201);
  this.full_response = await app.inject({
    method: 'GET',
    url: `api/v1/admins/${username}`,
  });
  assert.equal(this.full_response.statusCode, 200);
  assert.equal(this.full_response.json().username, username);
});

When('El administrador por defecto registra un administrador sin nombre de usuario', async function () {
  this.full_response = await app.inject({
    method: 'POST',
    url: '/api/v1/admins',
    payload: { username: '' },
  });
});

Then('El sistema indicará que falta el nombre de usuario con mensaje {string}', function (msg) {
  assert.equal(this.full_response.json().message, msg);
});

Then('el sistema no permitirá el registro', function () {
  assert.equal(this.full_response.statusCode, 422);
});

Given('El registro de administrador fallará por un error de servicio', function () {
  settings.changeServiceURL('users', 'invalid');
});
