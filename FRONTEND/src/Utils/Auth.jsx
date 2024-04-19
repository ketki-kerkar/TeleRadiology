import jwt_decode from 'jwt-decode'; // Import jwt_decode library

export const isAuthenticated = () => {
  const loggedInUser = window.sessionStorage.getItem('loggedInUser');
  return loggedInUser !== null && loggedInUser !== undefined;
};

export const login = (userData) => {
  window.sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
};

export const logout = () => {
  window.sessionStorage.removeItem('loggedInUser');
};

// Function to get user role from JWT token
export const getUserRole = () => {
  const token = window.sessionStorage.getItem('jwtToken');
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.role; // Return user role from decoded token
  }
  return ''; // Return empty string if token doesn't exist
};
