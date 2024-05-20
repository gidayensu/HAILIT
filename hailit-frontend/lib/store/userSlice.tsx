import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface User {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    onboard: boolean

}

const initialState:User = {
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    onboard: false

}
export const userSlice = createSlice({
    name: "user state",
    initialState,
    reducers: {
        setUserState(state, action:PayloadAction<User>) {
            
            state.user_id = action.payload.user_id
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.onboard = action.payload.onboard
            
        },
        setBoardingCompletion(state, action:PayloadAction<boolean>) {
            console.log('this really runs')
            state.onboard = action.payload
            console.log('this is payload action',action.payload)
        },

        logUserOut(state) {
            state.user_id = ''
            state.email = ''
            state.first_name = ''
            state.last_name = ''
            state.onboard = false

        }
    }

})

export const {setUserState, logUserOut, setBoardingCompletion} = userSlice.actions;
