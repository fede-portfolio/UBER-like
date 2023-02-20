const PushTokenPostSchema = {
  description: 'Endpoint for creating push token',
  tags: ['Tokens'],
  body: {
    description: 'Payload for creating a new push Token',
    type: 'object',
    properties: {
      username: { type: 'string' },
      token: { type: 'string', default: 'No comments' },
    },
  },
};

exports.PushTokenPostSchema = PushTokenPostSchema;
