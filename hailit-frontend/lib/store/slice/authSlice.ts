import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SupabaseAuth {
    authenticationState: boolean;
}

const initialState:SupabaseAuth = {
    authenticationState: false
}

export const supabaseAuthSlice = createSlice({
    name: "supabase auth",
    initialState,
    reducers: {
        setAuthState(state, action:PayloadAction<boolean>) {
            state.authenticationState = action.payload;
        }
    }
})

export const { setAuthState } = supabaseAuthSlice.actions