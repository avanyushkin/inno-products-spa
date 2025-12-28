import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDummyJSON } from '../../utils/api.js';
import Header from '../Header.jsx';
import { Box, Typography, Button, Rating } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading } = useDummyJSON(`/products/${id}`);
  
  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
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
  
  const image = Array.isArray(product.images) ? product.images[0] : product.images;

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} x={{ mb: 3 }}>
          Back
        </Button>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', borderRadius: 2, overflow: 'hidden'}}>
            <img src={image} alt={product.title}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>{product.title}</Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>{product.category}</Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>{product.rating}</Typography>
            </Box>
            
            <Typography variant="h4" color="primary" sx={{ my: 2 }}>${product.price}</Typography>
            
            <Typography variant="body1" sx={{ my: 2 }}>{product.description}</Typography>
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