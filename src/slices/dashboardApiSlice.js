import { apiSlice } from './apiSlice';
import { DASHBOARD_URL } from '../constants';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: DASHBOARD_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApiSlice;
