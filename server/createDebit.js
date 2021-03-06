StripePayments.prototype.provider.createDebit = 
  function (transaction, callback) {
    check(transaction, Match.ObjectIncluding({
      amount: Match.Where(function (a) {
        return _.isFinite(a) && a < 0;
      })
      , paymentMethodId: String
      , userId: String
    }));
    var self = this;

    var customer = self.customers.findOne({
      userId: transaction.userId
      , providerInstance: self._id
    });

    if (!customer) {
      throw new Error('Cannot find customer account. ' +
        'Customer account is required to make stripe payments');
    }

    var request = {
      amount: -transaction.amount
      , currency: self.provider.currency
      , customer: customer._id
      , card: transaction.paymentMethodId
      , description: transaction.description || undefined
      , statement_description: transaction.appearsOnStatementAs || undefined

      , expand: ['balance_transaction']
    };

    var result = {
      request: request
    };

    self.provider.stripe.charges.create(request, function (error, response) {
      try {
        if (error) {
          result.response = response || error;
          result.error = self.processError(error);
          result.status = 'error';
        } else if (response) {
          result._id = response.id;
          result.response = response;
          result.status = 'success';
          result.net = response && response.balance_transaction &&
            response.balance_transaction.net;
        } else {
          throw new Error('No data received');
        }
      } catch (e) {
        result.error = e;
      }
      callback(null, result);
    });
};