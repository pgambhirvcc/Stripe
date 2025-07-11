const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')(process.env.SK_KEY);
const PORT = process.env.PORT || 4000;
require('dotenv').config()


app.use(express.json());
app.use(cors());

app.use(express.static('../dist'))

app.post('/create-checkout-session', async (req, res) => {
  const body = req.body;
  console.log(req.body, 'incominb')
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: req.body.usd,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode: 'custom',
      // The URL of your payment completion page
      return_url: `https://stripe-4eqc.onrender.com/paymentSuccess`
    });
  
    res.json({checkoutSessionClientSecret: session.client_secret});
  });

app.listen(PORT, () => {
    console.log('Server running at port ' + PORT);
})