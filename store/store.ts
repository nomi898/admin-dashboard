import { configureStore } from "@reduxjs/toolkit";

// Placeholder reducer for initial setup
const placeholderReducer = (state = {}) => state;

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add your complex state reducers here in the future
      // Example: user: userReducer,
      // Example: orders: ordersReducer,
      _placeholder: placeholderReducer, // Temporary reducer to avoid empty reducer error
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

