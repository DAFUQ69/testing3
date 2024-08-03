import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transactions';

export const getTransaction = async (page = 1, query = '', filter = '') => {
    const response = await axios.get(`${API_URL}`, {
        params: {
            page,
            query,
            filter
        }
    });
    return response;
};

export default {
    getTransaction
};
