run server via 'npm start'
watch client-side js files via 'gulp watch'

currently doesn't actually charge yet

https://stripe.com/docs/testing

Number	Description
4000000000000077	Charge will succeed and funds will be added directly to your available balance (bypassing your pending balance).
4000000000000093	Charge will succeed and domestic pricing will be used (other test cards use international pricing). This card is only significant in countries with split pricing.
4000000000000010	With default account settings, charge will succeed but address_line1_check and address_zip_check will both fail.
4000000000000028	With default account settings, charge will succeed but address_line1_check will fail.
4000000000000036	With default account settings, charge will succeed but address_zip_check will fail.
4000000000000044	With default account settings, charge will succeed but address_zip_check and address_line1_check will both be unavailable.
4000000000000101	With default account settings, charge will succeed unless a CVC is entered, in which case cvc_check will fail and the charge will be declined.
4000000000000341	Attaching this card to a Customer object will succeed, but attempts to charge the customer will fail.
4000000000000002	Charge will be declined with a card_declined code.
4100000000000019	Charge will be declined with a card_declined code and a fraudulent reason.
4000000000000127	Charge will be declined with an incorrect_cvc code.
4000000000000069	Charge will be declined with an expired_card code.
4000000000000119	Charge will be declined with a processing_error code.