/**
 * StoreProvider
 *
 * Client-side wrapper component that provides the Redux store
 * for the entire application
 *
 * Features:
 * - Fetches user data on client side mount
 * - Syncs user data with Redux store
 * - Persists user data to localStorage
 * - Prevents hydration mismatches
 *
 * Usage in layout.js:
 * import StoreProvider from '@/components/providers/StoreProvider';
 *
 * <StoreProvider>
 *   {children}
 * </StoreProvider>
 */

"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "@/redux/store";
import { setUser, clearUser } from "@/redux/slice/authSlice";
import apiClient from "@/services/api/client";
import { ENDPOINT } from "@/services/api/endpoint";
import { mapUserResponse } from "@/services/user/user.mapper";

export default function StoreProvider({ children }) {
    const storeRef = useRef();
    const initializedRef = useRef(false);

    if (!storeRef.current) {
        storeRef.current = createStore();
    }
    const { store, persistor } = storeRef.current;

    useEffect(() => {
        // Fetch user data from API on client side after rehydration
        const fetchUserData = async () => {
            if (initializedRef.current) return;

            // Wait for rehydration to complete
            const unsubscribe = persistor.subscribe(() => {
                const state = persistor.getState();
                if (state.bootstrapped && !initializedRef.current) {
                    initializedRef.current = true;
                    unsubscribe();

                    // Fetch user data from API to verify cookies
                    (async () => {
                        try {
                            const response = await apiClient.get(ENDPOINT.USER.ME);
                            const userData = mapUserResponse(response);

                            if (userData) {
                                store.dispatch(setUser(userData));
                            }
                        } catch (error) {
                            // If API call fails (401, network error, etc.), clear user data
                            console.log('Not authenticated or session expired');
                            store.dispatch(clearUser());
                        }
                    })();
                }
            });

            return () => unsubscribe();
        };

        fetchUserData();
        // store and persistor are stable values from refs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}