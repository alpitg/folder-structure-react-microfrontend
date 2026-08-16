import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingBagItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface ShoppingBagState {
  items: ShoppingBagItem[];
}

const initialState: ShoppingBagState = {
  items: [],
};

const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState,
  reducers: {
    addItemToBag: (state, action: PayloadAction<ShoppingBagItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    increaseBagItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseBagItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload,
      );

      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
      }
    },
    removeBagItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearBag: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToBag,
  increaseBagItemQuantity,
  decreaseBagItemQuantity,
  removeBagItem,
  clearBag,
} = shoppingBagSlice.actions;

export default shoppingBagSlice;
