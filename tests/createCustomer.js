if (Meteor.isServer) {
  Tinytest.add(
    'Stripe Payments - createCustomer - is callable'
    , function (test) {
      test.isTrue(_.isFunction(Payments.provider.createCustomer));

      var userId = Meteor.users.insert({});

      var result = Payments.provider.createCustomer(userId);
      checkSuccess(result, test);
  });

  Tinytest.add(
    'Stripe Payments - createCustomer - stores metadata'
    , function (test) {
      test.isTrue(_.isFunction(Payments.provider.createCustomer));
      var address = 'joe' + Random.id() + '@example.com';
      var userId = Meteor.users.insert({
        profile: {
          name: 'joe'
        }
        , emails: [{
          address: address
        }]
      });

      var result = Payments.provider.createCustomer(userId);
      checkSuccess(result, test);

      test.equal(result.response.description, 'joe');
      test.equal(result.response.email, address);
      test.equal(result.response.metadata.userId, userId);
  });
}