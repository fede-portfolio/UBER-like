/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('Realizo una busqueda por email con {string}', async function (email) {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users/search',
    query: { email },
  });
  assert.equal(response.statusCode, 200);
  this.found_users = response.json();
  [this.searched_user] = this.found_users;
});

Then('Obtengo un pasajero con email {string}', function (searchedEmail) {
  assert.equal(searchedEmail, this.searched_user.email);
});

Then('No obtengo un pasajero con email {string}', function (searchedEmail) {
  this.found_users.forEach((user) => {
    assert.notEqual(searchedEmail, user.email);
  });
});

When('Realizo una busqueda por username con {string}', async function (like) {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users/search',
    query: { like },
  });
  assert.equal(response.statusCode, 200);
  this.found_users = response.json();
});

Then('Obtengo {int} pasajeros cuyo username incluye {string}', function (nUsers, like) {
  assert.equal(nUsers, this.found_users.length);
  this.found_users.forEach((user) => {
    assert.equal(user.username.indexOf(like) >= 0, true);
  });
});
