const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:{
        type:[mongoose.Schema.Types.ObjectId],
        rf:"Post"
    },
    content:String,
    tag:{},
    reply:{
        type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    likes:{
        type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    user:{
        type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    postUserId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    }

})


module.exports = mongoose.Schema("Comment",commentSchema)