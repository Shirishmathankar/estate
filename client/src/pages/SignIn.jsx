import React, { useState } from 'react'
import Header from '../components/Header'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInstart,signInsuccess,signInfailure } from '../redux/user/userSlice';
import Oath from '../components/Oath';


const SignIn = () => {
  const [formData,setformData]=useState({});
  const dispatch=useDispatch()
  const {loading,error}=useSelector((state)=>state.user)
  const nevigate=useNavigate();
  
  const handleInput=(e)=>{
    
    setformData({
       ...formData,
       [e.target.id]:e.target.value,
    });
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
       dispatch(signInstart())
       if(!formData.email||!formData.password){
        dispatch(signInfailure("all field are mandatory "))
        return
      }
      try {
        dispatch(signInstart())
         // Reset error before submission
    
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data=await res.json();
        console.log(data)
        if (data.success === false) {
          dispatch(signInfailure(data.message))
          return;
        }
        
        dispatch(signInsuccess(data))
        nevigate('/');
    
      } catch (error) {
        dispatch(signInfailure(error.message || "An error occurred. Please try again."))
      }
    };
    
  return (
    <>
    <Header/>
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl font-semibold capitalize text-center my-7'>sign in</h1>
      <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
        
         <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleInput}/>
         <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleInput}/>
         <button disabled={loading} className='my-3 border p-3 rounded-lg bg-slate-600 hover:opacity-95 disabled:opacity-80 uppercase text-white' >{loading?"Loading...":"sign in"}</button>
         <Oath/>
      </form>
      <div className='capitalize flex gap-2 mt-2'>
        <p>dont have an account?</p>
       <Link to='/sign-up'><span className='text-blue-500 hover:underline '>sign up</span></Link>
        
      </div> 
      {error&&<p className='text-red-600 mt-4'>{error}</p>}
    </div>
    </>
  )
}

export default SignIn