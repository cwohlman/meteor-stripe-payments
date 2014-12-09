Stripe = null;

Payments.provider = {
  config: function (key) {
    Stripe = Npm.require('stripe')(key);
  }
};

Meteor.startup(function () {
  var key = Meteor.settings && Meteor.settings &&
    Meteor.settings.stripe && Meteor.settings.stripe.publishableKey;
  if (key) {
    Payments.provider.config(key);
  }
});