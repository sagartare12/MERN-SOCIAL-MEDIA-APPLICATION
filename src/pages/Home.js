import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import CreatePosts from '../components/profile/CreatePosts'
import Post from '../components/profile/Post'
import Followers from '../components/profile/Followers'
import Saved from '../components/profile/Saved'
import Signup from './Register'
import { IoMdRefresh } from "react-icons/io";
import {allPostsReducer} from '../store/slices/PostSlice'
import axios from 'axios';
const Home = () => {
  const dispatch= useDispatch()
   const [popUp, setPopUp] = useState(false)
    const isPostPopUp = useSelector((state)=>state.buffer.buff.isPostPopUp)
    const userReducerData = useSelector((state)=>state.users.user)
    const postReducerData = useSelector((state)=>state.posts.allPosts.data.posts)

    console.log(userReducerData)
console.log(postReducerData)
    useEffect(() => {
       (async()=>{
      // const fetchPosts= await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/posts/`);
      // const fetchRes=await fetchPosts.json();
      const token=userReducerData.access_token
      // console.log(userReducerData)
      const fetchPosts= await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/posts/`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':  token // Include your actual token value
        },
      });

     
      dispatch(allPostsReducer(fetchPosts))
    })() 
     
    }, []);
  return (
    <div>
      <div className='flex justify-center'>
        <div className='bg-white w-[700px] mt-2'>
          <CreatePosts username={userReducerData.user.username} userImage={userReducerData.user.avatar}/>
          {/* <Post /> */}
          {
postReducerData[0] && postReducerData.map((post)=> {
  return (
     <Post postData={post} />
     )
  })


          }
          
        </div>
        <div className='bg-white w-[400px] mt-2 ml-2'>
          <div className="p-2">
                <div className="flex items-center">
                <div className="text-3xl cursor-pointer" >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg" alt="" className="md:w-[50px] md:h-12 h-7 w-7 rounded-full overflow-hidden"/> 
                </div>
                <div className='flex items-center justify-between w-full'>
                <div className="">
                <p className='m-0 text-[11px] font-semibold'>Username</p>
                <p className='m-0 text-[11px] font-semibold'>Full name</p>
                </div>
               
                </div>
            </div>
            <div className="flex justify-between mx-2 mt-2">
        <p className="text-[13px] font-semibold text-blue-700 ">Recommendations</p>
            <div className="md:text-[17px] text-xl text-slate-700 hover:text-green-500  cursor-pointer">
            <IoMdRefresh />
          </div>
        </div>
        <Followers />
        <Followers />
        <Followers />
        <Followers />
        <Followers />
        <Followers />
        </div>
        </div>
      </div>
   

          <div className={` ${isPostPopUp ? 'visible' : 'collapse' }`} >
            <div  className=" fixed z-10 left-[400px] top-[200px]">
                <Saved username={userReducerData.user.username}/>
            </div>
        
          </div>
  
       
      
    </div>
  
  )
}

export default Home