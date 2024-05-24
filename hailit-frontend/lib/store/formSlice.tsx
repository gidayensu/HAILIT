import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Form {
    formSubmissionLoading: boolean,
    formSubmissionError: boolean,

}

type FormSubmissionLoading = boolean;
type FormSubmissionError = boolean;
type ChosenRole = "customer" | "dispatcher";

const initialState: Form = {
    formSubmissionLoading: false,
    formSubmissionError: false
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
        
    }

})

export const {setFormSubmissionLoading, setFormSubmissionError} = formSlice.actions;
