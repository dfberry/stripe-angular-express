 describe("$myappconfig", function (service) {
    beforeEach(module('stripe-app.components'));

    var service;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            service = $injector.get('$myappconfig');
        })
    });

    it("should return a property", inject(function () {        
        console.log(service.stripePublishableKey);
        expect(service.stripePublishableKey).toBe('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');
    }))
});