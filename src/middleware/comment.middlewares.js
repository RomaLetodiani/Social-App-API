const Comment = require('../models/comment.model');

async function getComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('user').populate('post');
    if (comment == null) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.comment = comment;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getComment };
