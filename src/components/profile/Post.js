import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";

const Post = ({postData}) => {
  console.log(postData)
  return (
    <div>
        <div className="flex items-center">
            <div className="w-11 h-10 ml-1 mb-2 mr-1 rounded-full overflow-hidden">
           
              <img src={postData.user.avatar} alt="UR" className="w-full h-full object-cover"/>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <p className="text-gray-700 my-0 text-sm font-semibold">{postData.user[0].username}</p>
                <p className="text-gray-700 mt-0 text-xs">a few seconds ago</p>
              </div>

              <div className="text-slate-600 mr-2">
                <div className="cursor-pointer">
                  <BsThreeDots />
                </div>
              </div>
            </div>
          </div>

          <div className="text-left ml-1">
            <p className="text-gray-700 text-base">{postData.content}</p>
          </div>
          
          <div className="overflow-hidden">
         
            <img src={postData.images} alt="IMG" className="w-full h-56 object-cover" />
          </div>

          <div className="flex items-center gap-1 md:gap-1 ">
            <div className="mt-2 ml-2 mb-2">
              <FaRegHeart />
            </div>
            <div className="mt-2 ml-2 mb-2">
              <FaRegComment />
            </div>
            <div className="flex justify-between w-full">
              <div className="mt-2 ml-2 mb-2">
                <PiPaperPlaneRightFill />
              </div>
              <div className="m-2">
                <FaRegBookmark />
              </div>
            </div>
          </div>
          <div className="flex justify-between px-1">
            
            <div className="text-left ml-1 mr-1">
              <p className="text-gray-700 text-base">0 Likes</p>
            </div>
            <div className="text-left ml-1 mr-1">
              <p className="text-gray-700 text-base">0 Comments</p>
            </div>
            
          </div>
          <hr />
                  </div>
    
  )
}

export default Post
