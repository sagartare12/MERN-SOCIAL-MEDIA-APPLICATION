const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content:String,
    likes:[],
    images:String,
    comments:[],
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type:Date,
        default:()=> {
            return Date.now();
        }
    },
    user:[]
})

module.exports = mongoose.model("Post",postSchema)