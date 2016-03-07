 describe('Testing Minified Controller with Scope', function() {
     
       beforeEach(module('mini-app.components'));

        var $controller;

        beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));
       
       beforeEach(function() {
           console.log("before each reached");
            $scope = {};
            controller = $controller('MiniController', { 
                $scope: $scope
            });

        });
        
        it('validate $scope was injected in minified code', function() {
            expect($scope.test).toBe("HELLO WORLD");         

        });

 });
