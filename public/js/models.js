exports.$myappmodel = function() {

    // cart designed for stripe charge only
    var cart = {
        name: "",
        quantity: 0,
        price: 0,
        totalprice: 0
    };


    // name = name on card
    // address is billing address
    var card = {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '',
        exp_year: '',
        name: '',
        address_city: '',
        address_line1: '',
        address_line2: '',
        address_country:'USA',
        address_state:'',
        address_zip:''
    };

    // pass to server & then stripe
    var customer = {
        
        // shipping object
        shipping: {
            address: {
                city: '',
                country: 'USA',
                line1: '',
                line2: '',
                postal_code: '',
                state: ''
            },
            name: '',
            phone: ''
        },
        billing: {
            address: {
                city: '',
                country: 'USA',
                line1: '',
                line2: '',
                postal_code: '',
                state: ''
            },
            name: '',
            phone: ''
        }   
    };
    

  return {
      cart: cart,
      card: card,
      customer: customer
  };
};