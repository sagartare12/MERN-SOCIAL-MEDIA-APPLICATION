import React, { useState } from 'react'
import loginSignupImage from '../assets/login-animation.gif';
import {BiShow , BiHide} from 'react-icons/bi'
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux';
import { loginReducer } from '../store/slices/UserSlice';
import { isSignupReducer } from '../store/slices/RouterSlice';


const Login = () => {
  const navigate  = useNavigate();

  const dispatch = useDispatch();
    const [showPassword,setShowPassword]= useState(false);
    
    const [userData,setUserData]=useState({
        email:"",
        password:"",
    })



    const handleShowPassword=()=>{
        setShowPassword(prev => !prev)
    }
    const handleOnChange=(e)=>{
        const {name,value} = e.target;
        setUserData((prev)=>{
            return {
                 ...prev,
                 [name]:value
                 };
        })
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();

      const {email,password} =userData;
      if( !email || !password) return  alert("Please enter required fields")
      console.log(process.env.REACT_APP_SERVER_DOMAIN)
      const fetchdata=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/login`,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      credentials: 'include', 
      body:JSON.stringify(userData)
    })

    const data= await fetchdata.json();
    if(data.msg) alert(data.msg)
      
     if(data.msg==='Login Success!'){
        dispatch(loginReducer(data));
        toast.success(`Thank you for login 🙏`)
        setTimeout(()=>{
          navigate('/')
        },1000);
     }else toast.error(data.message)
    }
    const handleSignUp=()=>{
      dispatch(isSignupReducer())
    }
  return (
    <div className="p-3 md:p-4  ">
      <div className="w-full max-w-sm bg-white mx-auto flex-col p-4 ">
        {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} alt="" className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          {/* <form className="w-full py-3 flex flex-col"> */}
         

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={userData.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 outline-0 border-none "
              value={userData.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type="submit" className="max-w-[120px]   w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white  font-medium text-center py-1 rounded-full mt-4">
            Log In
          </button>
        </form>
       
        <p className="text-sm justify mt-2 ">
          Create a new account ?{" "}
          <Link to="/register" onClick={handleSignUp} className="text-red-500  font-bold underline">
            Register
          </Link>
        </p>
      
      </div>
    </div>
  );
}

export default Login;
