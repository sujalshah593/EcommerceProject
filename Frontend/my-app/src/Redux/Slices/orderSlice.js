import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

export const fetchMyOrders = createAsyncThunk(
    "orders/fetchMyOrders",
    async (_, { rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/orders/my-orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return data;
        } catch (error) {
            rejectWithValue(
                error.response?.data?.message || "Failed to fetch my orders"
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder        .addCase(fetchMyOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(fetchMyOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default orderSlice.reducer;

