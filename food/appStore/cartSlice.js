import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store items in the cart
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload._id);
    },
    incrementItemQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItemQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i._id !== action.payload._id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
