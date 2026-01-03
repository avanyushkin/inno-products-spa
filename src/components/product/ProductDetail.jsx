import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '../../services/api';
import Header from '../Header.jsx';
import { Box, Typography, Button, Rating, CircularProgress, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: product, isLoading, error } = useGetProductQuery(id);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            Error loading product: {error.status} {error.data?.message || 'Unknown error'}
          </Alert>
          <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            Back
          </Button>
        </Box>
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Product not found</Typography>
          <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            Back
          </Button>
        </Box>
      </>
    );
  }
  
  const image = Array.isArray(product.images) ? product.images[0] : typeof product.images === 'string' 
      ? product.images : product.thumbnail || '';

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          Back
        </Button>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', 
            bgcolor: '#f5f5f5', borderRadius: 2, overflow: 'hidden'
          }}>
            {image ? (
              <img src={image}alt={product.title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Typography color="text.secondary">No image</Typography>
            )}
          </Box>
          
          <Box>
            <Typography variant="h5" gutterBottom>{product.title}</Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.category}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Rating value={product.rating} readOnly size="small" precision={0.1} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews?.length || 0} reviews)
              </Typography>
            </Box>
            
            <Typography variant="h4" color="primary" sx={{ my: 2 }}>
              ${product.price}
              {product.discountPercentage && (
                <Typography 
                  component="span" 
                  variant="body2" 
                  color="success.main" 
                  sx={{ ml: 1 }}
                >
                  {product.discountPercentage}% off
                </Typography>
              )}
            </Typography>
            
            <Typography variant="body1" sx={{ my: 2 }}>{product.description}</Typography>
            
            <Typography variant="body2" color="text.secondary">
              Brand: {product.brand || 'Unknown'} | 
              Stock: {product.stock || 0} units
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" fullWidth>Add to Cart</Button>
            <Button variant="outlined" fullWidth>Buy Now</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetail;