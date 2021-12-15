import API from '../axios';

const authService = {
    async login(email, password) {
        const result = await API.post('/api/login', {email, password});
        return result;
    },

    async register(email, password) {
        const result = await API.post('/api/signup', {email, password});
        return result;
    },

    async checkIfLoggedIn() {
        const result = await API.get('/api/isloggedin');
        return result;
    },

    async logout() {
        const result = await API.delete('/api/logout');
        return result.data;
    }
};


export default authService;