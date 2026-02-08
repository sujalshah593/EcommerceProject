import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, targetGroup }, { rejectWithValue }) => {
    try {
      let url = `/products?page=${page}`;

      if (targetGroup) {
        url += `&targetGroup=${targetGroup}`;
      }

      const { data } = await api.get(url);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch produts"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    page: 1,
    pages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetProducts: (state) => {
    state.products = [];
    state.page = 1;
    state.pages = 1;
    state.error = null;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page;
        state.pages = action.payload.pages;

        if (action.payload.page > 1) {
          const existingIds = new Set(state.products.map((p) => p._id));

          const newProducts = action.payload.products.filter(
            (p) => !existingIds.has(p._id)
          );

          state.products = [...state.products, ...newProducts];
        } else {
          state.products = action.payload.products;
        }
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;

