StripePayments.prototype.provider.createCustomer =
  function (userId, callback) {
    check(userId, String);
    var self = this;

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
    self.provider.stripe.customers.create(request, function (error, response) {
      try {
        if (error) {
          result.response = response || error;
          result.error = self.processError(error);
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
};