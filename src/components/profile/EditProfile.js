import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from "../../utility/imageToBase64";
import { useSelector ,useDispatch} from 'react-redux'
import {toast} from 'react-hot-toast'
import axios from 'axios';
import {updateUserReducer ,usersData} from '../../store/slices/UserSlice'


const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch()


  const [userPost,setUserPost]=useState()
  // const followUnfoReducer = useSelector((state)=>state.users.followUnfollow.data.updatedUser )

  const followUnfoReducer = useSelector((state)=>state.users.user.user)
  const userReducerData = useSelector((state)=>state.users.followUnfollow.data.updatedUser )
  const userssData = useSelector((state)=>state.users.userData)
 
  const user = useSelector((state)=>state.users.user)
 console.log(followUnfoReducer)
  const token=user.access_token
  const [profilePop , setProfilePop] =useState(false)
  const handleProfile = async () => {
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };
  const handleEditProfile = async () => {
    setTimeout(() => {
      navigate("/editprofile");
    }, 1000);
  };
  const [showEditProfileBio, setShowEditProfileBio] = useState(false);
  const handleshowEditProfileBio = () => {
    setShowEditProfileBio((prev) => !prev);
  };

  const [userData, setUserData] = useState({
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    bio: "",
    gender: "",
    avatar:""
  });

  

  const handleOnChange=(e)=>{
    const {name,value} = e.target;
    setUserData((prev)=>{
        return {
             ...prev,
             [name]:value
             }
    })
}

  const handleChangeProfileImage = async (e) => {
    const data = await imageToBase64(e.target.files[0]);
    userData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();
  
   
    




  try{
    const fetchData= await axios.patch(`${process.env.REACT_APP_SERVER_DOMAIN}/user`,userData, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':  token // Include your actual token value
      },
    });

    
    
// dispatch(updateUserReducer(fetchData));
dispatch(usersData(fetchData.user));
console.log(fetchData)
  }catch (error) {
    console.error('Error fetching data:', error);
  }
};

//get user post
const handlePost=async(e)=>{
  e.preventDefault();

 
  




try{
  const fetchData= await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/posts/user_posts/${followUnfoReducer._id}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token':  token // Include your actual token value
    },
  });

  
  
// dispatch(updateUserReducer(fetchData));
setUserPost(fetchData)
console.log(userPost)
}catch (error) {
  console.error('Error fetching data:', error);
}
};
  return (
    <div  >




      <div className="flex  mt-2 justify-center w-full">
<div className="flex items-center gap-2">
<div className=" rounded-full overflow-hidden">
            <img
              className="w-[120px] h-full object-cover"
              src={followUnfoReducer.avatar}
              alt="Circle Image"
            />
          </div>
          <div>
            <div className="flex gap-8 items-center">
          <p className="text-gray-700 text-base  my-0 font-bold">{followUnfoReducer.fullname}</p>
          <div className="my-0 bg-blue-500 hover:bg-blue-600 rounded-sm">

               
            <button
              className="text-[14px] font-semibold text-white py-1 px-2 text-center whitespace-nowrap cursor-pointer  hover:font-medium"
              onClick={handleshowEditProfileBio}
            >
              Edit Profile
            </button> 
          </div>
          </div>
    
              <div className="flex items-center gap-2 mt-3">
               <div className="flex gap-1 text-sm  my-auto text-blue-600 font-semibold">
                <p >{followUnfoReducer.followers.length }  </p>
                <p > Followers</p>

                </div>
                <div className="flex gap-1 text-sm items-center my-auto text-blue-600 font-semibold">
                <p >{followUnfoReducer.following.length}</p>
                <p > Following</p>

                </div>
                </div>
              <div className="flex   gap-2 ">
                
                <FaLocationDot />
                
                <p className="text-xs my-0">{userReducerData.address ? userReducerData.address : "Out off site"}</p>
              </div>
              </div>

</div>

      </div>
      <div className="flex flex-col items-center justify-center w-screen mt-2">
        <div className="flex items-center">
      
          <div className="flex items-center gap-5  ">
        
            <div className="bg-blue-400 w-full rounded-lg">
              <div className="cursor-pointer">
        
                {showEditProfileBio && (
                 
                  <div className="absolute right-5 shadow drop-shadow-md">
                    <div className="p-3 md:p-4">
                      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
                   
                        <form
                          className="w-full py-3 flex flex-col"
                          onSubmit={handleSubmit}
                        >

<div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
                          <img
                            src={
                              userData.image
                                ? userData.image
                                : "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
                            }
                            className="w-full h-full"
                          />

                          <label htmlFor="profileImage">
                            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                              <p className="text-sm text-white p-0.5">Upload</p>
                            </div>
                            <input
                              type={"file"}
                              id="profileImage"
                             name="avatar"
                              className="hidden"
                              accept="image/*"
                              onChange={handleChangeProfileImage}
                            />
                          </label>
                        </div>
                          <label htmlFor="fullName">Full Name </label>
                          <div className="flex items-center justify-between">
                            <input
                              for="textInput"
                              type={"text"}
                              id="fullname"
                              name="fullname"
                              value={userData.fullname}
                              onChange={handleOnChange}
                              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            />
                          </div>
                          <label htmlFor="mobile">Mobile </label>
                          <input
                            for="textInput"
                            type={"text"}
                            id="mobile"
                            name="mobile"
                            value={userData.mobile}
                            onChange={handleOnChange}
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                          />
                          <label htmlFor="address">Address </label>
                          <input
                            for="textInput"
                            type={"text"}
                            id="address"
                            name="address"
                            value={userData.address}
                            onChange={handleOnChange}
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                          />
                          <label htmlFor="website">Website </label>
                          <input
                            for="textInput"
                            type={"text"}
                            id="website"
                            name="website"
                            value={userData.website}
                            onChange={handleOnChange}
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                          />
                          <label htmlFor="bio">Bio </label>
                          <input
                            for="textInput"
                            type={"text"}
                            id="bio"
                            name="bio"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                          />
                          <label htmlFor="gender">Gender</label>
                          <div className="mt-2 flex">
                          <label>
        <input
        className='mr-2'
          type="radio"
          name="gender"
          value="Male"
          checked={userData.gender === 'Male'}
          onChange={handleOnChange}
        />
        Male
      </label>

      <label>
        <input
        className='mr-2'
          type="radio"
          name="gender"
          value="Female"
          checked={userData.gender === 'Female'}
          onChange={handleOnChange}
        />
        Female
      </label>

      <label>
        <input
        className='mr-2'
          type="radio"
          name="gender"
          value="Other"
          checked={userData.gender === 'Other'}
          onChange={handleOnChange}
        />
        Other
      </label>

                      
                          </div>
                          <button className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-s rounded-full">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* w-full  m-auto bg-blue-500 hover:bg-red-600 cursor-pointer text-white text-s font-medium py-1 rounded-full mt-4 */}
      <nav className="bg-grey p-4">
        <div className="flex items-center justify-center">
          <div className="flex space-x-4">
            <button
              id="postBtn" 
              onClick={handlePost}
              className="text-black focus:outline-none hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              Post
            </button>
            <button
              id="saveBtn"
              className="text-black focus:outline-none hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              Save
            </button>
          </div>
        </div>
      </nav>

      {/* {userPost.data.posts[0] && userPost.data.posts.map((post)=>{
        return (
          <div>
          <img
            className="w-40 h-40 object-cover ml-2 mt-2"
            src={post.images}
            alt="post image"
          ></img>
        </div>
        )
      })} */}
     
    </div>
  );
};

export default EditProfile;
