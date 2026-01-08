import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASEURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  endpoints: (builder) => ({
    signupStep1: builder.mutation({
      query: (getsignUp1Data) => ({
        url: "/api/users/signup-step1",
        method: "POST",
        body: getsignUp1Data,
        credentials: "include",
      }),
    }),
    signupStep2: builder.mutation({
      query: (getsignUp2Data) => ({
        url: "/api/users/signup-step2",
        method: "POST",
        body: getsignUp2Data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignupStep1Mutation, useSignupStep2Mutation } = userApi;
