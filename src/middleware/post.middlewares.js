const Post = require('../models/post.model');

async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId).populate('comments');
    if (post == null) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.post = post;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getPost };
