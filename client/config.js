Meteor.startup(function () {
  var key = Meteor.settings && Meteor.settings.public &&
    Meteor.settings.public.stripe && Meteor.settings.public.stripe.publishableKey;
  if (key) {
    Payments.provider.config(key);
  }
});


Payments.provider = {
  config: function (key) {
    Stripe.setPublishableKey(key);
  }
};