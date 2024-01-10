import React, { useEffect, useState } from 'react'
import logo from './../assets/merny_logo.png'
import { Link,useNavigate } from 'react-router-dom'

import { useSelector ,useDispatch} from 'react-redux'
import { IoNotificationsSharp } from "react-icons/io5";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai"
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
 



    
  
  return (
    <header className="fixed bg-white shadow-md w-full h-16 px-2 md:px-4 z-50">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={"/"}>
          <div className="h-12 md:h-14 text-white">
            <img src={logo} alt="" className="h-full" />
          </div>
        </Link>

        <div className=' w-[400px] h-10 flex items-center bg-slate-200 rounded-full outline-2 outline-slate-300
        focus-within:outline'>
          <input type="text" className="bg-slate-200 w-full outline-none h-full rounded-full  text-center" placeholder='Enter to search' />
          <span className="flex text-xl text-slate-400 pr-4  cursor-pointer hover:text-slate-500">
            <FaSearch />
            </span>
        </div>
        <div className="flex items-center gap-4 md:gap-7">
          <div className="hidden sm:block">
         
          </div>

          <div className="text-3xl   relative">
            <Link to="" className='text-slate-600'>
            <AiFillHome />
            </Link>
           
          

          </div>
          <div className="text-3xl   relative">
            <Link to="" className='text-slate-600'>
            <BiMessageSquareDetail />
            </Link>
           
          

          </div>
          <div className="text-3xl   relative">
            <Link to="" className='text-slate-600'>
            <IoNotificationsSharp/> 
            </Link>
           
            <div className='h-5 w-5 absolute  text-white -right-2 -top-2 text-[15px]  rounded-full font-bold flex items-center justify-center bg-red-500'>
              {0}
            </div>

          </div>
           
            <div className=" cursor-pointer h-10 md:h-12" >
          <img alt=""  src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"  className='h-full'/>
            </div>
            
        
            
           
          
        </div>
      </div>

      {/* this is trial */}
      {/* mobile */}
    </header>
  );
}

export default Header