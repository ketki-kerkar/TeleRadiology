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