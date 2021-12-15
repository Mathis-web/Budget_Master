import API from '../axios';

const dataService = {
    async getAllUserData() {
        const result = await API.get(`${process.env.REACT_APP_BASE_URL_API}/api/getall`);
        return result.data;
    },

    async getAllCategories() {
        const result = await API.get(`${process.env.REACT_APP_BASE_URL_API}/api/categories`);
        return result.data;
    },

    async deleteOneCategory(id) {
        const result = await API.delete(`${process.env.REACT_APP_BASE_URL_API}/api/category`, {data: {id}});
        return result.data;
    },

    async updateOneCategory(id, name) {
        const result = await API.patch(`${process.env.REACT_APP_BASE_URL_API}/api/category`, {id, name});
        return result.data;
    }
}

export default dataService;