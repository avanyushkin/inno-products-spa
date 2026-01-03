import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyJsonApi = createApi({
  reducerPath: 'dummyJsonApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'User', 'Auth'],
  endpoints: (builder) => ({
    
    getProducts: builder.query({
      query: ({ limit = 30, skip = 0, search = '' } = {}) => {
        if (search) {
          return `products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'CATEGORY_LIST' },
            ]
          : [{ type: 'Product', id: 'CATEGORY_LIST' }],
    }),

    getCategories: builder.query({
      query: () => 'products/categories',
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query({
      query: () => ({url: 'auth/me',
        headers: {},
      }),
      providesTags: ['Auth'],
    }),

    getUsers: builder.query({
      query: ({ limit = 0, skip = 0 } = {}) => 
        `users${limit ? `?limit=${limit}&skip=${skip}` : ''}`,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User', id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: 'products/add',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  
  useLoginMutation,
  useGetCurrentUserQuery,
  
  useGetUsersQuery,
  useGetUserQuery,
  
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = dummyJsonApi;