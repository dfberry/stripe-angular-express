describe('Controller: CheckoutController', function() {
    
    beforeEach(module('stripe-app.components'));

    var $controller
        , modelService
        , constService
        , configService
        , stripeChargeService
        , stripeChargeServiceMock
        , httpService;
  
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            modelService = $injector.get('$myappmodel');
            constService = $injector.get('$myappconst');
            configService = $injector.get('$myappconfig');
            stripeChargeServiceMock = $injector.get('$myservice');
            httpService = $injector.get('$http');
        })
    });
    
    // define the mocked service
    // http://stackoverflow.com/questions/15854043/mock-a-service-in-order-to-test-a-controller
    beforeEach(function() {

   });    

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));


 
    describe('$scope.init', function() {

        beforeEach(function() {
            $scope = {};
            controller = $controller('CheckoutController', { 
                $scope: $scope, 
                $myappmodel: modelService,
                $myappconst: constService,
                $myappconfig: configService,
                $myservice: stripeChargeService,
                $http: httpService
            });

        });

        it('validate $scope after init', function() {
        
            expect($scope.cart).toBeDefined();
            expect($scope.customer).toBeDefined();      
            expect($scope.card).toBeDefined();
            
            expect($scope.years).toBeDefined();
            expect($scope.years.length>0).toBeTruthy();
            expect($scope.years.selectedOption).toBeDefined();                
            expect($scope.months).toBeDefined();
            expect($scope.months.length==12).toBeTruthy();
            expect($scope.months.selectedOption).toBeDefined();         
            expect($scope.donations).toBeDefined();
            expect($scope.donations.length>0).toBeTruthy();
            expect($scope.donations.selectedOption).toBeDefined();
        });
    });
    
    describe('$scope.checkout', function() {

        beforeEach(function() {
            
            $scope = {};
            
            stripeChargeServiceMock = {
                commit: function(completeCharge, callback) {
                    callback(null, { data : { 
                            charge: "test_charge", 
                            request : "test_request"
                    }});
                }
            }; 
                      
            controller = $controller('CheckoutController', { 
                $scope: $scope, 
                $myappmodel: modelService,
                $myappconst: constService,
                $myappconfig: configService,
                $myservice: stripeChargeServiceMock,
                $http: httpService
            });
         });

        it('FIX THIS - $scope.{returned values}', function() {

            modelService.cart = {
                name: "unit test",
                quantity: 10,
                price: 100,
                totalprice: 10 * 100
            };  
                
            $scope.init();
            $scope.checkout();

            expect($scope.charge).toBe("test_charge");
            expect($scope.request).toBe("test_request");

        });
        it('FIX THIS - MORE TESTS FOR CHECKOUT', function() {
        });        
    });
  
});