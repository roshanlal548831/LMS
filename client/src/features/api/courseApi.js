import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const COURSE_API = "http://localhost:8000/api/v1/course/";

export const courseApi = createApi({
        tagTypes:["Refetch_Creator_Course"],
        baseQuery:fetchBaseQuery({
         baseUrl:COURSE_API,
        credentials: "include",  // Ensures cookies are sent with requests
  
  
        }),
    
    endpoints:(builder) => ({

        createCourse: builder.mutation({
            query:({courseTitle,category})=>({
                url:"",
                method:"POST",
                body:{courseTitle,category}
            }),
            invalidatesTags:["Refetch_Creator_Course"]
        }),

        getCreatorCourse: builder.query({
            query: () => ({
              url: "",
              method: "GET",
            }),
            providesTags: ["Refetch_Creator_Course"],
          }),

    }),
});

export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery
} = courseApi;