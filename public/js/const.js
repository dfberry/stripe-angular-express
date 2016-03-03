exports.$myappconst = function(){
     
  console.log("my test");   
  console.log("test 2");
  console.log('test 3');
  console.log('test 4');
     
   var years = [
            {id:'2016', name: '2016'},
            {id:'2017', name: '2017'},
            {id:'2018', name: '2018'}
        ];

   var years_default = years[0];
    
   var months = [
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
        ];
    var months_default = months[10];    
    
    var donations = { 
        list: [
            {id: '1000', name: '$10'},
            {id: '5000', name: '$50'},
            {id: '10000', name: '$100'}
        ]
    };
    var donations_default = donations.list[0];
    
      
    var cart_default = {
        name: "Donation",
        price: "1000",
        quantity: 1 
    }
    
    var test = function(){return 'const.js - test func'};
    
    return {
        years : years,
        years_default :  years_default,
        months: months,
        months_default : months_default,
        donations: donations,
        donations_default: donations_default,
        cart_default: cart_default,
        test:test 
        
    };  
}