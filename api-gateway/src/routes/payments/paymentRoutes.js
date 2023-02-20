const {
  PaymentPostSchema,
  WithdrawPostSchema,
  getUserWalletSchema,
  getUserUnclaimedMoneySchema,
  PaymentTestPostSchema,
  getContractBalanceSchema,
  depositPostSchema,
  getTransactionsSchema,
  getTransactions24Schema,
} = require('../../schemas/payments_schema');

const createPaymentHandeler = require('./createPayment');
const withdrawHandler = require('./createWithdraw');
const getUserWallet = require('./getWallet');
const getUserUnclaimedMoney = require('./getUnclaimedMoney');
const createPaymentTest = require('./createPaymentTest');
const createDeposit = require('./createDeposit');
const getContractBalance = require('./getContractBalance');
const getTransactions = require('./getTransactions');
const getTransactions24 = require('./getTransactions24');

async function paymentsRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/payments/:username/wallet',
    {
      onRequest: [fastify.verify],
      schema: getUserWalletSchema,
      handler: getUserWallet,
    },
  );
  fastify.get(
    '/payments/:username/unclaimed/money',
    {
      onRequest: [fastify.verify],
      schema: getUserUnclaimedMoneySchema,
      handler: getUserUnclaimedMoney,
    },
  );
  fastify.post(
    '/payments/create/payment/new',
    {
      onRequest: [fastify.verify],
      schema: PaymentPostSchema,
      handler: createPaymentHandeler,
    },
  );
  fastify.post(
    '/payments/create/withdraw',
    {
      onRequest: [fastify.verify],
      schema: WithdrawPostSchema,
      handler: withdrawHandler,
    },
  );
  fastify.post(
    '/payments/create/payment',
    {
      onRequest: [fastify.verify],
      schema: PaymentTestPostSchema,
      handler: createPaymentTest,
    },
  );
  fastify.post(
    '/payments/create/deposit',
    {
      onRequest: [fastify.verify],
      schema: depositPostSchema,
      handler: createDeposit,
    },
  );
  fastify.get(
    '/payments/contract/balance',
    {
      onRequest: [fastify.verifyAdmin],
      schema: getContractBalanceSchema,
      handler: getContractBalance,
    },
  );
  fastify.get(
    '/payments/transactions',
    {
      onRequest: [fastify.verifyAdmin],
      schema: getTransactionsSchema,
      handler: getTransactions,
    },
  );
  fastify.get(
    '/payments/transactions/24',
    {
      onRequest: [fastify.verifyAdmin],
      schema: getTransactions24Schema,
      handler: getTransactions24,
    },
  );

  done();
}

module.exports = paymentsRoutes;
