/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When,
} = require('@cucumber/cucumber');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('obtengo los usuarios con username_like {string} offset {int} limit {int}', async function (like, offset, limit) {
  const query = {
    offset,
    limit,
  };
  if (like && (like !== '')) {
    query.username_like = like;
  }

  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users/',
    query,
  });
  this.found_users = response.json();
});
