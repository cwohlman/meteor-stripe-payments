// Stripe doesn't support transfers for international bank accounts
// instead we'll implement this as a zero argument function which sets up
// stripe connect
Payments.provider.createBankToken = function (config, callback) {
    if (!callback && typeof config === 'function') {
      callback = config;
      config = null;
    }
    if (config) {
      // XXX Stripe actually does support transfers to US bank accounts.
      throw new Error('Stripe does not support creating bank tokens directly.');
    }
    
};