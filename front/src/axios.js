import axios from 'axios';
import handleError from './services/handleError';
import authService from './services/authService';

const userInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    withCredentials: true
});

const tokenInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    withCredentials: true
});

const visitorInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    withCredentials: true
});

userInstance.interceptors.request.use(async function (config) {
    const isTokenExpired = await authService.chekcIfTokenExpired();
    if(isTokenExpired) await authService.getNewAccessToken();
    return config
}, function (error) {
    handleError(error);
   return Promise.reject(error);
});



export {userInstance, visitorInstance, tokenInstance};