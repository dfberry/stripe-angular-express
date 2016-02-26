var status = require('http-status');

exports.$cart = function($http) {

  var calcTotalPrice = function(){
      console.log("calcTotalPrice=" + data.totalprice);
      data.totalprice = data.quantity * data.price;
      console.log("calcTotalPrice=" + data.totalprice);
  } 

  var data = {
      name: "Donation",
      quantity: 1,
      price: 1000,
      totalprice: 0
  };

  calcTotalPrice();

  return {
      data: data,
      calcTotalPrice: calcTotalPrice
  };
};

exports.$customer = function($http){
    
    var data = {
        name: "Dina Berry",
        address_line1: "1515 State Street",
        address_line2: "5th Floor",
        address_city: "Seattle",
        address_state: "WA",
        address_zip: "98220",
        address_country: "USA"
    };
    
    return data;
    
}

