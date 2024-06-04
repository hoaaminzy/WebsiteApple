import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },
    increaseQty(state, action) {
      const index = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.items[index].quantity += 1;
        state.totalQty += 1;
        state.totalPrice += state.items[index].sellingPrice || 0;
      }
    },
    decreaseQty(state, action) {
      const index = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1 && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
        state.totalQty -= 1;
        state.totalPrice -= state.items[index].sellingPrice || 0;
      }
    },
  },
});

export const {
  increaseQty,
  decreaseQty,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
