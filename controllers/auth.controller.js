const { promisify} = require('util');
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const bcrypt = require('bcryptjs')


//sign in token create
const signToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

exports.register = catchAsync(async(req,res,next)=>{

    
    const {avatar,fullname,username,email,password,role,gender,mobile,address,story,saved,website,followers,following} = req.body;
    //email validation
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    if(!emailRegex.test(email)) next(new AppError('Email format is incorrect',400))

    if(await User.findOne({email})) next(new AppError('This email already exists.',400))
    //username validation
    if(await User.findOne({username})) next(new AppError('This username already exists.',400))
    //paswword validation
    if(password.length < 6) next(new AppError('Password must be at least 6 characters.',400))
    console.log(avatar)
    
    //password encryption
    const hashedPass = bcrypt.hashSync(password,10);
 
    const newUser = await User.create({
      avatar,
      role,
      gender,
      mobile,
      address,
      story,
      website,
      followers,
      following,
      saved,
      fullname,
      username,
      email,
      password:hashedPass,
    });

    newUser.password="";
    const token = signToken(newUser._id);

    res.header("x-auth-token",token).status(200).json({
        msg:'Register Success!',
        access_token:token,
        user:newUser
    })

})



exports.logIn=catchAsync(async (req,res,next)=>{
    const {email,password}=req.body;
    if(!await User.findOne({email})) next(new AppError('This email does not exist.',400))
  
   const user =await User.findOne({email}).select('+password');
   if(!user || !(await bcrypt.compare(password,user.password))){
    return next(new AppError('Password is incorrect.',400))
   }

  
    
    user.password="";
   

        
    
   const token =signToken(user._id);
   



   res.header("x-auth-token",token).status(200).json({
    msg:'Login Success!',
    access_token:token,
    user:user

    
})
})

exports.logOut=catchAsync(async(req,res,next)=>{
  // console.log(req.headers)
    res.header("x-auth-token","gi").status(200).json({
        msg:'Logged out!',
        
    })
})



//Prtoect routes from unauthenticated user
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    const token = req.rawHeaders[req.rawHeaders.indexOf('x-auth-token')+1]
console.log(token)
    // 2) Check if user not log in
    if (!token) {
      return next(
        new AppError('Invalid Authentication.', 401)
      );
  
  }


  const decode = await promisify(jwt.verify)(token , process.env.JWT_SECRET)
//   const freshUser =  await User.findById(decode.id);

      // 3) Check that the user still exist     
     const loggedInUser =  await User.findById(decode.id).select('-password');
     
     if(!loggedInUser){
         return next (
             new AppError('The user belonging to this id is no longer exist!',401)
         )
     }
  

   req.user = loggedInUser;
   
    next();
  })




