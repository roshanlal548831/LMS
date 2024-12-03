import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedin } from "../authSlice";
import { toast } from "sonner";

const USER_API = "http://localhost:8000/api/v1/user/";

export const authApi = createApi({
      reducerPath:"authApi",
      baseQuery:fetchBaseQuery({
       baseUrl:USER_API,
       Credentials:"inclode" // isse error nahi ayega
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
                //   toast.succesrror.error.error){
                    //       toast.error(error.error.error)                  
                    //   }else{
                    //       toast.error(error.error.data.message)                  

                    // }s(res.data.message)
                //   console.log(res.data)
                  
                  dispatch(userLoggedin({user:res.data.user}))
             } catch (error) {
                
                    //   if(e
              }
           }
        }),
      })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
} = authApi 