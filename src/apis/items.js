import axios from 'axios';

const urlExpress = 'http://localhost:8000';

export default axios.create({
    baseURL: urlExpress
});