export const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token') || '';
  };
  
  export const setUsername = (username: string) => {
    localStorage.setItem('username', username);
  };
  
  export const getUsername = () => {
    return localStorage.getItem('username') || '';
  };
  
  export const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };