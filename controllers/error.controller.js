module.exports=(err,req,res,next)=>{
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err)
     if(err.message ==="invalid signature" || err.message ==="invalid token" || err.message ==="jwt expired" ) err.message="Invalid Authentication!"
    res.status(err.statusCode).json({
        // status:err.status,
        msg:err.message
       
    })


}