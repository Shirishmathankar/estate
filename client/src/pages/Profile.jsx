import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div>
      <Header/>
      <div className=' max-w-lg mx-auto'> 
      <h1 className='text-3xl font-semibold capitalize text-center mt-6'>profile</h1>
      
      <form className='flex flex-col gap-4'>  
      <img src={currentUser.avatar} className='self-center cursor-pointer object-cover rounded-full' alt='profile-pic'/>
        <input type='text' placeholder='username' id='text' className=' border p-3 rounded-md '/>
        <input type='email' placeholder='email' id='email' className=' border p-3 rounded-md '/>
        <input type='password ' placeholder='password' id='password' className=' border p-3 rounded-md '/>
        <button className='uppercase bg-slate-700 rounded-md p-3 text-white'>update</button>
      </form>
      <div className='flex justify-between text-red-600 mt-3'>
        <span className='cursor-pointer'>Delete Account </span>
        <span className='cursor-pointer'>Sign Up</span>
      </div>
      </div>
    </div>
  )
}

export default Profile