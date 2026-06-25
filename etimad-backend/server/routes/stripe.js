import express from "express";
import Stripe from "stripe";

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    // ✅ initialize INSIDE request (ensures env is loaded)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
     

      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

export default router;