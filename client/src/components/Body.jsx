import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/signIn'
import SignUp from '../pages/SignUp'
import About from '../pages/About'
import Profile from '../pages/Profile'


const Body = () => {
    const Applayout=createBrowserRouter([
        {
           path:"/",
           element:<Home/>,
           
        },
        {
          path:"/sign-in",
          element:<SignIn/>
        },
        {
          path:"/sign-up",
          element:<SignUp/>
       },
       {
        path:"/Profile",
        element:<Profile/>
       },
       {
        path:"/about",
        element:<About/>
       }
        
      
       
    ])
    
      return (
         <RouterProvider router={Applayout}/>
      )
}

export default Body