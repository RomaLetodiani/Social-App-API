const express = require('express');

const Post = require('../models/post.model');
const User = require('../models/user.model');
const { getPost } = require('../middleware/post.middlewares');
const { getUser } = require('../middleware/user.middlewares');

const PostRouter = express.Router();

// create post
PostRouter.post('/', async (req, res) => {
  const { title, description, user } = req.body;

  if (!title || !description || !user) {
    return res.status(400).json({ message: 'please enter valid data' });
  }

  try {
    const userRecord = await User.findById(user);
    if (userRecord == null) {
      return res.status(404).json({ message: 'user not found please enter valid user id' });
    }

    const newPost = new Post({ title, description, user });
    await newPost.save();
    await User.findByIdAndUpdate(user, { $push: { posts: newPost._id } });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all posts
PostRouter.get('/', (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// get user posts
PostRouter.get('/user/:userId', getUser, (req, res) => {
  Post.find({ user: req.params.userId })
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// get one post
PostRouter.get('/:postId', getPost, (req, res) => {
  res.status(200).json(res.post);
});

// delete post
PostRouter.delete('/:postId', getPost, async (req, res) => {
  const post = res.post;
  const deletedPost = await post.deleteOne();
  await User.findByIdAndUpdate(post.user, { $pull: { posts: post._id } });
  res.status(203).json(deletedPost);
});

module.exports = PostRouter;
