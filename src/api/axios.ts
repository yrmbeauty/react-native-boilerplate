import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosApiInstance = axios.create({
  baseURL: '',
});

axiosApiInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token !== null) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axiosApiInstance.interceptors.response.use((response) => {
  return response.data;
});

export default axiosApiInstance;