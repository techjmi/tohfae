/*
 * Redux Store Configuration
 *
 * Configures the Redux store with reducers and middleware
 * Exports the store for use in the application
 */

import { configureStore } from "@reduxjs/toolkit";
export const createStore = () => {
    const store = configureStore({
        reducer: {},
        devTools: process.env.NODE_ENV === "development",
    });
    return store;
}