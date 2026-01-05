export const authService = {
  setCurrentUser: (userData) => {
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    localStorage.setItem('currentUser', JSON.stringify(userData));
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },

  getAuthHeaders: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};