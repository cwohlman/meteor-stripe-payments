if (Meteor.isServer) {
  Meteor.methods({
    'createPaymentMethod': function (token) {
      var userId = Meteor.users.insert({});

      var customerId = Payments.provider.createCustomer(userId)._id;

      var paymentId = Payments.provider.createPaymentMethod(
        customerId, token)._id;

      return paymentId;
    }
  });
}
if (Meteor.isClient) {
  Tinytest.addAsync(
    'Stripe Payments - createPaymentMethod - is callable'
    , function (test, done) {
      Payments.provider.createCardToken({
        number: 4242424242424242
        , cvc: 123
        , exp_month: '12'
        , exp_year: (new Date()).getFullYear().toString().slice(2)
      }, function (error, result) {
        Meteor.call('createPaymentMethod', result, function (error, result) {
          if (error) throw error;

          test.isTrue(_.isString(result));
          
          done();
        });
      });
  });
}