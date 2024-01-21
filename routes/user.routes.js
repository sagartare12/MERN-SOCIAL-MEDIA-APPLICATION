const express = require('express')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router =express.Router();

router.post('/register',authController.register);
router.post('/login',authController.logIn);
router.post('/logout',authController.protect,authController.logOut);

router.get('/search',authController.protect,userController.search)
router.get('/:id',authController.protect,userController.getUser)
router.patch('/',authController.protect,userController.updateUser)
router.patch('/:id/follow',authController.protect,userController.follow)
router.patch('/:id/unfollow',authController.protect,userController.unfollow)
router.get('/uv/suggestion_user',authController.protect,userController.suggestionUsers)
//   router.get('/new',authController.protect,userController.sugUsers)
module.exports=router;