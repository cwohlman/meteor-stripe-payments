if (Meteor.isServer) {
  Meteor.methods({
    'createDebit': function (token) {
      var userId = Meteor.users.insert({});

      var customerId = TestPayments.provider.createCustomer(userId)._id;

      // Stripe requires a customerId when using stored payment methods,
      // we need a way to provide that to the payment processing system.
      TestPayments.customers.insert({
        _id: customerId
        , userId: userId
      });

      var paymentId = TestPayments.provider.createPaymentMethod(
        customerId, token)._id;

      var debit = TestPayments.provider.createDebit({
        amount: -100
        , paymentMethodId: paymentId
        , userId: userId
      });

      return debit;
    }
  });
}
if (Meteor.isClient) {
  Tinytest.addAsync(
    'Stripe Payments - createDebit - is callable'
    , function (test, done) {
      TestPayments.provider.createCardToken({
        number: 4242424242424242
        , cvc: 123
        , exp_month: '12'
        , exp_year: (new Date()).getFullYear().toString().slice(2)
      }, function (error, result) {
        Meteor.call('createDebit', result, function (error, result) {
          test.isTrue(_.isString(result._id));
          
          done();
        });
      });
  });
}