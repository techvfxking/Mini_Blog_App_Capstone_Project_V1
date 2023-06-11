import mongoose from 'mongoose'
import PostMessage from '../models/postMessageModel.js'

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error.message)
  }
}
const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query
  try {
    const title = new RegExp(searchQuery, 'i')
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    })
    res.status(200).json({ data: posts })
  } catch (error) {
    res.status(404).json(error.message)
  }
}

const getPosts = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

    const total = await PostMessage.countDocuments({})
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createPost = async (req, res) => {
  let post = req.body
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  })
  try {
    await newPostMessage.save()
    res.status(201).json(newPostMessage)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json('No Blog posts found with this Id: ' + _id)
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  )

  res.status(201).json(updatedPost)
}

const deletePost = async (req, res) => {
  const { id: _id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json('No Blog posts found with this Id: ' + _id)
  }

  await PostMessage.findByIdAndRemove(_id)

  res.status(201).json({ message: 'Post deleted successfully' })
}

const likePost = async (req, res) => {
  const { id: _id } = req.params

  if (!req.userId) return res.json({ message: 'Unauthenticated' })

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json('No Blog posts found with this Id: ' + _id)
  }

  const post = await PostMessage.findById(_id)

  const index = await post.likes.findIndex((Id) => Id === String(req.userId))
  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter((Id) => Id !== String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  })

  res.status(201).json(updatedPost)
}

export {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
}
