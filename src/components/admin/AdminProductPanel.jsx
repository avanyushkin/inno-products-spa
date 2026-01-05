import React, { useState } from 'react';
import { 
  Box, Typography, Button, TextField, Alert, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { 
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation 
} from '../../services/api';
import { authUtils } from '../../utils/auth';

function AdminProductPanel() {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', price: '' });
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, refetch } = useGetProductsQuery({ limit: 50 });
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.products || [];
  const isAdmin = authUtils.isAdmin();

  if (!isAdmin) return <Alert severity="error">Admin access required</Alert>;
  if (isLoading) return <Typography>Loading...</Typography>;

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditData({ title: product.title, price: product.price });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateProduct({ 
        id: editingId, 
        title: editData.title, 
        price: parseFloat(editData.price) 
      }).unwrap();
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      setDeletingId(null);
      refetch();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Product Management</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <TextField
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      size="small"
                    />
                  ) : product.title}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <TextField
                      value={editData.price}
                      onChange={(e) => setEditData({...editData, price: e.target.value})}
                      size="small"
                      type="number"
                    />
                  ) : `$${product.price}`}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <Button onClick={handleSaveEdit} size="small">Save</Button>
                  ) : (
                    <Button size="small" onClick={() => handleEditClick(product)} startIcon={<Edit />}>
                      Edit
                    </Button>
                  )}
                  <Button 
                    size="small" 
                    color="error" 
                    onClick={() => setDeletingId(product.id)}
                    startIcon={<Delete />}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {deletingId && (
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography>Delete product #{deletingId}?</Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button onClick={() => setDeletingId(null)}>Cancel</Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => handleDelete(deletingId)}
            >
              Confirm Delete
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AdminProductPanel;