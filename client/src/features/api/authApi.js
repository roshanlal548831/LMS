import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedin } from "../authSlice";
import { toast } from "sonner";

const USER_API = "http://localhost:8000/api/v1/user/";

export const authApi = createApi({
      reducerPath:"authApi",
      baseQuery:fetchBaseQuery({
       baseUrl:USER_API,
      credentials: "include",  // Ensures cookies are sent with requests


      }),

      endpoints:(builder) => ({
        registerUser: builder.mutation({
            query:(signupInput) => ({
                url:"register",
                method:"POST",
                body:signupInput
            })
        }),
        
        loginUser: builder.mutation({
            query:(loginInput) => ({
                url:"login",
                method:"POST",
                body:loginInput
            }),
           async onQueryStarted(_, {queryFulfilled,dispatch}){
              try {
                  const res = await queryFulfilled;
                  dispatch(userLoggedin({user:res.data.user}))
             } catch (error) {
                
                    //   if(e
              }
           }
        }),
        logoutUser: builder.mutation({
            query:()=>({
                url:"logout",
                method:"GEt"
            })
        }),
        loadUser:builder.query({
            query:() => ({
                url:"profile",
                method:"GET"
            })
        }),

        updateUser:builder.mutation({
            query:(formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })

      })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useLogoutUserMutation
} = authApi 