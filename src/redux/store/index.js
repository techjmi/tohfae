/*
 * Redux Store Configuration
 *
 * Configures the Redux store with reducers and middleware
 * Exports the store for use in the application
 */

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/slice/authSlice";

export const createStore = () => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                },
            }),
        devTools: process.env.NODE_ENV === "development",
    });
    return store;
}