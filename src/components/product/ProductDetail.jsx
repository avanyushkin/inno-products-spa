import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '../../services/api';
import Header from '../Header.jsx';
import { authUtils } from '../../utils/auth';
import { 
  Box, Typography, Button, Rating, CircularProgress, Alert,
  TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [description, setDescription] = useState('');
  
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const isAdmin = authUtils.isAdmin();

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

  if (error || !product) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3 }}>
          <Alert severity="error">Product not found</Alert>
          <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            Back
          </Button>
        </Box>
      </>
    );
  }

  const handleEditClick = () => {
    setDescription(product.description);
    setEditOpen(true);
  };

  const handleSave = () => {
    alert('Description updated!');
    setEditOpen(false);
  };

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          Back
        </Button>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ 
            height: 300, 
            display: 'flex', 
            justifyContent: 'center', 
            bgcolor: '#f5f5f5', 
            borderRadius: 2 
          }}>
            <img 
              src={product.thumbnail} 
              alt={product.title}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </Box>
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">{product.title}</Typography>
              {isAdmin && (
                <Button startIcon={<Edit />} onClick={handleEditClick}>
                  Edit Description
                </Button>
              )}
            </Box>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Category: {product.category}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating} stars
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
                  -{product.discountPercentage}% off
                </Typography>
              )}
            </Typography>
            
            <Typography variant="body1" sx={{ my: 2, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
              {product.description}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Brand: {product.brand || 'Not specified'} | 
              Stock: {product.stock || 0} units
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" fullWidth size="large">
              Add to Cart
            </Button>
            <Button variant="outlined" fullWidth size="large">
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product Description</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductDetail;