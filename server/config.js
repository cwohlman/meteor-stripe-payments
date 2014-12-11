StripePayments = function (key, options) {
  check(key, String);
  check(options, Match.Optional(Object));
  var self = this;

  var provider = {};
  _.each(self.provider, function (a, key) {
    provider[key] = Meteor.wrapAsync(a, self);
  });
  self.provider = provider;
  self.provider.stripe = new Npm.require('stripe')(key);
};

StripePayments.prototype = new Payments();
StripePayments.prototype.provider = {
  currency: 'USD'
};
