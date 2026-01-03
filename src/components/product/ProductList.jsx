import React from 'react';
import { useGetProductsQuery } from '../../services/api';
import ProductCard from './ProductCard.jsx';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import '../../styles/ProductList.scss';

function ProductList({ searchTerm = "" }) {
  const { data, isLoading, error, isFetching } = useGetProductsQuery(
    { search: searchTerm },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading products: {error.status} {error.data?.message || 'Unknown error'}
        </Alert>
      </Box>
    );
  }

  if (!data || !data.products || data.products.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No products found
        </Typography>
        {searchTerm && (
          <Typography variant="body2" color="text.secondary">
            Try a different search term
          </Typography>
        )}
      </Box>
    );
  }

  const products = data.products;

  return (
    <>
      {isFetching && !isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      <div className='product-list'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;