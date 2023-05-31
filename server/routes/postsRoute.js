import express from 'express';
import {
    getPosts,
    createPost
} from '../controllers/postsController.js';

const postsRouter = express.Router();

postsRouter.get("/getPosts", getPosts);

postsRouter.post("/createPost", createPost);

export default postsRouter;