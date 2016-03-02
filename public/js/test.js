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

describe('TestController', function() {
    
  beforeEach(module('stripe-app.components'));

  var $controller;

  beforeEach(inject(function(_$controller_){
      
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.test', function() {
      
    beforeEach(function() {
      $scope = {};
      controller = $controller('TestController', { $scope: $scope });
    });
      
    it('returns 2', function() {
      //console.log(controller);
      //console.log($scope);
      expect($scope.test()).toEqual(2);
      console.log($scope.test())
    });
    
    it('returns 2', function() {
      //console.log(controller);
      //console.log($scope);
      expect($scope.myvalue).toEqual("test value");
      console.log($scope.myvalue)
    });
  });
});
/*
describe("$myservice", function () {
  var serviceUnderTest;
  var httpBackend;
  var myappconfig;

  beforeEach(module("stripe-app"));

  beforeEach(inject(function ($myservice, $httpBackend, $myappconfig) {
    serviceUnderTest = $myservice;
    httpBackend = $httpBackend;
    myappconfig = $myappconfig;
  }));

  it("test should just return string", function () {
    
    //httpBackend.whenPOST("/api/v1/checkout").respond({'error':'error'});
    
    serviceUnderTest.test('this is a test').then(function(response) {
      expect(response).toEqual('this is a test');
    });
    //httpBackend.flush();
  });

});
*/