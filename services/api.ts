import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiService = axios.create({
    baseURL: 'http://192.168.88.249:3000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiService.interceptors.request.use(
    async (config) => {
        const userInfo: any = await AsyncStorage.getItem('user');
        const user = JSON.parse(userInfo)
        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiService.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await AsyncStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export default apiService;
