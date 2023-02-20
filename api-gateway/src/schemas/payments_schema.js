const createRiderWalletSchema = {
  description: 'Create a wallet for a rider',
  tags: ['Payments Riders'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
};

const createDriverWalletSchema = {
  description: 'Create a wallet for a driver',
  tags: ['Payments Drivers'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
};

const getRiderWalletSchema = {
  description: 'Get a wallet for a rider',
  tags: ['Payments Riders'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    404: {
      description: 'Error. Rider Username not Found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Rider Username not Found' },
        username: { type: 'string' },
      },
    },
  },
};

const getDriverDataWalletSchema = {
  description: 'Get a wallet for a rider',
  tags: ['Payments Drivers'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    404: {
      description: 'Error. Driver Username not Found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Driver Username not Found' },
        username: { type: 'string' },
      },
    },
  },
};

const PaymentPostSchema = {
  description: 'Endpoint for creating a deposit',
  tags: ['Payments'],
  body: {
    description: 'Payload for creating a new deposit',
    type: 'object',
    properties: {
      tripID: { type: 'string' },
      amount: { type: 'number' },
    },
  },
  response: {
    400: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
};

const PaymentTestPostSchema = {
  description: 'Endpoint for testing a deposit',
  tags: ['Payments Test'],
  body: {
    description: 'Payload for creating a new deposit',
    type: 'object',
    properties: {
      rider_username: { type: 'string' },
      amount: { type: 'number' },
      driver_username: { type: 'string' },
      tripID: { type: 'string' },
    },
  },
  response: {
    400: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
};

const WithdrawPostSchema = {
  description: 'Endpoint for creating a withdraw',
  tags: ['Payments'],
  body: {
    description: 'Payload for creating a new withdraw',
    type: 'object',
    properties: {
      username: { type: 'string' },
      amount: { type: 'number' },
      walletAddress: { type: 'string' },
    },
  },
};

const getRiderBalanceSchema = {
  description: 'Get balance for a rider',
  tags: ['Payments Riders'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
};

const getDriverEarnedMoneySchema = {
  description: 'Get earned money for a drider',
  tags: ['Payments Drivers'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
};

const getUserUnclaimedMoneySchema = {
  description: 'Get user unclaimed money',
  tags: ['Payments'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
};

const createWalletSchema = {
  description: 'Create a wallet for a user',
  tags: ['Payments'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
};

const getUserWalletSchema = {
  description: 'Get a wallet for a user',
  tags: ['Payments'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error.User Not Found' },
        username: { type: 'string' },
      },
    },
  },
};

const getContractBalanceSchema = {
  description: 'Get a contract balance for admin',
  tags: ['Payments'],
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
};

const depositPostSchema = {
  description: 'Endpoint for creating a deposit',
  tags: ['Payments'],
  body: {
    description: 'Payload for creating a new deposit',
    type: 'object',
    properties: {
      admin_username: { type: 'string' },
      amount: { type: 'number' },
      walletAddress: { type: 'string' },
    },
  },
};

const getTransactionsSchema = {
  description: 'Get transactions',
  tags: ['Payments'],
  querystring: {
    offset: { type: 'integer', description: 'pagination offset' },
    limit: { type: 'integer', description: 'pagination limit, get up to {limit} users' },
  },
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
};

const getTransactions24Schema = {
  description: 'Get transactions in last 24 hours',
  tags: ['Payments'],
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
};

exports.createRiderWalletSchema = createRiderWalletSchema;
exports.createDriverWalletSchema = createDriverWalletSchema;
exports.getRiderWalletSchema = getRiderWalletSchema;
exports.PaymentPostSchema = PaymentPostSchema;
exports.WithdrawPostSchema = WithdrawPostSchema;
exports.getRiderBalanceSchema = getRiderBalanceSchema;
exports.getDriverDataWalletSchema = getDriverDataWalletSchema;
exports.getDriverEarnedMoneySchema = getDriverEarnedMoneySchema;
exports.getUserUnclaimedMoneySchema = getUserUnclaimedMoneySchema;
exports.createWalletSchema = createWalletSchema;
exports.getUserWalletSchema = getUserWalletSchema;
exports.PaymentTestPostSchema = PaymentTestPostSchema;
exports.getContractBalanceSchema = getContractBalanceSchema;
exports.depositPostSchema = depositPostSchema;
exports.getTransactionsSchema = getTransactionsSchema;
exports.getTransactions24Schema = getTransactions24Schema;
