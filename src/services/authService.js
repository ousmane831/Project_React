import API from './api';

export const loginUser = async ({ username, password }) => {
  try {
    const response = await API.post('auth/login/', { username, password });
    return response.data;  // { token, user_id, email, role }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return null;
  }
};
