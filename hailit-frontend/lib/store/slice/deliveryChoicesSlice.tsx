import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryChoice {
    destination_city: string,
    trip_type:string,
    trip_medium: string,
    scheduled: boolean,
    package_type: string
}

const initialState: DeliveryChoice = {
    destination_city: '',
    trip_type:'',
    trip_medium: '',
    scheduled: false,
    package_type: '',
}

export const deliveryChoiceSlice = createSlice({
    name: 'delivery choice',
    initialState, 
    reducers: {
        setDestinationCity (state, action:PayloadAction<string>) {
            state.destination_city = action.payload;
        },
        setDeliveryDay (state, action:PayloadAction<string>) {
            state.trip_type = action.payload;
        },
        setDeliveryMedium (state, action:PayloadAction<string>) {
            state.trip_medium = action.payload;
        },
        setScheduled (state, action:PayloadAction<boolean>) {
            state.scheduled = action.payload;
        },
        setPackageType (state,action:PayloadAction<string>) {
            state.package_type = action.payload;
        },
        resetDeliveryChoices (state, action:PayloadAction<DeliveryChoice>) {
            state.trip_type = '';
            state.trip_medium = '';
            state.destination_city = '';
            state.package_type = '';
            state.scheduled = false;
            
        }
    }

})

export const {setDeliveryDay, setDeliveryMedium, setDestinationCity, setPackageType, setScheduled, resetDeliveryChoices} = deliveryChoiceSlice.actions;