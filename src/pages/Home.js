import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import Posts from '../components/profile/Posts'
import Followers from '../components/profile/Followers'
import Saved from '../components/profile/Saved'
import Signup from './Register'
import { IoMdRefresh } from "react-icons/io";
const Home = () => {
   const [popUp, setPopUp] = useState(false)
    const isPostPopUp = useSelector((state)=>state.buffer.buff.isPostPopUp)
   


    // useEffect(() => {
    //   // This effect runs when someVariable changes
    //   console.log("kooo")
     
    // }, [isPostPopUp]);
  return (
    <div>
      <div className='flex justify-center'>
        <div className='bg-white w-[700px]'>
          <Posts />
      
       
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
                <Saved />
            </div>
        
          </div>
  
       
      
    </div>
  
  )
}

export default Home