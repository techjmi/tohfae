/**
 * StoreProvider
 * 
 * Client-side wrapper component that provides the Redux store
 * for the entire application
 * 
 * Usage in layout.js:
 * import StoreProvider from '@/components/providers/StoreProvider';
 * 
 * <StoreProvider>
 *   {children}
 * </StoreProvider>
 */

"use client";

import { useRef } from "react"; // Import useRef hook for storing the store reference
import { Provider } from "react-redux";
import { createStore } from "@/redux/store";

export default function StoreProvider({ children }) {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = createStore();
    }
    const store = storeRef.current; // Use the stored reference to the store
    return <Provider store={store}>{children}</Provider>;
}