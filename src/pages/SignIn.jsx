import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { storeInsession } from "../common/Session";
import { UserContext } from "../App";

const SignIn = () => {
//   const [darkMode, setDarkMode] = useState(false);
const navigate=useNavigate();
// const [fullname,setFullname]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
const submitHandle=async(e)=>{
  e.preventDefault()
  let lod=toast.loading("Loading...")
  try{
  //   if(fullname){
  //     if(fullname.length<3){
  //       toast.dismiss(lod)
  //        return toast.error("Full name must contain atleast 3 digit")
  //     }
  //  }
   if(!email.length){
    toast.dismiss(lod)
      return toast.error("Enter your email")
   }
   if(!password.length){
    toast.dismiss(lod)
      return toast.error("Enter your password")
   }
    let res= await axios .post(import.meta.env.VITE_SERVER_DOMAIN+'/signin',{
        // fullname:fullname,
        email:email,
        password:password
    })
   if(res.data.success){
  let {data}=res;
    console.log(data.message)
    // setIsAuthorized(true)
    storeInsession("user",JSON.stringify(data.sendData))
     setUserAuth(data.sendData)

    toast.dismiss(lod)
    navigate('/')
    return toast.success(data.message)
   }else{
    return toast.error(err.data.message)
   }
    // console.log(res)

  }
  catch(err){
    // console.log(err.response.data.message)
    toast.dismiss(lod)
     return toast.error(err.response.data.message)
  }

  // console.log(fullname,email,password)

}
  return (
    access_token ? navigate('/') :
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign In
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to login your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                {/* <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                /> */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                {/* <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="tel"
                  placeholder="Enter your phone"
                /> */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={submitHandle}  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span className="text-blue-900 font-semibold">Sign Up</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;