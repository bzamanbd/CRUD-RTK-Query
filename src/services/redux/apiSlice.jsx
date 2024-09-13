import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const  apiSlice = createApi({ 
    reducerPath: 'api',
    baseQuery:fetchBaseQuery({ baseUrl:"http://localhost:3000"}),
    tagTypes:['Post'],
    endpoints:(builder)=>({ 
        getPosts: builder.query({ 
            query : ()=> '/posts', 
            providesTags:['Post']
        }),

        addPost:builder.mutation({ 
            query:(newPost)=>({ 
                url:'/posts',
                method: 'POST',
                body:newPost
            }),
            invalidatesTags:['Post']
        }),

        updatePost: builder.mutation({
            query: ({ id, ...updatedPost }) => ({
              url: `/posts/${id}`,
              method: 'PUT',
              body: updatedPost,
            }),
            invalidatesTags: ['Post'],
          }),

          deletePost: builder.mutation({
            query: (id) => ({
              url: `/posts/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
          })

    }), 

})

export const {useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation} = apiSlice