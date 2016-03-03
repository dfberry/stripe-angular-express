 describe("Service: $myappconfig", function () {
     
    // load the controller's module
    beforeEach(module('stripe-app.components'));

    var service;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            service = $injector.get('$myappconfig');
        })
    });

    it("should return a property stripePublishableKey", inject(function () {  
        console.log("it test stripePublishableKey=" + service.stripePublishableKey);      
        expect(service.stripePublishableKey).toBe('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');
    }));
 
    it("should return a property donationDescription", inject(function () {        
        console.log("it test donationDescription=" + service.donationDescription);  
        expect(service.donationDescription).toBe('Donation for XYZ');
    })); 
});