import React from 'react';
import StripeCheckoutModule from 'react-stripe-checkout';

// react-stripe-checkout is CommonJS-only; Vite hands us the whole module object
const StripeCheckout = StripeCheckoutModule.default ?? StripeCheckoutModule;

const StripeCheckoutButton = ({ price }) => {
  //stripe needs values to be in cents
  const priceForStripe = price * 100;

  const publishableKey = 'pk_test_51HO7MdGA6WECSgsUTb3b27LVZGRsGfLEu4X6Zus2qSshnZgMXplOO2UNGph2uEPiKY07o0PnrWh4Cqiv4fMd98RE00DWqJjujm';
  
  const onTocken = token => {
    console.log(token);
    alert('Payment Successful')
  }

  return (
    <StripeCheckout 
    label='Pay Now'
    name='Crown Clothing Ltd.'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is $${price}`}    
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onTocken}
    stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;