import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');
const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

const Payment = () => {
  const { bookingId } = useParams();
  // console.log(bookingId);


  return (
    <>
    <Elements stripe={stripePromise}
     options={{appearance :{theme :"flat"}}}
     >
      <CheckoutForm bookingId={bookingId} />
    </Elements>
    </>
  )
}

export default Payment