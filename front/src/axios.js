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

userInstance.interceptors.request.use(function (config) {
    config.headers['Access-Control-Allow-Origin'] = 'https://budget-master.netlify.app';
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    return config
}, function (error) {
    handleError(error);
   return Promise.reject(error);
});

userInstance.interceptors.response.use(async function (response) {
    return response;
  }, function (error) {
    if(error.config && error.response && error.response.status && error.response.status === 403) {
        return authService.getNewAccessToken().then((res) => {
            return userInstance.request(error.config);
        })
    }
    return Promise.reject(error);
  });


export {userInstance, visitorInstance, tokenInstance};