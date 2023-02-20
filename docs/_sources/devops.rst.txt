
DevOps
======

Feature Branching
-----------------

Most features were implemented in its own branch, and then merged into the main
branch using *GitHub's pull requests*. This workflow allows not only code reviews
by pairs but also enable running automatic tasks:

- Linting
- Running automated tests
- Making an automatic deployment if all checks were successful

Docker
------

*Docker* was used heavily throughout all stages of development. Each microservice
has its own Dockerfile, and a docker compose file is provided for running the
project locally.

Image Building
~~~~~~~~~~~~~~

As we'll see in the automatic deployment section, each microservice is deployed
to Heroku automatically on every merged pull request.

Dependency Management
~~~~~~~~~~~~~~~~~~~~~

Using latest features of docker build engine, some layers were added conditionally.
This was key for mantaining small images, avoiding the overhead of adding dependencies
that were only used locally in the production code.

.. code-block:: console
    
    $ docker images | grep fiuber
    fiuber.service-trips          dev    9a70a5e9332e   11 days ago    373MB
    fiuber.service-payments       dev    84eb62b0b03c   2 weeks ago    970MB
    fiuber.service-metrics        dev    38114bcab3c4   3 weeks ago    220MB
    fiuber.service-users          dev    4cc2610a50ac   4 weeks ago    238MB
    fiuber.api-gateway            dev    db71c5eae91d   4 weeks ago    395MB
    fiuber.service-pricing        dev    1dcc9382b25b   6 weeks ago    225MB

Environment Variables
~~~~~~~~~~~~~~~~~~~~~

An `env.example` file is provided in the main repo to ensure each developer
can run the project locally.

Production environment variables were set manually in Heroku.

Database Migrations
-------------------

All database migrations were done using the *alembic* python library.

Automatic Deployment
--------------------

On each merged pull request, an automatic deployment to Heroku was triggered.
This was done using 3rd party *GitHub Actions*.

Testing
-------

For unit testing, a combination of the libraries ``coverage``, ``pytest``
and ``behave`` was set up in the Python side of things.

For integration tests, ``cucumber`` was used in the API Gateway.

Coverage
~~~~~~~~

Despite the fact that on each run the percentage of lines of code covered
was informed by the test runner, more detailed reports were automatically
set up via *Coveralls*.

Linting
-------

Linting was enforced and checked using GitHub actions too. ``flake8`` was used
in Python, whereas ``eslint`` was used in Javascript.