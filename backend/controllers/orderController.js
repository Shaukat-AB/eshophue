import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create an order item
// @route   POST /orders
// @access  Private
export const createOrderItem = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;

    if (!orderItems || orderItems?.length === 0) {
        res.status(404);
        throw new Error("No order items");
    } else {
        const order = new Order({
            orderItems: orderItems.map((item) => ({
                ...item,
                product: item._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentStatus: { email: req.user.email },
        });
        const orderItem = await order.save();
        res.status(201).json(orderItem);
    }
});

// @desc    Get orders of User logged in
// @route   GET /orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc    Get by id
// @route   GET /orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
    const orderItem = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (orderItem) {
        res.status(200).json(orderItem);
    } else {
        res.status(404);
        throw new Error("No order item found by id");
    }
});

// @desc    Update order to paid
// @route   PUT /orders/:id/pay
// @access  Private
export const setOrderToPaid = asyncHandler(async (req, res) => {
    const orderItem = await Order.findById(req.params.id);

    if (orderItem && !orderItem.isPaid) {
        orderItem.isPaid = true;
        orderItem.paidAt = Date.now();
        orderItem.paymentStatus = {
            email: req.user.email,
        };
        const updatedOrder = await orderItem.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order item does not exist or already paid");
    }
});

// @desc    Update order to delivered
// @route   PUT /orders/:id/deliver
// @access  Private/Admin
export const setOrderToDelivered = asyncHandler(async (req, res) => {
    const orderItem = await Order.findById(req.params.id);

    if (orderItem) {
        orderItem.isDelivered = true;
        orderItem.deliveredAt = Date.now();

        const updatedOrder = await orderItem.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("No order item found");
    }
});

// @desc    Update order to paid
// @route   GET /orders/
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);
});
