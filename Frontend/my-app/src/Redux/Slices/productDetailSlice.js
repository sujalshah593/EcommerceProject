import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/axios.js';

export const fetchProductById = createAsyncThunk(
    "productDetails/fetchById",
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/products/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch Product"
            );
        }
    }
);

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetProductsDetails: (state) => {
            state.product = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action)  => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { resetProductsDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;