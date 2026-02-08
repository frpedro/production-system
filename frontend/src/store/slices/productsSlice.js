import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await api.fetchProducts();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'products/create',
  async (data) => {
    const response = await api.createProduct(data);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/update',
  async ({ id, data }) => {
    const response = await api.updateProduct(id, data);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/delete',
  async (id) => {
    await api.deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;