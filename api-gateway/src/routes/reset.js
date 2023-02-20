// eslint-disable-next-line
const { Client } = require('pg');

async function resetPOST() {
  const client = new Client(process.env.DATABASE_URI);
  await client.connect();
  await client.query('TRUNCATE TABLE requested_trips, cars, drivers, riders, users, pricing_rules CASCADE;');
  await client.query("INSERT INTO pricing_rules (id, c_km, c_trips_last_30m, c_rating, c_min_price, active) VALUES ('DEFAULT_RULE', '1.23', '2.34', '3.45', '4.56', TRUE)");
  await client.end();
}

async function resetRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/reset',
    {
      handler: resetPOST,
    },
  );
  done();
}

module.exports = resetRoutes;
