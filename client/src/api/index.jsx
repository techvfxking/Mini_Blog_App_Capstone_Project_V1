import axios from 'axios';
const dotenv = import.meta.env;

const baseURL = dotenv.VITE_SERVER_API_URI;

export const fetchPosts = () => axios.get(`${baseURL}/getPosts`);