import axios from 'axios';

const urlExpress = 'http://localhost:8000';
const urlHeroku = 'https://fierce-fortress-14005.herokuapp.com/';
const urlRender = 'https://shopinglist-api.onrender.com';

export default axios.create({
    baseURL: urlRender,
});
