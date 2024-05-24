import {configureStore} from '@reduxjs/toolkit';
import { supabaseAuthSlice } from './authSlice';
import { userSlice } from './userSlice';
import { onBoardingSlice } from './onBoardingSlice';
import { formSlice } from './formSlice';



export const store = configureStore({
        reducer: {
            auth: supabaseAuthSlice.reducer,
            user: userSlice.reducer,
            onBoarding: onBoardingSlice.reducer,
            form: formSlice.reducer
        }
    })



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

