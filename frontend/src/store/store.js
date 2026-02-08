import { configureStore } from '@reduxjs/toolkit';
import rawMaterialsReducer from './slices/rawMaterialsSlice';
import productsReducer from './slices/productsSlice';
import productionReducer from './slices/productionSlice';

export const store = configureStore({
  reducer: {
    rawMaterials: rawMaterialsReducer,
    products: productsReducer,
    production: productionReducer,
  },
});