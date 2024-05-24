import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OnBoarding {
    stageOne: boolean,
    stageTwo: boolean,
    stageThree: boolean,
    chosenRole: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    license_number: string,
    onboard: boolean,

}

type Onboard = boolean;
type ChosenRole = "customer" | "dispatcher";

interface OnboardingStages {
    stageOne: boolean,
    stageTwo: boolean,
    stageThree: boolean,
}

const initialState:OnBoarding = {
    stageOne: true,
    stageTwo: false,
    stageThree: false,
    chosenRole: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    license_number: '',
    onboard: false
}

export interface CustomerDetails {
    first_name: string,
    last_name: string,
    phone_number: string,
}

export interface DispatcherDetails {
    first_name: string,
    last_name: string,
    phone_number: string,
    license_number: string,
}

export const onBoardingSlice = createSlice({
    name: "onBoarding state",
    initialState,
    reducers: {
        setOnboardingStages (state, action:PayloadAction<OnboardingStages>) {
            state.stageOne = action.payload.stageOne
            state.stageTwo = action.payload.stageTwo
            state.stageThree = action.payload.stageThree
        },
        
        setChosenRole(state, action:PayloadAction<ChosenRole>) {
            state.chosenRole = action.payload
        },

        setCustomerDetails (state, action) {

        },

        setDispatcherDetails (state, action:PayloadAction<CustomerDetails>) {
           state.first_name = action.payload.first_name
           state.last_name = action.payload.last_name
           state.phone_number = action.payload.phone_number 
        }, 
        
        setBoardingCompletion(state, action:PayloadAction<Onboard>) {
            state.onboard = action.payload
            
        },

        
    }

})

export const {setOnboardingStages, setChosenRole, setBoardingCompletion} = onBoardingSlice.actions;
