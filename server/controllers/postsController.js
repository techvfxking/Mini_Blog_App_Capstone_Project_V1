import PostMessage from "../models/postMessageModel.js";

const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const createPost = async (req, res) => {
    const { creator, title, message, tags, selectedFile } = req.body;
    const newPostMessage = new PostMessage({ title, message, creator, tags, selectedFile })
    console.log(newPostMessage);
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { getPosts, createPost }