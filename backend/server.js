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
  
  token: 'sk6K3VAIZsPI0ZsLwcLUrWi3p17zx2EDxfqGrLm9kfIPEuFn99oHOEunctPsDs6sRUKgxAkAUL4Gp7PXQa36PdHNSgiAKWHlxemgiQDdGSXWpDM0z3piwLNkVK6K1udNdbItuy7tTlY7lBTp336XXy5WhkTvUEGAtE0onUt4uIY5NZj46qlF', // Add your write token here 
});


const app = express()

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)






app.post('/stripe-webhook',  express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_O5fVkYWDptx0EByxbIQ0KrBcXITXc1ZH'; // Replace with your Stripe webhook endpoint secret

  console.log('Type of req.body:', typeof req.body);  // Add this
  console.log('Content of req.body:', req.body);  // Add this

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return res.status(400).send(`Webhook Error: ${req.body} : ${typeof req.body}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items'],
    });

    const items = session.line_items.data.map(item => ({
      productId: item.price.product
    }));

    for (const item of items) {
      console.log("test: ", item.productId)
      await deleteProduct(item.productId);
    }

    console.log('Products deleted successfully from Sanity.');

    return res.status(200).send('Webhook Received: checkout.session.completed');
  } else {
    console.log('Webhook event ignored:', event.type);

    return res.status(200).send('Webhook Received: Other event type.');
  }
});


async function deleteProduct(productId) {
  try {
    // Use the 'delete' mutation to delete the product document by its ID
    await sanityC
      .delete(productId)
      .then(response => {
        console.log('Product deleted successfully from Sanity:', response);
      })
      .catch(error => {
        console.error('Error deleting product from Sanity:', error);
        throw error;
      });
  } catch (error) {
    console.error('Error deleting product from Sanity:', error);
    throw error;
  }
}


app.use(express.json())

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
    success_url: 'https://fair-tan-duck-wig.cyclic.app/shop',
    cancel_url: 'https://fair-tan-duck-wig.cyclic.app/shop',
  });

  res.json({ id: session.id });
});


app.use(express.static(path.join(__dirname, "../frontend/dist")))
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html")))

app.listen(5000, () => console.log(`Server started on port: ${5000}`))