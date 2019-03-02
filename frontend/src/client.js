import axios from 'axios';

axios.defaults.baseURL = "http://localhost";
axios.defaults.headers.common["authorization"]= localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '-';

console.log("client.js done");