Payments.provider.createCardToken = function (config, callback) {
    if (!callback && typeof config === 'function') {
      callback = config;
      config = null;
    }
    if (!config) {
      throw new Error('Stripe credit card dialog not implemented');
    }
    Stripe.card.createToken({
      number: config.number
      , cvc: config.cvc
      , exp_month: config.exp_month
      , exp_year: config.exp_year
    }, function (status, response) {
      if (response.error) {
        callback(new Error(response.error.message));
      } else {
        var token = response.id;
        callback(null, token);
      }
    });
};