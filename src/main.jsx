// import { createContext, StrictMode, useContext, useEffect, useState } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import './App.css'

// import { BrowserRouter } from 'react-router-dom'
// import ReactDOM from "react-dom/client";
// import { lookInSession } from './common/Session.jsx'
// export const Context = createContext({
//   isAuthorized: false,
// });

// export const UserContext=createContext({})
// const AppWrapper = () => {
//   const [userAuth,setUserAuth]=useState({})
//   // const [isAuthorized, setIsAuthorized] = useState(false);
//   // const [user, setUser] = useState({});

//   useEffect(()=>{
//     let userInSession=lookInSession("user")
//     // let themeInsession=lookInSession("theme")
//     // let {userAuth:{access_token},setUserAuth}=useContext(UserContext)

//     userInSession ? setUserAuth(JSON.parse(userInSession)): setUserAuth({access_token:null})

    
//  },[])

//   return (
//     <UserContext.Provider value={{userAuth,setUserAuth}}>
//     <Context.Provider
//       value={{
         
//       }}
//     >
//       <App />
//     </Context.Provider>
//     </UserContext.Provider>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AppWrapper />
//   </StrictMode>
// );


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>

    <BrowserRouter>
    <App />
    
    </BrowserRouter>
  //* </React.StrictMode>, */}
)
