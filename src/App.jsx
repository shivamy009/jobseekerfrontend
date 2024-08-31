// import { useState } from 'react'
import './App.css'
import Nav from './components/Navbar'
// import job from './assets/jobbie.jpg'
// import jobless from './assets/jobless.avif'
// import Login from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './components/Home/Home'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import Application from './components/Application/Application'
import PostJob from './components/Job/PostJob'
import MyJobs from './components/Job/MyJobs'
import MyApplications from './components/Application/MyApplications'
// import { UserContext } from './main'
import { createContext, useContext, useEffect, useState } from 'react'
import { lookInSession } from './common/Session'

export const UserContext=createContext({})
//  let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
function App() {
  const [userAuth,setUserAuth]=useState({})
//  useEffect(()=>{
//   let userInSession=lookInSession("user")
//   // let themeInsession=lookInSession("theme")

//   userInSession ? setUserAuth(JSON.parse(userInSession)): setUserAuth({access_token:null})

//   // console.log(userAuth)
// //  if(themeInsession){
// //    setTheme(()=>{
// //      document.body.setAttribute('data-theme',themeInsession)
// //      return themeInsession

// //    })
// //  }else{

// //    document.body.setAttribute('data-theme',theme)
// //  }
// },[access_token])
useEffect(()=>{
  let userInSession=lookInSession("user")
  // let themeInsession=lookInSession("theme")

  userInSession ? setUserAuth(JSON.parse(userInSession)): setUserAuth({access_token:null})

 //  console.log(userAuth)
  
},[])

  return (
    <>
    {/* <BrowserRouter> */}
    <UserContext.Provider value={{userAuth,setUserAuth}}> 
    <Nav/>
      <Toaster/>
    <Routes>

      <Route path='/' element={<Home/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/signin' element={<SignIn/>}/>
     <Route path="/job/getall" element={<Jobs />} />
     <Route path="/job/:id" element={<JobDetails />} />
     <Route path="/application/:id" element={<Application />} />
     <Route path="/applications/me" element={<MyApplications />} />
     <Route path="/job/post" element={<PostJob />} />
     <Route path="/job/me" element={<MyJobs />} />
    </Routes>
    <Footer/>
    </UserContext.Provider>
    {/* </BrowserRouter> */}
    </>
  )
}

export default App
