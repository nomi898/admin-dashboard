import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductStock, initialStock } from "@/data/stock";

interface StockState {
  products: ProductStock[];
}

const initialState: StockState = {
  products: initialStock,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<ProductStock, "id">>) => {
      const newId = Math.max(...state.products.map((p) => p.id), 0) + 1;
      state.products.push({
        ...action.payload,
        id: newId,
      });
    },
    updateProduct: (state, action: PayloadAction<ProductStock>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setProducts: (state, action: PayloadAction<ProductStock[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = stockSlice.actions;
export default stockSlice.reducer;

