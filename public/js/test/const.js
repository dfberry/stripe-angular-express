describe("Service: $myappconst", function () {
    
    // load the controller's module
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