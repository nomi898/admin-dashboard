import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "./emailsSlice";
import stockReducer from "./stockSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      emails: emailsReducer,
      stock: stockReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

