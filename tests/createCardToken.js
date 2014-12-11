if (Meteor.isClient) {
  Tinytest.addAsync(
    'Stripe Payments - createCardToken - isCallable'
    , function (test, done) {
      test.isTrue(_.isFunction(TestPayments.provider.createCardToken));
      TestPayments.provider.createCardToken({
        number: 4242424242424242
        , cvc: 123
        , exp_month: '12'
        , exp_year: (new Date()).getFullYear().toString().slice(2)
      }, function (error, result) {
        test.isTrue(!error);
        test.isTrue(_.isString(result));
        done();
      });
  });
}