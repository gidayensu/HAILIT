import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Form {
    formSubmissionLoading: boolean,
    formSubmissionError: boolean,
    newTripSuccess: boolean,
}

type FormSubmissionLoading = boolean;
type FormSubmissionError = boolean;


const initialState: Form = {
    formSubmissionLoading: false,
    formSubmissionError: false,
    newTripSuccess: false,
}

export const formSlice = createSlice({
    name: "onBoarding state",
    initialState,
    reducers: {
        setFormSubmissionLoading (state, action:PayloadAction<FormSubmissionLoading>) {
            state.formSubmissionLoading = action.payload
        },
        setFormSubmissionError (state, action:PayloadAction<FormSubmissionError>) {
            state.formSubmissionLoading = action.payload
        },
        setNewTripSuccess(state, action:PayloadAction<boolean>) {
            state.newTripSuccess = action.payload
        }
        
    }

})

export const {setFormSubmissionLoading, setFormSubmissionError, setNewTripSuccess} = formSlice.actions;
