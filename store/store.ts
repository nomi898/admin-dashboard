import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "./emailsSlice";
import stockReducer from "./stockSlice";
import calendarReducer from "./calendarSlice";
import todosReducer from "./todosSlice";
import contactsReducer from "./contactsSlice";
import invoiceReducer from "./invoiceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      emails: emailsReducer,
      stock: stockReducer,
      calendar: calendarReducer,
      todos: todosReducer,
      contacts: contactsReducer,
      invoice: invoiceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

