const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    role:{
        type:String,
        default:"user",
        
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Other"]
    },
    avatar:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/User_icon-cp.png/1200px-User_icon-cp.png"
        

    },
       
  
    mobile: {
        type: String,
        min: 5,
      },
      address: {
        type: String,
      },
      story: {
        type: String,
      },
      website: {
        type: String,
      },
      // followers: {
      //   type: [mongoose.Schema.Types.ObjectId],
      //   ref: "User",
      // },
      // following:{
      //   type: [mongoose.Schema.Types.ObjectId],
      //   ref: "User",
      // },
      followers: [],
      following:[],
      saved: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
      },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=> {
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=> {
            return Date.now();
        }
    },

})

module.exports = mongoose.model("User",userSchema);

