Stripe = Npm.require('stripe');

Payments.provider = {
  config: function (key) {
    this.stripe = Stripe(key);
  }
};

Meteor.startup(function () {
  var key = Meteor.settings && Meteor.settings &&
    Meteor.settings.stripe && Meteor.settings.stripe.publishableKey;
  if (key) {
    Payments.provider.config(key);
  }
});