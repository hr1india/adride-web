import {apiSlice} from './apiSlice';
import {WALLS_URL} from '../constants';

export const wallApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getWalls: builder.query({
            query: () => ({
                url : WALLS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getWallsById: builder.query({
            query: (id) => ({
                url : `${WALLS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        changeAdStatus: builder.mutation({
            query: ({Id, data} ) => ({
                url: `${WALLS_URL}/change-status/${Id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAllPendingAds: builder.query({
            query: () => ({
                url: `${WALLS_URL}/ads/pending`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllApprovedAds: builder.query({
            query: () => ({
                url: `${WALLS_URL}/ads/approved`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllRejectedAds: builder.query({
            query: () => ({
                url: `${WALLS_URL}/ads/rejected`,
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useGetWallsQuery, useGetWallsByIdQuery, useChangeAdStatusMutation, useGetAllPendingAdsQuery, useGetAllApprovedAdsQuery, useGetAllRejectedAdsQuery} = wallApiSlice;