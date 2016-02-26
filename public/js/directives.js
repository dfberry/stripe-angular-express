exports.confirm = function() {
  return {
    controller: 'ConfirmController',
    templateUrl: '/public/templates/confirm.html'
  };
};
exports.checkout = function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/public/templates/checkout.html'
  };
};