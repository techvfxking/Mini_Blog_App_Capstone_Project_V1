import axios from 'axios';
import {
    getAllPosts,
    createSinglePost,
    updateSinglePost,
    deleteSinglePost,
    likeSinglePost,
    signInEnd,
    signUpEnd
} from '../constants/actionTypes';
const dotenv = import.meta.env;

const baseURL = dotenv.VITE_SERVER_API_URI;
const API = axios.create({ baseURL: baseURL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

const postsBaseEndPoint = '/posts';
const userBaseEndPoint = '/users';


export const fetchPosts = () => API.get(`${postsBaseEndPoint}/${getAllPosts}`)
export const createPost = (newPost) => API.post(`${postsBaseEndPoint}/${createSinglePost}`, newPost);
export const updatePost = (id, updatedPost) => API.patch(`${postsBaseEndPoint}/${updateSinglePost}/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`${postsBaseEndPoint}/${deleteSinglePost}/${id}`)
export const likePost = (id) => API.patch(`${postsBaseEndPoint}/${likeSinglePost}/${id}`);

export const signUp = (formData) => API.post(`${userBaseEndPoint}/${signUpEnd}`, formData)
export const signIn = (formData) => API.post(`${userBaseEndPoint}/${signInEnd}`, formData);