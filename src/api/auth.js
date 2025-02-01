import API from './axiosInstance';

export const signup = async (userData) => {
  try {
    const response = await API.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Signup failed" };
  }
};
