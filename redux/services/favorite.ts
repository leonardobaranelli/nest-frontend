import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

require('dotenv').config();

const { DEPLOY_BACK_URL } = process.env;

export interface Post {
  userId: string;
  postId: string;
  images: string[];
  title: string;
  price: number;
}


export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: DEPLOY_BACK_URL }),
  endpoints: (builder) => ({
    getFavorites: builder.query<Post[], { userId: string }>({
      query: ({ userId }) => `favorites/${userId}`,
    }),
    addFavorite: builder.mutation<void, Post>({
      query: (post) => ({
        url: 'favorites',
        method: 'POST',
        body: {
          userId: post.userId,
          postId: post.postId,
          images: post.images,
          title: post.title,
          price: post.price,
        },
      }),
    }),
    
    deleteFavorite: builder.mutation<void, { userId: string; postId: string }>({
      query: ({ userId, postId }) => ({
        url: 'favorites/delete',
        method: 'DELETE',
        body: {
          userId,
          postId,
        },
      }),
    }),
  }),
});


export const { useGetFavoritesQuery, useAddFavoriteMutation, useDeleteFavoriteMutation } = favoritesApi;
