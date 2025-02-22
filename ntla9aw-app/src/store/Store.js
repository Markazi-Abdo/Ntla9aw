import { configureStore } from "@reduxjs/toolkit";
import authSlice from './AuthSlice';
import carSlice from './CarSlice'
import rentSlice from './RentSlice'
import adminSlice from './AdminSlice'

export const store = configureStore({
    reducer:{
        'auth': authSlice,
        'products': carSlice,
        'books': rentSlice,
        'admin': adminSlice
    }
})