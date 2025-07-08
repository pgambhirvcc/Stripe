const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')('ADD SK KEY HERE');
const PORT = 4000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Heyy'));

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
      return_url: 'http://localhost:5173/paymentMade'
    });
  
    res.json({checkoutSessionClientSecret: session.client_secret});
  });

app.listen(PORT, () => {
    console.log('Server running at port ' + PORT);
})