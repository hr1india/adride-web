import {apiSlice} from './apiSlice';
import {HELMETWALA_URL} from '../constants';

export const helmetApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getHelmets: builder.query({
            query: () => ({
                url : HELMETWALA_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllRejectedHelmets: builder.query({
            query: () => ({
                url: `${HELMETWALA_URL}/ads/rejected`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllApprovedHelmets: builder.query({
            query: () => ({
                url: `${HELMETWALA_URL}/ads/approved`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllPendingHelmets: builder.query({
            query: () => ({
                url: `${HELMETWALA_URL}/ads/pending`,
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useGetHelmetsQuery, useGetAllRejectedHelmetsQuery, useGetAllApprovedHelmetsQuery, useGetAllPendingHelmetsQuery} = helmetApiSlice;