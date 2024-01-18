import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import CreatePosts from '../components/profile/CreatePosts'
import Post from '../components/profile/Post'
import Followers from '../components/profile/Followers'
import Saved from '../components/profile/Saved'
import Signup from './Register'
import { IoMdRefresh } from "react-icons/io";
import {allPostsReducer} from '../store/slices/PostSlice'
import {followerReducer,followingReducer} from '../store/slices/UserSlice'
import axios from 'axios';
const Home = () => {
  const dispatch= useDispatch()
   
   const [postData, setPostData] = useState([]);

   const [followers, setFollowers] = useState([]);
   const [following, setFollowing] = useState([]);
    const isPostPopUp = useSelector((state)=>state.buffer.buff.isPostPopUp)
    const userReducerData = useSelector((state)=>state.users.user)
    const followUnfoReducer = useSelector((state)=>state.users.followUnfollow.data.updatedUser)
    const token=userReducerData.access_token
    const nFollwer=followUnfoReducer.followers.length
    const nFollwing=followUnfoReducer.following.length


useEffect(() => {
  const fetchData = async () => {
    try {
      // Make a GET request using Axios
     
      const fetchPosts= await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/posts`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':  token // Include your actual token value
        },
      });

      // Update the state with the received data
      setPostData(fetchPosts.data.posts);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function when the component mounts
  fetchData();
}, []);


useEffect(() => {
  const fetchData = async () => {
    try {
      // Make a GET request using Axios
     
      const fetchUsers= await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/uv/suggestion_user`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':  token // Include your actual token value
        },
      });

      // Update the state with the received data
      setFollowers(fetchUsers.data.followers);
      setFollowing(fetchUsers.data.following);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function when the component mounts
  fetchData();
}, [nFollwer,nFollwing]);
   
  

 
  return (
    <div>
      <div className='flex justify-center'>
        <div className='bg-white w-[700px] mt-2'>
          <CreatePosts username={userReducerData.user.username} userImage={userReducerData.user.avatar}/>
          
          {
postData[0] && postData.map((post)=> {
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
                    <img src={userReducerData.user.avatar} alt="" className="md:w-[50px] md:h-12 h-7 w-7 rounded-full overflow-hidden"/> 
                </div>
                <div className='flex items-center justify-between w-full'>
                <div className="">
                <p className='m-0 text-[11px] font-semibold'>{userReducerData.user.username}</p>
                <p className='m-0 text-[11px] font-semibold'>{userReducerData.user.fullname}</p>
                </div>
               
                </div>
            </div>
            <div className="flex justify-between mx-2 mt-2">
        <p className="text-[13px] font-semibold text-blue-700 ">Recommendations</p>
            <div className="md:text-[17px] text-xl text-slate-700 hover:text-green-500  cursor-pointer">
            <IoMdRefresh />
          </div>
        </div>
         {
          followers[0] && followers.map((user)=>{
            return (
              <Followers token={token} username={user.username} fullname={user.fullname} avatar={user.avatar} id={user._id}  status="Follow"/>
            )
          })
        } 
      
        {
          following[0] && following.map((user)=>{
            return (
              <Followers token={token} username={user.username} fullname={user.fullname} avatar={user.avatar} id={user._id} status="Unfollow"/>
            )
          })
        } 
    
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