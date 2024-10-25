
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/signIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'


function App() {
  const Applayout=createBrowserRouter([
    {
       path:"/",
       element:<Home/>
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
   },
])

  return (
    <>
     <RouterProvider router={Applayout}/>
    </>
  )
}

export default App
