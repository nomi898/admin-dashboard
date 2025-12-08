import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, initialContacts } from "@/data/contacts";

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: initialContacts,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const newId = Math.max(...state.contacts.map((c) => c.id), 0) + 1;
      state.contacts.push({
        ...action.payload,
        id: newId,
      });
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
  },
});

export const { addContact, updateContact, deleteContact, setContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;

