import dotenv from "dotenv";
import Stripe from "stripe";
import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.WEBHOOK_ENDPOINTSECRET;
const clientDomain =
    process.env.NODE_ENV != "development"
        ? process.env.DOMAIN
        : "http://localhost:5173";

let fulfillmentItem = null;

// @desc    Pay order through stripe
// @route   POST /create-checkout-session
// @access  Private
export const stripeCheckout = asyncHandler(async (req, res) => {
    const { orderId, orderItems } = req.body;
    fulfillmentItem = { orderId, email: req.user.email };

    if (orderItems && orderItems?.length !== 0) {
        if (req.user.isAdmin) {
            throw new Error("No Admin Payments are supported");
        }
        const session = await stripe.checkout.sessions.create({
            line_items: orderItems.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: item.price * 100, // since 100cents = $1
                },
                quantity: item.orderCount,
            })),
            customer_email: req.user.email,
            mode: "payment",
            success_url: `${clientDomain}/orders/${orderId}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientDomain}/orders/${orderId}?canceled=true`,
        });
        res.json({ url: session.url });
    } else {
        res.status(404);
        throw new Error("No order items found");
    }
});

// @desc    Save stripe payment confirmation in using Order model by orderId 
// @route   POST /webhook
// @access  Public/Stripe
export const stripeWebhook = asyncHandler(async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
    ) {
        fulfillCheckout(event.data.object.id);
    }
    res.status(200).end();
});

const fulfillCheckout = async (sessionId) => {
    const { orderId, email } = fulfillmentItem;
    const orderItem = await Order.findById(orderId);
    if (!orderItem || orderItem?.isPaid) return;

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
    });

    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be peformed
    if (checkoutSession.payment_status !== "unpaid") {
        orderItem.isPaid = true;
        orderItem.paidAt = Date.now();
        orderItem.paymentStatus = {
            id: sessionId,
            email,
        };
        const updatedOrder = await orderItem.save();
    }
};