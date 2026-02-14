/**
 * Auth Slice
 * Manages user authentication state
 * Token is handled by Clerk/JWT via httpOnly cookies
 */
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        signInSuccess: (state, action) => {
            state.user = action.payload.user || action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        },

        login: (state, action) => {
            state.user = action.payload.user || action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },

        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },

        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

        clearError: (state) => {
            state.error = null;
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isAuthenticated'],
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    login,
    logout,
    setUser,
    updateUser,
    clearUser,
    clearError,
    setLoading,
} = authSlice.actions;

export const selectUser = (state) => state.auth?.user;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated || !!state.auth?.user;
export const selectIsLoading = (state) => state.auth?.isLoading || false;
export const selectError = (state) => state.auth?.error;
export const selectUserId = (state) => state.auth?.user?.id;
export const selectUserName = (state) => state.auth?.user?.name;
export const selectUserEmail = (state) => state.auth?.user?.email;
export const selectUserRole = (state) => state.auth?.user?.role;
export const selectUserAvatar = (state) => state.auth?.user?.avatar;

export const authReducer = persistedReducer;
