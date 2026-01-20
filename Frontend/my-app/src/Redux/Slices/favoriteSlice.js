import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;

      const exists = state.favorites.find(
        (p) => p._id === product._id
      );

      if (exists) {
        // REMOVE
        state.favorites = state.favorites.filter(
          (p) => p._id !== product._id
        );
      } else {
        // ADD
        state.favorites.push(product);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
