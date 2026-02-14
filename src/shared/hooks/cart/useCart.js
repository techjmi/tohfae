/**
 * useCart Hook
 * 
 * Manages shopping cart state and actions
 * Handles both local storage and database sync
 * 
 * Usage:
 * const { cartItems, totalQuantity, addToCart, updateQuantity, etc. } = useCart();
 */
"use client";
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../state/useSelector';
import { setLoading } from '@/redux/slice/cartSlice';
export const useCart = () => {
    const{user}=useSelector(userSelector);
    console.log('1234 user', user);
    const dispatch = useDispatch();
    try {
        dispatch(setLoading(true));
        
    } catch (error) {
        console.log('error', error);
    }
}