const express = require('express')
const authController = require('../controllers/auth.controller')
const postController = require('../controllers/post.controller')

const router =express.Router();

router.post('/',authController.protect,postController.createPosts);

router.get('/user_posts/:id',authController.protect,postController.getUserPosts);


router.patch('/:id',authController.protect,postController.updatePost);

router.get('/:id',authController.protect,postController.getPost);

router.delete('/:id',authController.protect,postController.deletePost);

router.patch('/:id/like',authController.protect,postController.likePost);

router.patch('/:id/unlike',authController.protect,postController.unlikePost);

router.get('/',authController.protect,postController.getAllPosts);



module.exports=router;