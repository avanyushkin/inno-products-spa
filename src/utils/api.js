const API_URL = 'http://localhost:3001';

export const authAPI = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    
    return users.find(u => u.username === credentials.login && u.password === credentials.password);
  },
  
  async register(userData) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return await response.json();
  },
  
  async checkUserExists(username) {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    
    return users.find(u => u.username === username);
  }
};