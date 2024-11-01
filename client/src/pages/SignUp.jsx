import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <>
    <Header/>
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl font-semibold capitalize text-center my-7'>sign up</h1>
      <form className='flex flex-col gap-3 '>
         <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg'/>
         <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg'/>
         <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'/>
         <button className='my-3 border p-3 rounded-lg bg-slate-600 hover:opacity-95 disabled:opacity-80 uppercase text-white' >sign in</button>
      </form>
      <div className='capitalize flex gap-2 mt-2'>
        <p>already have an account?</p>
       <Link to='/sign-in'><span className='text-blue-500 hover:underline '>sign in</span></Link>
      </div>
    </div>
    </>
  )
}

export default SignUp