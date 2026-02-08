import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';

export const fetchProductionSuggestionsAsync = createAsyncThunk(
  'production/fetchSuggestions',
  async () => {
    const response = await api.fetchProductionSuggestions();
    return response.data;
  }
);

const productionSlice = createSlice({
  name: 'production',
  initialState: {
    suggestions: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionSuggestionsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductionSuggestionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchProductionSuggestionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productionSlice.reducer;