const express = require('express');

const User = require('../models/user.model');
const Post = require('../models/post.model');

const Comment = require('../models/comment.model');
const { getComment } = require('../middleware/comment.middlewares');
const CommentRouter = express.Router();

// create comment
CommentRouter.post('/', async (req, res) => {
  const { text, parentComment, user, post } = req.body;

  if (!text || !user || !post) {
    return res.status(400).json({ message: 'Please enter valid data' });
  }

  try {
    const userRecord = await User.findById(user);
    if (!userRecord) {
      return res.status(404).json({ message: 'User not found. Please enter a valid user id' });
    }

    // Check if parentComment exists
    let parent = null;
    if (parentComment) {
      parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({ message: 'Parent comment not found. Please enter a valid parent comment id' });
      }
    }

    const newComment = new Comment({ text, parentComment: parent, user, post });
    await newComment.save();

    // Push newComment into parent's replies if it exists
    if (parent) {
      parent.replies.push(newComment);
      await parent.save();
    } else {
      await Post.findByIdAndUpdate(post, { $push: { comments: newComment._id } });
    }

    res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = CommentRouter;

// Get all comments
CommentRouter.get('/', (req, res) => {
  Comment.find()
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Get one comment
CommentRouter.get('/:commentId', getComment, (req, res) => {
  res.status(200).json(res.comment);
});

// Delete comment
CommentRouter.delete('/:commentId', getComment, async (req, res) => {
  const comment = res.comment;
  const deletedComment = await comment.deleteOne();
  if (deletedComment.parentComment) {
    await Comment.findByIdAndUpdate(deletedComment.parentComment, { $pull: { replies: deletedComment._id } });
  }
  if (deletedComment.replies) {
    for (let i = 0; i < deletedComment.replies.length; i++) {
      await Comment.findByIdAndDelete(deletedComment.replies[i]);
    }
  }
  await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

  res.status(203).json(deletedComment);
});
