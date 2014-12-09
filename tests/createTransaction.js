if (Meteor.isServer) {
  var Charges = new Mongo.Collection('charges');
  Payments.associateDebits(function (userId) {
    return Charges.find({
      userId: userId
    }).fetch();
  }, function (doc) {
    return doc;
  });
  Meteor.methods({
    'createTransaction': function (token) {
      var userId = Meteor.users.insert({});
      var chargeId = Charges.insert({
        userId: userId
        , amount: 100
      });

      var paymentMethodId = Payments.createPaymentMethod(userId, token);

      var transactionId = Payments.createTransaction({
        userId: userId
        , paymentMethodId: paymentMethodId
        , amount: -100
        , kind: 'debit'
      });

      return {
        transaction: Payments.transactions.findOne(transactionId)
        , paymentMethod: Payments.paymentMethods.findOne(paymentMethodId)
      };
    }
  });
}
if (Meteor.isClient) {
  Tinytest.addAsync(
    'Stripe Payments - createTransaction - is callable'
    , function (test, done) {
      Payments.provider.createCardToken({
        number: 4242424242424242
        , cvc: 123
        , exp_month: '12'
        , exp_year: (new Date()).getFullYear().toString().slice(2)
      }, function (error, result) {
        Meteor.call('createTransaction', result, function (error, result) {
          test.isTrue(!!result.transaction);
          test.isTrue(!!result.paymentMethod);

          test.equal(result.paymentMethod.name, 'Visa - 4242');
          test.equal(result.paymentMethod.description, 'Visa - 4242');

          done();
        });
      });
  });
}