/** @format */
"use client";

// import Link from "next/link"
import React, { useContext, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
// import Image from "next/image";
import logo from '../assets/joblogo.jpg'
import clsx from "clsx";
import { Link } from "react-router-dom";
// import { UserContext } from "../main";
import { removeFromSession } from "../common/Session";
import { UserContext } from "../App";
// import { Context, UserContext } from "../main";

const signOut=()=>{
  removeFromSession("user");
  setUserAuth({access_token:null})
 }

export default function Navbar() {
  const [isSideMenuOpen, setMenu] = useState(false);
  // const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  let {userAuth,userAuth:{access_token},setUserAuth}=useContext(UserContext)

  const navlinks = [
    {
      labe: " Home",
      link: "/"
    },
    {
      labe: " Jobs",
      link: "/job/getall"
    },
    
  ];
  const afterloginNavlink = [
    {
      labe: " Home",
      link: "/"
    },
    {
      labe: " Jobs",
      link: "/job/getall"
    },
    
     
    {
      labe:userAuth && userAuth.role === "Employer"
      ? "POST NEW JOB"
      :  <></>,
      link: "/job/post"
    },
    {
      labe:userAuth && userAuth.role === "Employer"
      ? " VIEW YOUR JOBS"
      :  <></>,
      link: "/job/me"
    },

    {
      labe:userAuth && userAuth.role === "Employer"
      ? "APPLICANT'S APPLICATIONS"
      : "MY APPLICATIONS",
      link: "/applications/me"
    },
    
  ];
  const smallnavlinks = [
    {
      labe: " Jobs",
      link: "/job/getall"
    },
    
    {
      labe: "SignIn",
      link: "/signin"
    },
    {
      labe: "SignUp",
      link: "/signup"
    },
    
    
  ];
  const aftersmallnavlinks = [
    {
      labe: " Jobs",
      link: "/job/getall"
    },
     
    {
      labe:userAuth && userAuth.role === "Employer"
      ? "APPLICANT'S APPLICATIONS"
      : "MY APPLICATIONS",
      link: "/applications/me"
    },
    {
      labe: "Logout",
      link: "/signin"
    },
    
    
  ];

  return (
    <main className=" z-50 top-0 sticky">
      <nav className="flex justify-between px-16 items-center py-2 bg-indigo-700  ">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            {/* logo */}
            <Link to={"/"} className="text-4xl font-mono">
              <img src={logo} className=" w-11 rounded-full" alt="" />
            </Link>
          </section>
          {/* {navlinks.map((d, i) => (
            <Link
              key={i}
              className="hidden lg:block  text-gray-400 hover:text-black"
              href={d.link}
            >
              {d.labe}
            </Link>
          ))} */}
        </div>

        {/* sidebar mobile menu */}
        <div
         onClick={() => setMenu(false)}
          className={clsx(
            " fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

            {
            access_token ?
            aftersmallnavlinks.map((d, i) => (
              <Link key={i} className="font-bold" to={d.link}>
                {d.labe}
              </Link>
            ))
            :
            smallnavlinks.map((d, i) => (
              <Link key={i} className="font-bold" to={d.link}>
                {d.labe}
              </Link>
            ))
            
            }
          </section>
        </div>

        {/* last section */}
        <section className="flex items-center gap-4">
          {/* cart icon */}
          {
          access_token ?
          afterloginNavlink.map((d, i) => (
            <Link
              key={i}
              className="hidden lg:block mx-2 text-xl uppercase   hover:text-slate-400"
              to={d.link}
            >
              {d.labe}
            </Link>
          ))
          :
          navlinks.map((d, i) => (
            <Link
              key={i}
              className="hidden lg:block mx-2 text-xl uppercase   hover:text-slate-400"
              to={d.link}
            >
              {d.labe}
            </Link>
          ))
          }
          <div className="  justify-center items-center hidden lg:block">
            {
             access_token ?
             <Link onClick={signOut} to={'/signin'} className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 text-xl rounded md:ml-8 hover:bg-indigo-400 ">Logout</Link>
             :
            <Link to={'/signin'} className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 text-xl rounded md:ml-8 hover:bg-indigo-400 ">SignIn</Link>
            }
           
          </div>
          {/* avtar img */}
        </section>
      </nav>
      <hr className=" " />
    </main>
  );
}