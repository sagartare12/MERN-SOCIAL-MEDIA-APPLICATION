import React, { useState } from 'react'
import loginSignupImage from '../assets/login-animation.gif';
import {BiShow , BiHide} from 'react-icons/bi'
import {Link } from 'react-router-dom'


const Signup = () => {
  const [showPassword,setShowPassword]= useState(false);
  const [showConfirmPassword,setShowConfirmPassword]= useState(false);

  const handleShowPassword=()=>{
      setShowPassword(prev => !prev)
  }
  const handleShowConfirmPassword=()=>{
    setShowConfirmPassword(prev => !prev)
}

  return (
    <div className="p-3 md:p-4  ">
      <div className="w-full max-w-sm bg-white mx-auto flex-col p-4 ">
        {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={loginSignupImage} alt="" className="w-full h-full" />
          
          <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3 bg-slate-500  bg-opacity-60 w-full text-center cursor-pointer">
            <p className='text-sm p-1 text-white'>Upload</p>
          </div>
          </label>
          <input type="file" id="profileImage" className='hidden' accept='image/*' />
        </div>
        <form className="w-full py-3 flex flex-col">
          {/* <form className="w-full py-3 flex flex-col"> */}
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
         
          />

          <label htmlFor="lastName">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
         
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 outline-0 border-none "
             
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={!showConfirmPassword ? "Password" : "text"}
              id="confirmPassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 outline-0 border-none "
           
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type="submit" className="max-w-[120px]   w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white  font-medium text-center py-1 rounded-full mt-4">
            Sign Up
          </button>
        </form>
       
        <p className="text-sm justify mt-2 ">
          Already have an account ?{" "}
          <Link to="/login" className="text-red-500  font-bold underline">
            Login
          </Link>
        </p>
      
      </div>
    </div>
  );
}

export default Signup
