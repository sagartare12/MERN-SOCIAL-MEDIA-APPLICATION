const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.search=catchAsync(async(req,res,next)=>{
    console.log(req.user)
    const users = await User.find().select('avatar fullname username');
    res.status(200).json({
        users:users
    })
    // next()
})

exports.getUser = catchAsync(async(req,res,next)=>{
    console.log(req.params)
    const user = await User.findById(req.params.id);
    if(!user){
        return next (new AppError('User not found',404))
    }
    res.status(200).json({
       user:user
    })
})


exports.updateUser=catchAsync(async(req,res,next)=>{
    const {fullname,avatar,mobile,story,gender,website,email,password} = req.body

    const updataUser={
       fullname:  fullname ? fullname :req.user.fullname,
       avatar:  avatar ? avatar :req.user.avatar,
       mobile:  mobile ? mobile :req.user.mobile,
       story:  story ? story :req.user.story,
       gender:  gender ? gender :req.user.gender,
       website:  website ? website :req.user.website,
       
    }

    if(email || password){
        return next(new AppError('Sorry , You cant update..!',404));
        }


    const user = await User.findByIdAndUpdate(req.user._id,
        updataUser,
        {
        new:true,
        runValidators:true
    })
    if(!user){
        return next(new AppError('User not found',404))
    }
    res.status(200).json({
        msg:"Update Success!",
        user:user
    })
  })

  exports.follow=catchAsync(async(req,res,next)=>{
    const user = await User.findOne({_id:req.user._id});
    const following = await User.findOne({_id:req.params.id});
 console.log(user.following.toString())
//  console.log(following)

   

    if(user.following.includes(req.params.id)) return next(new AppError('You followed this user.',404))
     user.following.push(following._id)




 following.followers.push(user._id)
    const updatedUser = await user.save()
    const updatedFollower= await following.save()
res.status(200).json({
    updatedUser
    })
     
  })


  exports.unfollow=catchAsync(async(req,res,next)=>{
    const user = await User.findOne({_id:req.user._id})
    const unfollowUser = await User.findOne({_id:req.params.id})

    const unfollowUserIndex= user.following.findIndex((following)=>following.toString() === req.params.id);
  
    const unfollowerIndex= unfollowUser.followers.findIndex((following)=>following.toString() === user._id);

    if(unfollowUserIndex !==  -1){
        unfollowUser.followers.splice(unfollowerIndex,1)
        await unfollowUser.save();
        user.following.splice(unfollowUserIndex,1)
        await user.save();
    }

    const updatedUser = await User.findOne({_id:req.user._id})

    res.status(200).json({
        updatedUser
    })
  })


  exports.suggestionUsers=catchAsync(async(req,res,next)=>{
    

    const user = await User.findById(req.user._id);
    const followingIds = user.following;
    const followersIds = user.followers;
    const followingUsers = await User.find({ _id: { $in: followingIds} });
    const followerUsers = await User.find({ _id: { $in: followersIds  } });
    // console.log(followingUsers);
    console.log(followerUsers);
   
    // const suggestUsers = followingUsers.concat(followerUsers)
    
    return res.status(200).json({
        followers:followerUsers,
        following:followingUsers
    });

  })

  