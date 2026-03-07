/**
 * StoreProvider
 *
 * Client-side wrapper component that provides the Redux store
 * for the entire application with SSR support
 *
 * Features:
 * - Accepts initialUser from SSR (layout.js)
 * - Syncs SSR user data with Redux store
 * - Persists user data to localStorage
 * - Prevents hydration mismatches
 *
 * Usage in layout.js:
 * import StoreProvider from '@/components/providers/StoreProvider';
 *
 * const userData = await getUserData(); // SSR fetch
 * <StoreProvider initialUser={userData}>
 *   {children}
 * </StoreProvider>
 */

"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "@/redux/store";
import { setUser } from "@/redux/slice/authSlice";

export default function StoreProvider({ children, initialUser }) {
    const storeRef = useRef();
    const initializedRef = useRef(false);

    if (!storeRef.current) {
        storeRef.current = createStore();
    }
    const { store, persistor } = storeRef.current;
    useEffect(() => {
        // Only set initial user once to avoid overwriting persisted data unnecessarily
        if (initialUser && !initializedRef.current) {
            // Wait for rehydration to complete before setting SSR data
            const unsubscribe = persistor.subscribe(() => {
                const state = persistor.getState();
                if (state.bootstrapped) {
                    // Check if we already have user data from persistence
                    const currentUser = store.getState().auth?.user;

                    // Only set SSR user if we don't have persisted user data
                    // This prevents overwriting fresh login data with stale SSR data
                    if (!currentUser) {
                        store.dispatch(setUser(initialUser));
                    }

                    initializedRef.current = true;
                    unsubscribe();
                }
            });

            return () => unsubscribe();
        }
        // store and persistor are stable values from refs and don't need to be in dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialUser]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}