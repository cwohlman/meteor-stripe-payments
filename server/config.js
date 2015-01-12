StripePayments = function (key, options) {
  check(key, String);
  check(options, Match.Optional(Object));
  var self = this;

  var provider = {};
  _.each(self.provider, function (a, key) {
    if (_.isFunction(a))
      provider[key] = Meteor.wrapAsync(a, self);
    else
      provider[key] = a;
  });
  self.provider = provider;
  self.provider.stripe = new Npm.require('stripe')(key);
};

StripePayments.prototype = new Payments();
StripePayments.prototype.provider = {
  currency: 'USD'
};

StripePayments.prototype.processError = function (error) {
  var result = new Payments.Error(error.type, error.message, error);
  if (error.type === "StripeCardError") {
    result.sanitizedError = new Meteor.Error("card-error", error.message);
  }
  return result;
};
