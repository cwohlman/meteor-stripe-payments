// XXX This code is for oauth implementation.
// Meteor.startup(function() {
//   Accounts.loginServiceConfiguration.remove({
//     service : 'stripe'
//   });

//   Accounts.loginServiceConfiguration.insert({
//     service     : 'stripe',
//     consumerKey : '',
//     secret      : ''
//   });

// });

if (Meteor.isClient) {
  // Let's test to see if the stripejs file exists before this file is loaded.
  // 
  // var stripejs = Stripe;

  Tinytest.add(
    'Stripe Payments - Config - Stripe.js exists in browser'
    , function (test) {
      test.isTrue(_.isObject(Stripe));
  });

  Tinytest.add(
    'Stripe Payments - Config - Payments.provider.config'
    , function (test) {
      test.isTrue(_.isFunction(Payments.provider.config));
      Payments.provider.config('pk_test_MRjxc7wA1Ba5WLiRObJjFY5r');
  });
}

if (Meteor.isServer) {
  Tinytest.add(
    'Stripe Payments - Config - Payments.provider.config callable'
    , function (test) {
      test.isTrue(_.isFunction(Payments.provider.config));
      Payments.provider.config('sk_test_A5jGIKAJKfGPQHm3CqUsOScT');
  });
}