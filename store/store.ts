import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "./emailsSlice";
import stockReducer from "./stockSlice";
import calendarReducer from "./calendarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      emails: emailsReducer,
      stock: stockReducer,
      calendar: calendarReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

