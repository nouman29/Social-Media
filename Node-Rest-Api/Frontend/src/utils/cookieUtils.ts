import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production', // Only secure in production
  sameSite: 'strict' as const,
  path: '/'
};

// Token management with cookies
export const setAuthToken = (token: string): void => {
  Cookies.set('authToken', token, COOKIE_OPTIONS);
  // Also save to localStorage as backup
  localStorage.setItem('token', token);
};

export const getAuthToken = (): string | undefined => {
  // Try cookies first, then localStorage as fallback
  return Cookies.get('authToken') || localStorage.getItem('token') || undefined;
};

export const removeAuthToken = (): void => {
  Cookies.remove('authToken');
  // Also clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('userInfo');
};

// User data management
export const setUserData = (userData: any): void => {
  Cookies.set('userData', JSON.stringify(userData), COOKIE_OPTIONS);
  localStorage.setItem('user', JSON.stringify(userData));
};

export const getUserData = (): any => {
  const cookieData = Cookies.get('userData');
  const localData = localStorage.getItem('user');
  
  try {
    return cookieData ? JSON.parse(cookieData) : (localData ? JSON.parse(localData) : null);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const removeUserData = (): void => {
  Cookies.remove('userData');
  localStorage.removeItem('user');
  localStorage.removeItem('userInfo');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
}; 