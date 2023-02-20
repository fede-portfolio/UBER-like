// TODO: Move to env var
const API_PREFIX = '/api/v1';

const fastify = require('fastify');

// Plugins
const swagger = require('./plugins/swagger');
const auth = require('./auth/firebase_auth');
const authAdmin = require('./auth/auth_admin');
const testAuth = require('./auth/firebase_auth_test');

// Routes
const usersRoute = require('./routes/users/users');
const adminsRoute = require('./routes/admins/admins');
const ridersRoute = require('./routes/riders');
const driversRoute = require('./routes/drivers');
const locationsRoute = require('./routes/locations/locations');
const tripsRoute = require('./routes/trips/trips');
const healthcheckRoute = require('./routes/healthcheck');
const resetRoute = require('./routes/reset');
const driverQualy = require('./routes/drivers_qualy/drivers_qualy');
const riderQualy = require('./routes/riders_qualy/riders_qualy');
const pricingRoute = require('./routes/pricing/pricing-rules');
const paymentRoute = require('./routes/payments/paymentRoutes');
const tokenRoute = require('./routes/tokens/tokenRoutes');
const metricsRoute = require('./routes/metrics/metrics');

function buildServer() {
  const app = fastify({
    logger: true,
  });

  app.register(swagger);
  app.register(auth);
  app.register(authAdmin);
  app.register(resetRoute);
  app.register(usersRoute, { prefix: API_PREFIX });
  app.register(adminsRoute, { prefix: API_PREFIX });
  app.register(ridersRoute, { prefix: API_PREFIX });
  app.register(driversRoute, { prefix: API_PREFIX });
  app.register(locationsRoute, { prefix: API_PREFIX });
  app.register(tripsRoute, { prefix: API_PREFIX });
  app.register(pricingRoute, { prefix: API_PREFIX });
  app.register(healthcheckRoute, { prefix: API_PREFIX });
  app.register(driverQualy, { prefix: API_PREFIX });
  app.register(riderQualy, { prefix: API_PREFIX });
  app.register(paymentRoute, { prefix: API_PREFIX });
  app.register(tokenRoute, { prefix: API_PREFIX });
  app.register(metricsRoute, { prefix: API_PREFIX });

  // eslint-disable-next-line consistent-return
  app.addHook('preHandler', (req, res, done) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', ['POST', 'PATCH']);
    res.header('Access-Control-Allow-Headers', '*');

    const isPreflight = /options/i.test(req.method);
    if (isPreflight) {
      return res.send();
    }
    done();
  });

  return app;
}

function buildTestServer() {
  const app = fastify({
    logger: false,
  });
  app.register(testAuth);
  app.register(resetRoute);
  app.register(usersRoute, { prefix: API_PREFIX });
  app.register(adminsRoute, { prefix: API_PREFIX });
  app.register(ridersRoute, { prefix: API_PREFIX });
  app.register(driversRoute, { prefix: API_PREFIX });
  app.register(locationsRoute, { prefix: API_PREFIX });
  app.register(tripsRoute, { prefix: API_PREFIX });
  app.register(pricingRoute, { prefix: API_PREFIX });
  app.register(healthcheckRoute, { prefix: API_PREFIX });
  app.register(driverQualy, { prefix: API_PREFIX });
  app.register(riderQualy, { prefix: API_PREFIX });
  app.register(metricsRoute, { prefix: API_PREFIX });

  return app;
}

exports.buildServer = buildServer;
exports.buildTestServer = buildTestServer;
