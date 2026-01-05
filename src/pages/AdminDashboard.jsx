import React from 'react';
import Header from '../components/Header.jsx';
import AdminProductPanel from '../components/admin/AdminProductPanel.jsx';
import { authUtils } from '../utils/auth';
import { Alert, Box } from '@mui/material';

function AdminDashboard() {
  if (!authUtils.isAdmin()) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3 }}>
          <Alert severity="error">Admin access required</Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <AdminProductPanel />
    </>
  );
}

export default AdminDashboard;