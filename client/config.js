StripePayments = function (key, options) {
  check(key, String);
  check(options, Match.Optional(Object));
  var self = this;

  self.provider = _.clone(self.provider);

  // As far as I can tell it's imposible to set the Stripe publishable key
  // multiple times. What we'll do is set it here, then set it in Stripe
  // before every api call.
  self.provider.key = key;

  // XXX options
};

StripePayments.prototype = new Payments();
StripePayments.prototype.provider = {
  currency: 'USD'
};