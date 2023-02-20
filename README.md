# FI-UBER

This is the main repository of the project. Read [documentation](https://fiuber-docs.readthedocs.io/en/latest/) for instructions on how to build and run the application. 

## Setting up locally with docker-compose

```shell
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build
```

## Working with submodules

Clone repo and all its submodules:

```shell
git clone --recurse-submodules git@github.com:grupo4taller2/FI-UBER.git
```

## Running 


```shell
docker-compose up | colout "fiuber.api-gateway.dev" yellow | colout "fiuber.service-trips.dev" blue | colout "fiuber.service-users.dev" green | colout "fiuber.service-pricing.dev" purple
```

### Monitoring stats

```shell
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" | colout "fiuber.api-gateway.dev" yellow | colout "fiuber.service-trips.dev" blue | colout "fiuber.service-users.dev" green | colout "fiuber.service-pricing.dev" purple
```
