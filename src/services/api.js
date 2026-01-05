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
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product', 'User', 'Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ['Auth'],
      transformResponse: (response) => {
        localStorage.setItem('token', response.accessToken || response.token);
        localStorage.setItem('currentUser', JSON.stringify(response));
        return response;
      },
    }),

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

    createProduct: builder.mutation({
      query: (product) => ({
        url: 'products/add',
        method: 'POST',
        body: JSON.stringify(product),
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: JSON.stringify(updates),
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' }
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    getCategories: builder.query({
      query: () => 'products/categories',
    }),

    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  
  useLoginMutation,
  
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = dummyJsonApi;