import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

const existItem = state.cartItems.find(
  (item) =>
    item._id === action.payload._id &&
    item.size === action.payload.size
);


      if (existItem) {
        existItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item) item.qty = qty;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
