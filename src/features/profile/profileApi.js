import { baseApi } from "../../utils/apiBaseQuery";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfileByPropertyManager: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

     updateProfileByServiceProvider: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteMyAccount : builder.mutation({
      query: () => ({
        url: "/user/me",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

  }),
});

// Export hooks
export const {
  useMyProfileQuery,
  useUpdateProfileByPropertyManagerMutation,
  useUpdateProfileByServiceProviderMutation,
  useDeleteMyAccountMutation,
} = profileApi;


