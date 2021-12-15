import API from '../axios';

const dataService = {
    async getUserData() {
        const result = await API.get(`${process.env.REACT_APP_BASE_URL_API}/api/getall`);
        return result.data;
    }
}

export default dataService;