import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import About from '../pages/About'
import Profile from '../pages/Profile'
import Private from './private'
import CreateListing from '../pages/CreateListing'
import UpdateListing from '../pages/UpdateListing'
import Listing from '../pages/Listing'

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
        element:<Private/>,
        children: [
         {
           path:"", // Nested path
           element: <Profile />,
         },
         {
          path:"Create-Listing",
          element:<CreateListing/>,
         },
         {
          path:"Update-Listing/:listingid",
          element:<UpdateListing/>,
         }
        ]
       },
       {
        path:"/about",
        element:<About/>
       },
       {
        path:"/listing/:listingid",
        element:<Listing/>
       }
        
    ])
    
      return (
         <RouterProvider router={Applayout}/>
      )
}

export default Body