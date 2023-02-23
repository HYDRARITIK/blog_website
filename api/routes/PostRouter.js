const express = require('express');
const postRouter = express.Router();
const {getPosts,getPostById,createPost,deletePost,updatePost,getPostByCategory} = require('../controllers/postController');


postRouter.route('/')
.get(getPosts)
.post(createPost)

postRouter.route('/:category')
.get(getPostByCategory)

postRouter.route('/post/:id')
.get(getPostById )
.patch(updatePost)
.delete(deletePost)


module.exports = postRouter;
