import {userInstance} from '../axios';

const dataService = {
    async getAllUserData() {
        const result = await userInstance.get(`${process.env.REACT_APP_BASE_URL_API}/api/getall`);
        return result.data;
    },

    async getAllCategories() {
        const result = await userInstance.get(`${process.env.REACT_APP_BASE_URL_API}/api/categories`);
        return result.data;
    },

    async deleteOneCategory(id) {
        const result = await userInstance.delete(`${process.env.REACT_APP_BASE_URL_API}/api/category`, {data: {id}});
        return result.data;
    },

    async updateOneCategory(id, name) {
        const result = await userInstance.patch(`${process.env.REACT_APP_BASE_URL_API}/api/category`, {id, name});
        return result.data;
    },

    async createOneCategory(name) {
        const result = await userInstance.post(`${process.env.REACT_APP_BASE_URL_API}/api/category`, {name});
        return result.data;
    },


    async deleteOneExpense(id) {
        const result = await userInstance.delete(`${process.env.REACT_APP_BASE_URL_API}/api/expense`, {data: {id}});
        return result.data;
    },

    async updateOneExpense(id, description, price, categoryId) {
        const result = await userInstance.patch(`${process.env.REACT_APP_BASE_URL_API}/api/expense`, {id, description, price, categoryId});
        return result.data;
    },

    async createOneExpense(description, price, categoryId) {
        const result = await userInstance.post(`${process.env.REACT_APP_BASE_URL_API}/api/expense`, {description, price, categoryId});
        return result.data;
    },
}

export default dataService;