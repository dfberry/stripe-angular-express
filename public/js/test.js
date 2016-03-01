 describe("$myappconfig", function (service) {
    beforeEach(module('stripe-app.components'));

    var service;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            service = $injector.get('$myappconfig');
        })
    });

    it("should return a property stripePublishableKey", inject(function () {        
        expect(service.stripePublishableKey).toBe('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');
    }));
 
    it("should return a property donationDescription", inject(function () {        
        expect(service.donationDescription).toBe('Donation for XYZ');
    })); 
});

describe("$myappconst", function (service) {
    beforeEach(module('stripe-app.components'));

    var service;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            service = $injector.get('$myappconst');
        })
    });

    it("months should return 12 items", inject(function () {        
        expect(service.months.length).toBe(12);
    }));
 
    it("months_default should return months[10]", inject(function () {        
        expect(service.months_default).toBe(service.months[10]);
    })); 
});