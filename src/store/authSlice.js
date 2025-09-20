import { createSlice } from '@reduxjs/toolkit';
import Favourite from '../screens/Favourite';

const initialState = {
  status: false,
  userData: null,
  totalCart: [],
  favourite: [],
  history: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.totalCart.find(
        cartItem => cartItem.id === item.id && cartItem.size === item.size,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.totalCart.push({ ...item, quantity: 1 });
      }

      const existingHistory = state.history.find(
        historyItem =>
          historyItem.id === item.id
      );

      if (existingHistory) {
        existingHistory.quantity += 1; 
      } else {
        state.history.push({
          ...item,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
      }
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.totalCart = state.totalCart.filter(
        cartItem => !(cartItem.id === id && cartItem.size === size),
      );
    },

    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const existingItem = state.totalCart.find(
        cartItem => cartItem.id === id && cartItem.size === size,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.totalCart = state.totalCart.filter(
            cartItem => !(cartItem.id === id && cartItem.size === size),
          );
        }
      }
    },

    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const existingItem = state.totalCart.find(
        cartItem => cartItem.id === id && cartItem.size === size,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    addToFavourites: (state, action) => {
      const data = action.payload;
      const existingItem = state.favourite.find(item => item.id === data.id);
      if (!existingItem) {
        state.favourite.push(data);
      }
    },

    removeFavourites: (state, action) => {
      const data = action.payload;
      state.favourite = state.favourite.filter(item => item.id !== data.id);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  addToFavourites,
  removeFavourites,
} = authSlice.actions;

export default authSlice.reducer;
