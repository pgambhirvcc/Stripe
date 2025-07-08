import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CheckoutProvider } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckForm'
import { loadStripe } from '@stripe/stripe-js'
import { useMemo } from 'react'

function App() {
  const stripePromise = loadStripe('ADD PK KEY HERE');
  const appearance = {
    theme: 'stripe',
  };

  const fetchClientSecret = async () => {
    const response = await fetch('http://localhost:4000/create-checkout-session', { method: 'POST', headers: {
      'Content-Type': 'application/json',
        }, body: JSON.stringify({ usd: '6000' }) })
    const json = await response.json()
    return json.checkoutSessionClientSecret
  };

  return (
    <>
       <CheckoutProvider stripe={stripePromise} options={{fetchClientSecret,elementsOptions: { appearance }}}>
      <CheckoutForm />
    </CheckoutProvider>
    </>
  )
}

export default App
