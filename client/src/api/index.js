import axios from 'axios';
import { getAllPosts, createSinglePost, updateSinglePost, deleteSinglePost, likeSinglePost } from '../constants/actionTypes';
const dotenv = import.meta.env;

const baseURL = dotenv.VITE_SERVER_API_URI;

export const fetchPosts = () => axios.get(`${baseURL}/${getAllPosts}`);
export const createPost = (newPost) => axios.post(`${baseURL}/${createSinglePost}`, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${baseURL}/${updateSinglePost}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${baseURL}/${deleteSinglePost}/${id}`);
export const likePost = (id) => axios.patch(`${baseURL}/${likeSinglePost}/${id}`)