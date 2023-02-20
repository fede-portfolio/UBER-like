const adminSchema = {
  username: {
    type: 'string',
    example: 'aUsername',
  },
  first_name: {
    type: 'string',
    example: 'Mateo',
  },
  last_name: {
    type: 'string',
    example: 'Calvo',
  },
  email: {
    type: 'string',
    example: 'admin@provider.com',
  },
};

exports.adminSchema = adminSchema;
