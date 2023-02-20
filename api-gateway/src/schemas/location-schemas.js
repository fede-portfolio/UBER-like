const locationSchema = {
  address: {
    type: 'string',
    example: 'Av. Paseo Colón 850, Buenos Aires',
  },
  latitude: {
    type: 'number',
    example: -33.1234,
  },
  longitude: {
    type: 'number',
    example: -54.1234,
  },
};

const locationNotFoundSchema = {
  message: { type: 'string', example: 'Location not found.' },
};

exports.locationSchema = locationSchema;
exports.locationNotFoundSchema = locationNotFoundSchema;
