import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';

export const fetchRawMaterialsAsync = createAsyncThunk(
  'rawMaterials/fetchAll',
  async () => {
    const response = await api.fetchRawMaterials();
    return response.data;
  }
);

export const createRawMaterialAsync = createAsyncThunk(
  'rawMaterials/create',
  async (data) => {
    const response = await api.createRawMaterial(data);
    return response.data;
  }
);

export const updateRawMaterialAsync = createAsyncThunk(
  'rawMaterials/update',
  async ({ id, data }) => {
    const response = await api.updateRawMaterial(id, data);
    return response.data;
  }
);

export const deleteRawMaterialAsync = createAsyncThunk(
  'rawMaterials/delete',
  async (id) => {
    await api.deleteRawMaterial(id);
    return id;
  }
);

const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRawMaterialsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawMaterialsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterialsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createRawMaterialAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateRawMaterialAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteRawMaterialAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default rawMaterialsSlice.reducer;