import express from 'express'
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from '../controllers/postsController.js'
import {
  getAllPosts,
  createSinglePost,
  updateSinglePost,
  deleteSinglePost,
  likeSinglePost,
} from '../utils/actionTypes.js'

import auth from './../middleware/auth.js'

const postsRouter = express.Router()

postsRouter.get('/search', getPostsBySearch)
postsRouter.get(getAllPosts, getPosts)

postsRouter.post(createSinglePost, auth, createPost)

postsRouter.patch(updateSinglePost, auth, updatePost)

postsRouter.delete(deleteSinglePost, auth, deletePost)

postsRouter.patch(likeSinglePost, auth, likePost)

export default postsRouter
