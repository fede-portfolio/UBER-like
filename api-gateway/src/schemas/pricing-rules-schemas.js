const pricingRuleSchema = {
  id: { type: 'string', example: 'ac45db64d5a6b4c5cd46ab54' },
  c_trips_last_30m: { type: 'string', example: '1.23' },
  c_km: { type: 'string', example: '1.23' },
  c_rating: { type: 'string', example: '1.23' },
  c_min_price: { type: 'string', example: '1.23' },
  active: { type: 'boolean', example: false },
};

const pricingRulePOSTSchema = {
  c_trips_last_30m: { type: 'string' },
  c_km: { type: 'string' },
  c_rating: { type: 'string' },
  c_min_price: { type: 'string' },
};

const pricingRulePATCHSchema = {
  c_trips_last_30m: { type: 'string' },
  c_km: { type: 'string' },
  c_rating: { type: 'string' },
  c_min_price: { type: 'string' },
  active: { type: 'boolean' },
};

const pricingRuleEvaluateSchema = {
  c_trips_last_30m: { type: 'string' },
  c_km: { type: 'string' },
  c_rating: { type: 'string' },
  c_min_price: { type: 'string' },
  n_trips_last_30m: { type: 'string' },
  n_km: { type: 'string' },
  n_rating: { type: 'string' },
};

const pricingRuleEvaluatedSchema = {
  price: { type: 'string' },
};

exports.pricingRuleSchema = pricingRuleSchema;
exports.pricingRulePOSTSchema = pricingRulePOSTSchema;
exports.pricingRuleEvaluateSchema = pricingRuleEvaluateSchema;
exports.pricingRuleEvaluatedSchema = pricingRuleEvaluatedSchema;
exports.pricingRulePATCHSchema = pricingRulePATCHSchema;
