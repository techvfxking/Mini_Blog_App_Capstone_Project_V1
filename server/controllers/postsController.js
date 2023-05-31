import PostMessage from "../models/postMessageModel.js";




const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).send({
            message: postMessages,
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
        });
    }
    res.status(200).send("This works");
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).send({
            message: newPost,
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
        });
    }
    res.status(200).send("Post Creation");
}

export { getPosts, createPost }