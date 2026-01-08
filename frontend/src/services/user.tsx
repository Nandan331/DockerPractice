import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASEURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  endpoints: (builder) => ({

    // First Sign up setup (takes only email and password)
    signupStep1: builder.mutation({
      query: (getsignUp1Data) => ({
        url: "/api/users/signup-step1",
        method: "POST",
        body: getsignUp1Data,
        credentials: "include",
      }),
    }),

    // Second Sign up setup (takes profile info)
    signupStep2: builder.mutation({
      query: (getsignUp2Data) => ({
        url: "/api/users/signup-step2",
        method: "POST",
        body: getsignUp2Data,
        credentials: "include",
      }),
    }),

    // User login
    userLogin: builder.mutation({
      query: (loginData) => ({
        url: "/api/users/login",
        method: "POST",
        credentials: "include",
        body: loginData,
      }),
    }),

    //User logout
    userLogout: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    // Gets User info
    getUser: builder.query({
      query: () => ({
        url: "/api/users/getuser",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupStep1Mutation,
  useSignupStep2Mutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useGetUserQuery,
} = userApi;
