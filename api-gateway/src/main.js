const builder = require('./server');

const app = builder.buildServer();

app.listen({
  host: process.env.HOST,
  port: process.env.PORT,
});
