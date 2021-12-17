import {visitorInstance, userInstance, tokenInstance} from '../axios';

const authService = {
    async login(email, password) {
        const result = await visitorInstance.post('/api/login', {email, password});
        return result;
    },

    async register(email, password) {
        const result = await visitorInstance.post('/api/signup', {email, password});
        return result;
    },

    async checkIfLoggedIn() {
        const result = await userInstance.get('/api/isloggedin');
        return result;
    },

    async logout() {
        const result = await userInstance.delete('/api/logout');
        return result.data;
    },

    async getNewAccessToken() {
        await tokenInstance.post('/api/token');
    },

    async chekcIfTokenExpired() {
        const result = await tokenInstance.post('/api/istokenexpired');
        return result.data;
    }
};


export default authService;