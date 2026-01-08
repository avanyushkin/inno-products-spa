import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box} from '@mui/material';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
      onClick={(e) => e.stopPropagation()}
    >
      <CardMedia component="img" height="200" image={product.images} alt={product.title} sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }} />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" gutterBottom> {product.title} </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom> {product.category} </Typography>
        
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}> ${product.price} </Typography>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0 }}>
        <Button fullWidth variant="contained" onClick={() => navigate(`/product/${product.id}`)}> View Details </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;