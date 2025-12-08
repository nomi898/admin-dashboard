import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice, InvoiceItem, initialInvoice } from "@/data/invoices";

interface InvoiceState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
}

const initialState: InvoiceState = {
  invoices: [initialInvoice],
  currentInvoice: initialInvoice,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setCurrentInvoice: (state, action: PayloadAction<Invoice | null>) => {
      state.currentInvoice = action.payload;
    },
    updateInvoiceDetails: (
      state,
      action: PayloadAction<Partial<Omit<Invoice, "items" | "id">>>
    ) => {
      if (state.currentInvoice) {
        state.currentInvoice = {
          ...state.currentInvoice,
          ...action.payload,
        };
      }
    },
    addInvoiceItem: (state, action: PayloadAction<Omit<InvoiceItem, "id" | "serialNo" | "totalCost">>) => {
      if (state.currentInvoice) {
        const newSerialNo = state.currentInvoice.items.length + 1;
        const newItem: InvoiceItem = {
          ...action.payload,
          id: Date.now(),
          serialNo: newSerialNo,
          totalCost: action.payload.quantity * action.payload.baseCost,
        };
        state.currentInvoice.items.push(newItem);
      }
    },
    updateInvoiceItem: (state, action: PayloadAction<InvoiceItem>) => {
      if (state.currentInvoice) {
        const index = state.currentInvoice.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.currentInvoice.items[index] = {
            ...action.payload,
            totalCost: action.payload.quantity * action.payload.baseCost,
          };
        }
      }
    },
    deleteInvoiceItem: (state, action: PayloadAction<number>) => {
      if (state.currentInvoice) {
        state.currentInvoice.items = state.currentInvoice.items.filter(
          (item) => item.id !== action.payload
        );
        // Re-number serial numbers
        state.currentInvoice.items.forEach((item, index) => {
          item.serialNo = index + 1;
        });
      }
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
      state.currentInvoice = action.payload;
    },
  },
});

export const {
  setCurrentInvoice,
  updateInvoiceDetails,
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
  addInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

