/**
 * Wishlist Reducer
 * 
 * Manages the state of the user's wishlist
 * Actions: add, remove, clear
 * State shape: { products: [] }
 */

import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
