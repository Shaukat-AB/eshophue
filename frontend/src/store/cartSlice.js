import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "Stripe" };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const itemExists = state.cartItems.find(
                (item) => item._id === newItem._id
            );
            if (!itemExists) {
                state.cartItems = [...state.cartItems, newItem];
            } else {
                // update existing item
                state.cartItems = state.cartItems.map((item) =>
                    item._id === itemExists._id ? newItem : item
                );
            }
            updateTotalPrice(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item._id !== id);
            updateTotalPrice(state);
        },
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.removeItem("cart");
        },
    },
});

const fixDecimals = (num) => {
    return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

const updateTotalPrice = (state) => {
    // Calculate itemsPrice = sum of all item.price values multiply by item.orderCount
    state.itemsPrice = fixDecimals(
        state.cartItems.reduce(
            (acc, item) => acc + item.price * item.orderCount,
            0
        ) // start with acc = 0
    );

    //Suppose Shipping price is free for over 100$ purchase otherwise its 10$
    state.shippingPrice = fixDecimals(state.itemsPrice > 100 ? 0.0 : 10.0);

    // Suppose tax price is 15%
    state.taxPrice = fixDecimals(0.15 * state.itemsPrice);

    // Calculate total price = itemsPrice + taxPrice + shippingPrice
    state.totalPrice = fixDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
    );

    localStorage.setItem("cart", JSON.stringify(state));
};

export const {
    addToCart,
    removeFromCart,
    setShippingAddress,
    setPaymentMethod,
    clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
