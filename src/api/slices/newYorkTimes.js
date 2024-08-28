import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { NEW_YORK_TIMES_API_KEY, NEW_YORK_TIMES_URL } from "../../config/env";

export const NewYorkTimesAction = createAsyncThunk("newYorkTimes",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${NEW_YORK_TIMES_URL}?api-key=${NEW_YORK_TIMES_API_KEY}&begin_date=${payload?.startDate}&end_date=${payload?.endDate}&q=${payload.query || ""}`
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

const NewYorkTimesSlice = createSlice({
    name: "newYorkTimes",
    initialState: {
        isLoading: false,
        data: false,
        error: null,
        success: false
    },
    reducers: {
        NewYorkTimesReset: () => {
            return {
                isLoading: false,
                data: false,
                error: null,
                success: false
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(NewYorkTimesAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(NewYorkTimesAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
                state.error = null;
                state.success = true;
            })
            .addCase(NewYorkTimesAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.success = false;
            });
    },
})

export const { NewYorkTimesReset } = NewYorkTimesSlice.actions
export default NewYorkTimesSlice.reducer