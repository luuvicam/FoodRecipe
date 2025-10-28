import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (favRecipe) => favRecipe.idFood === recipe.idFood
      );
      
      if (existingIndex >= 0) {
        // Recipe already exists in favorites, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe doesn't exist in favorites, add it
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
