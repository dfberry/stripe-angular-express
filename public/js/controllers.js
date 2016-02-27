exports.CheckoutController = function($scope, $cart, $card, $customer, $charge, $http) {

    $scope.donations = {
        donationOptions: [
            {id: '1000', name: '$10'},
            {id: '5000', name: '$50'},
            {id: '60000', name: '$600'}
        ]
    };
    $scope.donations.selectedOption = $scope.donations.donationOptions[0];
    
    $scope.months = {
        monthOptions: [
            {id: '01', name: '1'},
            {id: '02', name: '2'},
            {id: '03', name: '3'},
            {id: '04', name: '4'},
            {id: '05', name: '5'},
            {id: '06', name: '6'},
            {id: '07', name: '7'},
            {id: '08', name: '8'},
            {id: '09', name: '9'},
            {id: '10', name: '10'},
            {id: '11', name: '11'},
            {id: '12', name: '12'}
        ]};
        
    $scope.months.selectedOption = $scope.months.monthOptions[11];
        
    $scope.years = {
        yearOptions: [
            {id:'2016', name: '2016'},
            {id:'2017', name: '2017'},
            {id:'2018', name: '2018'}
        ]};
    $scope.years.selectedOption =  $scope.years.yearOptions[2];

    $scope.init = function(){
        $scope.cart = $cart;
        $scope.customer = $customer;
        $scope.card = $card;
        
        console.log("card=" + JSON.stringify($scope.card ));
        console.log("cart=" + JSON.stringify($scope.cart ));
        console.log("customer=" + JSON.stringify($scope.customer ));
   }
    
    $scope.update = function() {
        $scope.cart.calcTotalPrice();
    }

    $scope.checkout = function() {
       $scope.error = null;
       
       // update card
       $scope.card.data.name = $customer.name
       $scope.card.data.exp_month = $scope.months.selectedOption.id;
       $scope.card.data.exp_year = $scope.years.selectedOption.id;
       $scope.card.data.address_city="Bellingham";
       $scope.card.data.address_line1="2511 Ellis St";
       $scope.card.data.address_line2="box 10";
       $scope.card.data.address_country="CA";
       $scope.card.data.address_state="CO";
       $scope.card.data.address_zip="98229";
       
       // update cart
       $scope.cart.data.price = $scope.donations.selectedOption.id;
       $scope.cart.calcTotalPrice();
       
       var charge = {
           "customer": $scope.customer,
           "card": $scope.card.data,
           "cart": $scope.cart.data
       }
       
       //console.log("charge=" + JSON.stringify(charge));    

       console.log("about to call commit");
    
       $charge.commit(charge, function(error, results){

           console.log("checkout function - commit returned");

           console.log("controllers - error: " + JSON.stringify(error));
           console.log("controllers - results: " + JSON.stringify(results));

           if (error){
               $scope.error = error;
               $scope.checkedOut=false;
           } else {
               $scope.checkedOut=true;
               $scope.error = false;
           }
           
           $scope.charge = results.data.charge;
           $scope.request = results.data.request;
           
           return;  
       });
    }
    
    $scope.buttonTest = function(){
        console.log("buttonTest");
        return;
    }
    
 
  
    
    $scope.init();
};
