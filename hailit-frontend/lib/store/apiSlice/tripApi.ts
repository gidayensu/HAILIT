import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewTrip } from "@/components/Form/NewOrderForm";

interface IHeader {
  "X-RapidAPI-Key": string;
  "X-RapidAPI-Host": string;
}
const Header: IHeader = {
  "X-RapidAPI-Key": "6b365afe7cmsh5548dfde4720349p10e88bjsn3c9175ff3429",
  "X-RapidAPI-Host": "http://localhost:5000/api/v1/trip/user-trip/",
};

// API endpoint for fetching data
export const tripApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/trip/`,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", Header["X-RapidAPI-Key"]);
      headers.set("X-RapidAPI-Host", Header["X-RapidAPI-Host"]);

      return headers;
    },
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