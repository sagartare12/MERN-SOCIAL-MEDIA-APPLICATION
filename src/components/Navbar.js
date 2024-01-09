import React, { useEffect, useState } from 'react'
import logo from './../assets/sagar_shop.jpg'
import { Link,useNavigate } from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import {FaCircleUser} from 'react-icons/fa6'
import { useSelector ,useDispatch} from 'react-redux'



const Header = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
 



    
  
  return (
    <header className="fixed bg-white shadow-md w-full h-16 px-2 md:px-4 z-50">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={"/"}>
          <div className="h-12 md:h-14">
            <img src={logo} alt="" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-3 md:gap-7">
          <div className="hidden sm:block">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg ">

            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
          </nav>
          </div>
          <div className="text-2xl text-slate-600 relative">
            <Link to="/cart">
            <FaShoppingCart /> 
            </Link>
            <div className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0  text-sm text-center ">
              {0}
            </div>
          </div>
          <div className=" text-slate-600" >
            <div className="text-3xl cursor-pointer" >
          <FaCircleUser />
            </div>
            
        
            
           
          </div>
        </div>
      </div>

      {/* this is trial */}
      {/* mobile */}
    </header>
  );
}

export default Header