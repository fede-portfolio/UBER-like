Tech Stack
==========

The following technologies were used to develop this project:

Web Frameworks
--------------

FastAPI
~~~~~~~

**Website**: https://fastapi.tiangolo.com/

Most microservices were implemented using this Python framework (in fact, all of them except the API Gateway and
the payments microservice)

We found using FastAPI very straightforward, its automatic API documentation and validations were really helpful.

Fastify
~~~~~~~

**Website**: https://www.fastify.io/

Given the technical requirement of using both Python and Javascript as backend languages, we decided Fastify was
a suitable choice for the API Gateway because of its features: extensibility and high performance being the most
important ones.

DBMS
----

PostgreSQL
~~~~~~~~~~

**Website**: https://www.postgresql.org/

Users, Trips, and Pricing Rules were persisted using PostgreSQL.

MongoDB
~~~~~~~

**Website**: https://www.mongodb.com/

We used MongoDB for storing ratings and payments data.

PaaS
----

**Website**: https://www.heroku.com

All microservices were deployed to Heroku via Docker containers.


Programming Languages & Libraries
---------------------------------

Python 3.10.7
~~~~~~~~~~~~~

- psycopg2-binary: 2.9.3
- flake8: 5.0.4
- coverage: 6.4.4
- pytest: 7.1.3
- behave: 1.2.6
- uvicorn: 0.18.3
- fastapi: 0.85.0
- requests: 2.28.1
- prometheus-client: 0.15.0
- firebase--admin: 6.0.1
- pymongo: 4.3.2
- exponent-server-sdk: 2.0.0
- sqlalchemy: 1.4.41
- alembic: 1.8.1
- email-validator: 1.3.0
- passlib: 1.7.4

Javascript ES6
~~~~~~~~~~~~~~

- @fastify/swagger: ^7.6.1
- axios: ^0.27.2
- fastify: ^4.8.1
- fastify-plugin: ^4.2.1
- firebase-admin: ^10.0.0
- @cucumber/cucumber: ^8.6.0
- @cucumber/pretty-formatter: ^1.0.0
- eslint: ^8.27.0
- eslint-config-airbnb-base: ^15.0.0
- eslint-plugin-import: ^2.26.0
- nodemon: ^2.0.20
- pg: ^8.8.0
- tap: ^16.3.0