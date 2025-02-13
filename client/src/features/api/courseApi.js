import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const COURSE_API = "http://localhost:8000/api/v1/course/";

export const courseApi = createApi({
    tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture", "Refetch_Status"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include",  // Ensures cookies are sent with requests


    }),

    endpoints: (builder) => ({

        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ["Refetch_Creator_Course"]
        }),
        getPublishedCourses: builder.query({
            query: () => ({
                url: "published-courses",
                method: "GET"
            })
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ["Refetch_Creator_Course", "Refetch_Status"],
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `${courseId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["Refetch_Creator_Course",]
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `${courseId}`,
                method: "GET",

            }),
            providesTags: ["Refetch_Status", "Refetch_Lecture"]
        }),
        createLecture: builder.mutation({
            query: ({ courseId, lectureTitle }) => ({
                url: `${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle }

            }),
            invalidatesTags: ["Refetch_Lecture"]
        }),
        getCourseLecture: builder.query({
            query: ({ courseId }) => ({
                url: `${courseId}/lecture`,
                method: "GET",
            }),
            providesTags: ["Refetch_Lecture"]
        }),

        editLecture: builder.mutation({
            query: ({ lectureTitle, isPreviewFree, videoInfo, createId, lectureId }) => ({
                url: `/${createId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, isPreviewFree, videoInfo }
            })
        }),
        removeLecture: builder.mutation({
            query: ({ lectureId }) => ({
                url: `/lecture/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Refetch_Lecture"]
        }),

        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "GET",
            }),
        }),
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `/${courseId}?publish=${query}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Refetch_Status"]
        })
    }),

});

export const {
    useCreateCourseMutation,
    useGetPublishedCoursesQuery,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation
} = courseApi;