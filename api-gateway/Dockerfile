ARG APP_ENV=production

FROM node:18.9.0-slim as base

LABEL version="0.1.0"
LABEL description="FI-UBER API Gateway docker image"
LABEL maintainer="Mateo Calvo <macalvo@fi.uba.ar>"

# RUN addgroup --system fiuber && adduser --system --group fiuber

WORKDIR /opt/app

#COPY --chown=fiuber:fiuber package*.json .eslintrc.js ./
COPY package*.json .eslintrc.js ./
# RUN chown -R fiuber:fiuber /opt/app /tmp && \
# RUN npm install

RUN npm install && npm audit fix && npm cache clean --force

FROM base as production-preinstall

COPY src ./src
# USER fiuber

CMD bash -c 'node ./src/main'

FROM base as development-preinstall
RUN npm install nodemon \
    eslint eslint-config-airbnb-base eslint-plugin-import \
    tap
# USER fiuber
CMD bash

FROM ${APP_ENV}-preinstall as final
