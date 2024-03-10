require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const UserRouter = require('./routers/user.router');
const PostRouter = require('./routers/post.router');
const CommentRouter = require('./routers/comment.router');

// database connection part
mongoose.connect(process.env.MONGODB_LINK);
const db = mongoose.connection;
db.once('open', () => console.log('Connected to mongoDB'));
db.on('error', (err) => console.log('MongoDB connection error', err));

// express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// express routers connection
app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);

app.listen(3000, () => console.log('Project running on port 3000'));
