const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    // one way relation only from posts side
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // two way relation
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
