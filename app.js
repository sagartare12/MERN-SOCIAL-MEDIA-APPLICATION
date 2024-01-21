const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes.js');
const postRouter = require('./routes/post.routes.js');
const notificationRouter = require('./routes/notification.routes.js');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error.controller')
const cors = require("cors")
const axios = require('axios');
// app.use( cors());

// app.use((req, res, next) =>{ 
//     res.setHeader( 'Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com" ); 
//     next(); 
//   })
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'], // Include x-auth-token in the list of exposed headers
  allowedHeaders: 'Content-Type, Authorization, x-auth-token', // Include x-auth-token in the list of allowed headers
}));


let frontEndUrl;
if(process.env.NODE_ENV === 'production'){
       frontEndUrl = process.env.FRONTEND_URL
}else frontEndUrl = "http://localhost:3000"


app.use(cors({
  origin: frontEndUrl,
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"],
 }));


// app.use((req, res, next) => {
//   res.setHeader('X-My-Custom-Header', 'my-custom-value');
//   next();
// });



  app.use(express.urlencoded({extended:true , limit:'10kb'}))
app.use(express.json({limit:"10mb"}));

// app.options('*', cors());

app.use('/api/v1/user' , userRouter);
app.use('/api/v1/posts' , postRouter);
app.use('/api/v1' , notificationRouter);

// app.use('/api/v1/users/' ,userRouter);
app.all('*',(req,res,next)=>{
    next(new AppError(`Cant't find ${req.originalUrl} on this server!`,404))
})

//error handling
app.use(globalErrorHandler)

module.exports =app;
