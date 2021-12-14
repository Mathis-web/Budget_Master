import axios from 'axios';

const authService = {
    async login(email, password) {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL_API}/api/login`, {email, password});
        return result;
    },

    async register(email, password) {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL_API}/api/signup`, {email, password});
        return result;
    },
};


export default authService;