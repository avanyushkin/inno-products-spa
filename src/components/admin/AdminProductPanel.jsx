import React, { useState } from 'react';
import { 
  Box, Typography, Button, TextField, Alert, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Snackbar 
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });

  const { data, isLoading, refetch } = useGetProductsQuery({ limit: 50 });
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = data?.products || [];
  const isAdmin = authUtils.isAdmin();

  if (!isAdmin) return <Alert severity="error">Admin access required</Alert>;
  if (isLoading) return <Typography>Loading...</Typography>;

  const showNotification = (message, type = 'success') => {
    setNotification({ open: true, message, type });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

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
      showNotification('Product updated successfully!');
      refetch();
    } catch (error) {
      console.error('Update error:', error);
      showNotification('Failed to update product', 'error');
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete.id).unwrap();
      showNotification(`Product "${productToDelete.title}" deleted successfully!`);
      refetch();
    } catch (error) {
      console.error('Delete error:', error);
      showNotification('Failed to delete product', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
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
                      fullWidth
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
                    <Button 
                      onClick={handleSaveEdit} 
                      size="small"
                      variant="contained"
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </Button>
                  ) : (
                    <Button 
                      size="small" 
                      onClick={() => handleEditClick(product)}
                      startIcon={<Edit />}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  )}
                  
                  <Button 
                    size="small" 
                    color="error" 
                    onClick={() => handleDeleteClick(product)}
                    startIcon={<Delete />}
                    variant="outlined"
                    sx={{ ml: 1 }}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                  
                  {editingId === product.id && (
                    <Button 
                      size="small" 
                      onClick={() => setEditingId(null)}
                      sx={{ ml: 1 }}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete product <strong>"{productToDelete?.title}"</strong>?
            <br />
            <Typography variant="caption" color="error">
              This action cannot be undone.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
            autoFocus
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

     
    </Box>
  );
}

export default AdminProductPanel;