import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { NEWS_API_KEY, NEWS_API_URL } from "../../config/env";

export const NEWSApiAction = createAsyncThunk("newsApi",
    async (query, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${NEWS_API_URL}?apiKey=${NEWS_API_KEY}&q=${query?.search || ""}&from=${query?.date || ""}&country=${query?.country || "in"}`,
                { method: "GET" }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch news data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }

)

const NEWSApiSlice = createSlice({
    name: "newsApi",
    initialState: {
        isLoading: false,
        data: null,
        error: null,
        success: false,
    },
    reducers: {
        NEWSApiReset: () => {
            return {
                isLoading: false,
                data: null,
                error: null,
                success: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(NEWSApiAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(NEWSApiAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
                state.error = null;
                state.success = true;
            })
            .addCase(NEWSApiAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.success = false;
            });
    },
});

export const { NEWSApiReset } = NEWSApiSlice.actions
export default NEWSApiSlice.reducer