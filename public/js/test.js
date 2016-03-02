


/*
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
    });
    
    it('returns 2', function() {
      //console.log(controller);
      //console.log($scope);
      expect($scope.myvalue).toEqual("test value");
    });
  });
});
describe('Test2Controller', function() {
    
  beforeEach(module('stripe-app.components'));

  var $controller;

    var service;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            service = $injector.get('$myappconfig');
            console.log(service);
        })
    });


  beforeEach(inject(function(_$controller_){
      
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.test', function() {
      
    beforeEach(function() {
      $scope = {};
      controller = $controller('Test2Controller', { $scope: $scope, $myappconfig: service });
      console.log($scope);
    });
      
    it('from config object', function() {
      //console.log(controller);
      //console.log($scope);
      console.log($scope.test);
      //expect($scope.test.toEqual('Donation for XYZ'));
      expect(1).toEqual(1);
      console.log($scope.test);
    });
    
  
  });
});
*/

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