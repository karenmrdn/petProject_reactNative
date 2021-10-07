import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "Articles",
  initialState: {
    articles: [],
  },
  reducers: {
    addArticle(state, action) {
      state.articles = [...state.articles, action.payload];
    },
  },
});

export const articlesActions = articlesSlice.actions;

export default articlesSlice.reducer;
