if (Meteor.isServer) {
  var Charges = new Mongo.Collection('charges');
  var inited = false;
  Meteor.methods({
    'createTransaction': function (token) {
      if (!inited) {
        TestPayments.registerDebits(function (transaction) {
          return Charges.find({
            userId: transaction.userId
          }).fetch();
        }, function (doc) {
          return doc;
        });
        inited = true;
      }

      var userId = Meteor.users.insert({});
      var chargeId = Charges.insert({
        userId: userId
        , amount: 100
      });

      var paymentMethodId = TestPayments.createPaymentMethod(userId, token);

      var transactionId = TestPayments.createTransaction({
        userId: userId
        , paymentMethodId: paymentMethodId
        , amount: -100
        , kind: 'debit'
      });

      return {
        transaction: TestPayments.transactions.findOne(transactionId)
        , paymentMethod: TestPayments.paymentMethods.findOne(paymentMethodId)
      };
    }
  });
}
if (Meteor.isClient) {
  Tinytest.addAsync(
    'Stripe Payments - createTransaction - is callable'
    , function (test, done) {
      TestPayments.provider.createCardToken({
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