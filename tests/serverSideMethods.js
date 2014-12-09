checkSuccess = function (result, test) {
  test.isTrue(_.isObject(result));
  
  test.isTrue(_.isString(result._id));
  test.isTrue(_.contains(['success', 'pending'], result.status));
  test.isTrue(_.isObject(result.request));
  test.isTrue(_.isObject(result.response));
  test.isTrue(_.isNumber(result.amount) || _.isUndefined(result.amount));
};