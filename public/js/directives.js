exports.checkout = function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/public/templates/checkout.html'
  };
};
exports.cart = function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/public/templates/cart.html'
  };
};