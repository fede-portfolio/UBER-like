const riderInformationSchema = {
  type: 'object',
  properties: {
    phone_number: {
      type: 'string',
      example: '+541188888888',
    },
    wallet: {
      type: 'string',
      example: 'as4d65a4s654aeeg54a6s5d4',
    },
    preferred_location_name: {
      type: 'string',
      example: 'Av. Paseo Colón 850',
    },
    avg_rating: {
      type: 'number',
      example: 3.8,
    },
  },
};

const carInformationSchema = {
  type: 'object',
  properties: {
    plate: {
      type: 'string',
      example: 'AAA 123',
    },
    manufacturer: {
      type: 'string',
      example: 'Audi',
    },
    model: {
      type: 'string',
      example: 'TT',
    },
    year_of_production: {
      type: 'integer',
      example: 2022,
    },
    color: {
      type: 'string',
      example: 'Black',
    },
  },
};

const driverInformationSchema = {
  type: 'object',
  properties: {
    phone_number: {
      type: 'string',
      example: '+541155555555',
    },
    wallet: {
      type: 'string',
      example: 'as4d65a4s654aeeg54a6s5d4',
    },
    preferred_location_name: {
      type: 'string',
      example: 'Av. Paseo Colón 850',
    },
    avg_rating: {
      type: 'number',
      example: 4.3,
    },
    car: carInformationSchema,
  },
};

const userInformationSchema = {
  username: {
    type: 'string',
    example: 'cool_username',
  },
  email: { type: 'string' },
  first_name: {
    type: 'string',
    example: 'fname',
  },
  last_name: {
    type: 'string',
    example: 'lname',
  },
  rider_information: riderInformationSchema,
  driver_information: driverInformationSchema,
};

const userNotFoundSchema = {
  message: { type: 'string', default: 'Error. User not found.' },
  username: { type: 'string', example: 'mateo' },
};

exports.userInformationSchema = userInformationSchema;
exports.userNotFoundSchema = userNotFoundSchema;
