import mongoose from 'mongoose'
import PostMessage from '../models/postMessageModel.js'

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

const createPost = async (req, res) => {
  let { creator, title, message, tags, selectedFile } = req.body
  const newPostMessage = new PostMessage({
    title,
    message,
    creator,
    tags,
    selectedFile,
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
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json('No Blog posts found with this Id: ' + _id)
  }

  const post = await PostMessage.findById(_id)
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  )

  res.status(201).json(updatedPost)
}

export { getPosts, createPost, updatePost, deletePost, likePost }
