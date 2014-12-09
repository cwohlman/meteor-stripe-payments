Payments.provider.createPaymentMethod = Meteor.wrapAsync(
  function (customerId, token, callback) {
    check(customerId, String);
    check(token, String);
    check(callback, Function);
    
    var customer = Payments.customers.findOne(customerId);

    var request = {
      card: token
    };
    var result = {
      request: [customerId, request]
      // Stripe cards do not accept credits
      , acceptsDebits: true
      , acceptsCredits: false
    };
    Stripe.customers.createCard(customerId, request, function (error, response) {
      try {
        if (error) {
          result.response = response || error;
          result.error = new Payments.Error(error.type, error.message, error);
          result.status = 'error';
        } else if (response) {
          result._id = response.id;
          result.response = response;
          result.status = 'success';
          result.name = response.brand + ' - ' + response.last4;
          // Ideally this would include more info, such as the issuing bank
          // but brand and last 4 are all that stripe provides.
          result.description = response.brand + ' - ' + response.last4;
        } else {
          throw new Error('No data received');
        }
      } catch (e) {
        result.error = e;
      }
      callback(null, result);
    });
});