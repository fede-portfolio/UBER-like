const riderRequestTripSchema = {
  rider_username: { type: 'string' },
  rider_origin_address: { type: 'string' },
  rider_destination_address: { type: 'string' },
  trip_type: { type: 'string' },
};

const requestedByRiderTripSchema = {
  trip_id: {
    type: 'string',
    example: 'a9eca685e679d5c8679ed5',
  },
  rider_username: {
    type: 'string',
    example: 'mateo95',
  },
  rider_rating: {
    type: 'number',
    example: 3.8,
  },
  origin: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Av. Paseo Colón 850, Buenos Aires' },
      latitude: { type: 'number', example: -34.6174635 },
      longitude: { type: 'number', example: -58.369979 },
    },
  },
  destination: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Gral. Las Heras 2214, Buenos Aires' },
      latitude: { type: 'number', example: -34.5885454 },
      longitude: { type: 'number', example: -58.3984251 },
    },
  },
  trip_type: { type: 'string', example: 'regular' },
  estimated_time: { type: 'string', example: '17 mins' },
  estimated_price: { type: 'string', example: '0.35' },
  distance: { type: 'string', example: '6.3 km' },
  timestamp: { type: 'string', format: 'date-time' },
  trip_state: { type: 'string', example: 'driver_arrived' },
  priority: { type: 'integer', example: 3 },
};

const estimatedTripSchema = {
  origin: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Av. Paseo Colón 850, Buenos Aires' },
      latitude: { type: 'number', example: -34.6174635 },
      longitude: { type: 'number', example: -58.369979 },
    },
  },
  destination: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Gral. Las Heras 2214, Buenos Aires' },
      latitude: { type: 'number', example: -34.5885454 },
      longitude: { type: 'number', example: -58.3984251 },
    },
  },
  trip_type: { type: 'string', example: 'regular' },
  estimated_time: { type: 'string', example: '17 mins' },
  estimated_price: { type: 'string', example: '0.35' },
  distance: { type: 'string', example: '6.3 km' },
  // FIXME: agregar la ruta encodeada aca?
};

const acceptedByDriverTripSchema = {
  trip_id: {
    type: 'string',
    example: 'a9eca685e679d5c8679ed5',
  },
  rider_username: {
    type: 'string',
    example: 'mateo95',
  },
  origin: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Av. Paseo Colón 850, Buenos Aires' },
      latitude: { type: 'number', example: -34.6174635 },
      longitude: { type: 'number', example: -58.369979 },
    },
  },
  destination: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Gral. Las Heras 2214, Buenos Aires' },
      latitude: { type: 'number', example: -34.5885454 },
      longitude: { type: 'number', example: -58.3984251 },
    },
  },
  trip_type: { type: 'string', example: 'regular' },
  estimated_time: { type: 'string', example: '17 mins' },
  estimated_price: { type: 'string', example: '0.35' },
  distance: { type: 'string', example: '6.3 km' },
  timestamp: { type: 'string', format: 'date-time' },
  trip_state: { type: 'string', example: 'driver_arrived' },
  driver: {
    type: 'object',
    properties: {
      username: { type: 'string', example: 'driver_username' },
      first_name: { type: 'string', example: 'Mateo' },
      last_name: { type: 'string', example: 'Calvo' },
      latitude: { type: 'number', example: -34.5885454 },
      longitude: { type: 'number', example: -58.3984251 },
      car: {
        type: 'object',
        properties: {
          plate: { type: 'string', example: 'AAA 123' },
          manufacturer: { type: 'string', example: 'Ford' },
          model: { type: 'string', example: 'Sierra' },
          color: { type: 'string', example: 'Bourdeau' },
        },
      },
    },
  },
};

exports.riderRequestTripSchema = riderRequestTripSchema;
exports.requestedByRiderTripSchema = requestedByRiderTripSchema;
exports.estimatedTripSchema = estimatedTripSchema;
exports.acceptedByDriverTripSchema = acceptedByDriverTripSchema;
