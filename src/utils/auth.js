export const authUtils = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAdmin: () => {
    const user = authUtils.getCurrentUser();
    const adminUsers = ['atuny0', 'admin'];
    return user && adminUsers.includes(user.username);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
};