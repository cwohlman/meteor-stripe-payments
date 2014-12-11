if (Meteor.isClient) {
  Tinytest.addAsync(
    'Stripe Payments - multiple client keys'
    , function (test, done) {
      var OtherPayments = 
        new StripePayments("pk_test_9mr7on5iaqSGQGqmIk4P7dcq");
      var oneIsDone = false;
      TestPayments.provider.createCardToken({
        number: 4242424242424242
        , cvc: 123
        , exp_month: '12'
        , exp_year: (new Date()).getFullYear().toString().slice(2)
      }, function (error, result) {
        test.isTrue(!error);
        test.isTrue(_.isString(result));
        if (oneIsDone) done();
        else oneIsDone = true;
      });
      OtherPayments.provider.createCardToken({
        number: 4242424242424242
        , cvc: 123
        , exp_month: '12'
        , exp_year: (new Date()).getFullYear().toString().slice(2)
      }, function (error, result) {
        test.isTrue(!error);
        test.isTrue(_.isString(result));
        if (oneIsDone) done();
        else oneIsDone = true;
      });
  });
}