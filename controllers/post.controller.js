const User = require('../models/user.model')
const Post = require('../models/post.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')


exports.createPosts=catchAsync(async(req,res,next)=>{
    const {content ,images}=req.body;
console.log("ji")
    const user = await User.findById(req.user._id);
    const post = await Post.create({content ,images,user:req.user})
    user.saved.push(post._id)                                    
   await user.save();
    res.status(200).json({
        msg:"Created Post!",
        newPost:post
    })
    // next()
})

exports.getUserPosts=catchAsync(async(req,res,next)=>{
    

    
    const getPosts = await User.findById(req.params.id).populate('saved')
   
    res.status(200).json({
        msg:"Success !",
        result:getPosts.saved.length,
        posts:getPosts.saved
    // next()
})

})

exports.updatePost=catchAsync(async(req,res,next)=>{
    
    if(!req.user.saved.includes(req.params.id)) return next(new AppError('Sorry , You have not access to update this post',404))
    const post = await Post.findByIdAndUpdate(req.params.id,
        req.body,
        {
        new:true,
        runValidators:true
    })
   
    res.status(200).json({
        msg:"Updated Post!",
        
        newPost:post
   
})

})


exports.getPost=catchAsync(async(req,res,next)=>{
    
    
    const post = await Post.findById(req.params.id)
   
    res.status(200).json({
        post:post
})

})


exports.deletePost=catchAsync(async(req,res,next)=>{
    
    
    const post = await Post.findByIdAndDelete(req.params.id,   {
        new:true,
        runValidators:true
    })
   
    res.status(200).json({
        post:post
})

})

exports.likePost=catchAsync(async(req,res,next)=>{
    const isPresentPost =await Post.findById(req.params.id)
    
    if(!isPresentPost)return next(new AppError('This post does not exist',402))

        const post = await Post.findByIdAndUpdate(req.params.id, {likes:req.user._id} , {
            new:true,
            runValidators:true
        })

    res.status(200).json({
       msg:"Like Post!"
})

})

exports.unlikePost=catchAsync(async(req,res,next)=>{
    const post =await Post.findById(req.params.id)
   
    if(!post)return next(new AppError('This post does not exist',402))

        const likesIndex=post.likes.findIndex((pos)=> pos.toString() === req.params.id)
        post.likes.splice(likesIndex,1)
        await post.save()

    res.status(200).json({
       msg:"Unliked Post!"
})

})


exports.getAllPosts=catchAsync(async(req,res,next)=>{
    

    
    const getAllPosts = await Post.find();
    res.status(200).json({
        msg:"Success !",
        result:getAllPosts.length, 
        posts:getAllPosts
    // next()
})

})


