const express = require("express")
require("dotenv").config()
const cors = require('cors');
const path = require('path');
const sanityClient = require('@sanity/client');


const sanityC = sanityClient.createClient({
  projectId: '3f4jk2dm',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
  token: 'skuYYhug0lOzVhd5e1bC0y5tNWPfbgNr3uUA0qx49ttHF5UkBkNkhkLGiyW7pZtWOTsylE8O6NjIw4DKAj9TmVCiSxkcvGkDmalQWExDQksiZiM2zqopS7A9nybCmAQAF129Mz57OsZFJC0Fj9JEKjjzpjLMb4Y2MS9oJYzwpnx8Ls5KlTm4', // Add your write token here 
});


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

app.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_474e8a50e53a7094d25197e4d6e4fddead8052fe3bbb6de464515db83dbe01bb'; // Replace with your Stripe webhook endpoint secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return res.sendStatus(400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve the items associated with the session
    const items = session.display_items.map(item => ({
      productId: item.custom.product_id
    }));

    // Delete the products from Sanity
    for (const item of items) {
      await deleteProduct(item.productId);
    }

    console.log('Products deleted successfully from Sanity.');

    res.sendStatus(200);
  } else {
    console.log('Webhook event ignored:', event.type);
    res.sendStatus(200);
  }
});

async function deleteProduct(productId) {
  try {
    await sanityClient.delete(productId);
  } catch (error) {
    console.error('Error deleting product from Sanity:', error);
    throw error;
  }
}

app.use(express.static(path.join(__dirname, "../frontend/dist")))
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html")))

app.listen(5000, () => console.log(`Server started on port: ${5000}`))