const driverQualyPostSchema = {
  description: 'Endpoint for creating drivers qualifications',
  tags: ['drivers qualy'],
  body: {
    description: 'Payload for creating a new driver qualy',
    type: 'object',
    properties: {
      rider_username: { type: 'string' },
      qualy: { type: 'number' },
      opinion: { type: 'string', default: 'No comments' },
      driver_username: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        rider_username: { type: 'string', example: 'juan' },
        qualy: { type: 'number', example: 4 },
        opinion: { type: 'string', example: 'good driver' },
        driver_username: { type: 'string', example: 'franco' },
      },
    },
  },
  400: {
    description: 'Failed Response',
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Qualy puntuation is over 5' },
    },
  },
};

const driverQualyAvgGETSchema = {
  description: 'Get the average qualification of a driver',
  tags: ['drivers qualy'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    200: {
      description: 'Success Response',
      type: 'number',
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. User not found.' },
        username: { type: 'string' },
      },
    },
  },
};

const driverQualyGETSchema = {
  description: 'Get the qualification of a driver',
  tags: ['drivers qualy'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    200: {
      description: 'Success Response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          rider_username: { type: 'string' },
          qualy: { type: 'number' },
          opinion: { type: 'string' },
          driver_username: { type: 'string' },
        },
      },
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. User not found.' },
        username: { type: 'string' },
      },
    },
  },
};

exports.driverQualyPostSchema = driverQualyPostSchema;
exports.driverQualyGETSchema = driverQualyGETSchema;
exports.driverQualyAvgGETSchema = driverQualyAvgGETSchema;
