exports.checkout = /*@ngInject*/ function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/public/templates/checkout.html'
  };
};
exports.cart = /*@ngInject*/ function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/public/templates/cart.html'
  };
};