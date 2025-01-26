import React, { createContext, useReducer } from 'react';
import axiosInstance from '../API/BaseUrl';
import { authReducer, initialState } from '../Reducers/AuthReducer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = async (credentials ) => {
    dispatch({ type: 'AUTH_REQUEST' });
    try {
      const response = await axiosInstance.post('auth/signin', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      console.log(response.data)
      alert("Welcome "+ response.data.firstName+ " "+response.data.lastName )
      // Save token in local storage (if needed)
      sessionStorage.setItem('token', response.data.token);
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data?.message || 'Login failed' });
      alert(error.message)
    }
  };

  // Signup function
  const signup = async (userData) => {
    dispatch({ type: 'AUTH_REQUEST' });
    try {
      const response = await axiosInstance.post('auth/signup', userData);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
      alert(response.data.message);
      // Save token in local storage (if needed)
       } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data?.message || 'Signup failed' });
      alert(error.message)
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('token'); // Remove token from local storage

  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
