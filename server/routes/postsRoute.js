import express from 'express'
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postsController.js'
import {
  getAllPosts,
  createSinglePost,
  updateSinglePost,
  deleteSinglePost,
  likeSinglePost,
} from '../utils/actionTypes.js'

const postsRouter = express.Router()

postsRouter.get(getAllPosts, getPosts)

postsRouter.post(createSinglePost, createPost)

postsRouter.patch(updateSinglePost, updatePost)

postsRouter.delete(deleteSinglePost, deletePost)

postsRouter.patch(likeSinglePost, likePost)

export default postsRouter
