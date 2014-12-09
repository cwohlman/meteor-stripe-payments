Payments.provider.createCustomer = Meteor.wrapAsync(
  function (userId, callback) {
    check(userId, String);
    
    var user = Meteor.users.findOne(userId);

    var description = user.profile && user.profile.name;
    var email = user.emails && user.emails[0] && user.emails[0].address;

    var request = {
      description: description
      , email: email
      , metadata: {
        userId: userId
      }
    };
    var result = {
      request: request
    };
    Stripe.customers.create(request, function (error, response) {
      try {
        if (error) {
          result.response = response || error;
          result.error = new Payments.Error(error.type, error.message, error);
          result.status = 'error';
        } else if (response) {
          result._id = response.id;
          result.response = response;
          result.status = 'success';
        } else {
          throw new Error('No data received');
        }
      } catch (e) {
        result.error = e;
      }
      callback(null, result);
    });
});