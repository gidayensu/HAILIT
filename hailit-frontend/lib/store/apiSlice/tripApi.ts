import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewTrip } from "@/components/Form/NewOrderForm";


// API endpoint for fetching data
export const tripApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/trip/`,
   
  }),

  endpoints: (builder) => ({
    getTripDetails: builder.query<any, string|string[]>({ 
      query: (tripId) => ({
        url: `user-trip/${tripId}`, 
        method: "GET"
      }),
    }),
    addTrip: builder.query<any, any>({ 
      query: (tripDetails) => ({
        url: `add`, 
        method: "POST",
        body: tripDetails
      }),
    }),
    updateTrip: builder.query<any, any>({ 
      query: ({tripId, tripDetails}) => ({
        url: `add`, 
        method: "POST",
        body: tripDetails
      }),
    }),
    
  }),
  
});

export const { useGetTripDetailsQuery, useAddTripQuery, useLazyAddTripQuery } = tripApi;
