import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderDetails {
    trip_id: string,
    scheduled: boolean,

    order_success: boolean,
}

const initialState: OrderDetails = {
    trip_id: '',
    scheduled: false,
    order_success: false
}
export const newOrderSlice = createSlice({
    name: 'trackOrder',
    initialState,
    reducers: {
        setNewOrder (state, action:PayloadAction<OrderDetails>) {
            state.trip_id = action.payload.trip_id
            state.scheduled = action.payload.scheduled
            state.order_success = action.payload.order_success           
            
        },
        
    }
})

export const { setNewOrder } = newOrderSlice.actions