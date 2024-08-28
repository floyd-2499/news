import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { THE_GUARDIAN_API_KEY, THE_GUARDIAN_URL } from "../../config/env";

export const TheGuardianAction = createAsyncThunk("theGuardian",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetch(`${THE_GUARDIAN_URL}?api-key=${THE_GUARDIAN_API_KEY}&q=${payload?.query}&from-date=${payload?.startDate}&to-date=${payload?.endDate}`);

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

const TheGuardianSlice = createSlice({
    name: "theGuardian",
    initialState: {
        isLoading: false,
        data: false,
        error: null,
        success: false
    },
    reducers: {
        TheGuardianReset: () => {
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
            .addCase(TheGuardianAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(TheGuardianAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
                state.error = null;
                state.success = true;
            })
            .addCase(TheGuardianAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.success = false;
            });
    },
})

export const { TheGuardianReset } = TheGuardianSlice.actions
export default TheGuardianSlice.reducer