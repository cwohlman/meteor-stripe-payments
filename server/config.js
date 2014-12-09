Stripe = null;

Payments.provider = {
  config: function (key) {
    Stripe = Npm.require('stripe')(key);
  }
  , currency: 'USD'
};

Meteor.startup(function () {
  var key = Meteor.settings && Meteor.settings &&
    Meteor.settings.stripe && Meteor.settings.stripe.secretKey;
  if (key) {
    Payments.provider.config(key);
  }
});