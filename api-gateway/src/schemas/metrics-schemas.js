const tripMetricSchema = {
  driver_username: { type: 'string', example: 'mateo' },
  distance: { type: 'string', example: '1888' },
  rider_username: { type: 'string', example: 'santiago' },
  estimated_time: { type: 'string', example: '1274' },
  estimated_price: { type: 'string', example: '1.23' },
};

module.exports = tripMetricSchema;
