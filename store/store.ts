import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "./emailsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      emails: emailsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

