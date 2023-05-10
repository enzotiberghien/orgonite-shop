const express = require("express")
require("dotenv").config()
const cors = require('cors');
const path = require('path');


const app = express()

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['FR', 'SE'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'eur',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'eur',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    line_items: items,
    mode: 'payment',
    success_url: 'https://yourwebsite.com/success',
    cancel_url: 'https://yourwebsite.com/canceled',
  });

  res.json({ id: session.id });
});

app.use(express.static(path.join(__dirname, "../frontend/dist")))
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html")))

app.listen(5000, () => console.log(`Server started on port: ${5000}`))