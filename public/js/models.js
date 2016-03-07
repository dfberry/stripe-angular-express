exports.$myappmodel = /*@ngInject*/ function() {

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
        name: 'Barbara Jones',
        address_city: 'Seattle',
        address_line1: '5678 Nine Street',
        address_line2: 'Box 3',
        address_country:'USA',
        address_state:'WA',
        address_zip:'98105'
    };

    // pass to server & then stripe
    var customer = {
        
        // shipping object
        shipping: {
            address: {
                city: 'Seattle',
                country: 'USA',
                line1: '1234 Five Lane',
                line2: 'Floor 2',
                postal_code: '98101',
                state: 'WA'
            },
            name: 'Bob Smith',
            phone: ''
        },
        billing: {
            address: {
                city: 'Seattle',
                country: 'USA',
                line1: '5678 Nine Street',
                line2: 'Box 3',
                postal_code: '98105',
                state: 'WA'
            },
            name: 'Barbara Jones',
            phone: '206-555-1212'
        },
        email: 'bob@company.com'   
    };
    

  return {
      cart: cart,
      card: card,
      customer: customer
  };
};