import React, { useState } from 'react'
import Header from '../components/Header'
import { Link,useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [formData,setformData]=useState({});
  const [Error,setError]=useState(null);
  const [Loading,setLoading]=useState(false);
  const nevigate=useNavigate();
  
  const handleInput=(e)=>{
    
    setformData({
       ...formData,
       [e.target.id]:e.target.value,
    });
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
       setError(null)
       if(!formData.email||!formData.password){
        setError("all feilds are mandetory")
        setLoading(false)
        return
      }
      try {
        setLoading(true);
        setError(null); // Reset error before submission
    
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
          setLoading(false);
          setError(data.message);
          return;
        }
        
        setLoading(false);
        setError(null);
        nevigate('/');
    
      } catch (error) {
        setError(error.message || "An error occurred. Please try again.");
        setLoading(false);
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
         <button disabled={Loading} className='my-3 border p-3 rounded-lg bg-slate-600 hover:opacity-95 disabled:opacity-80 uppercase text-white' >{Loading?"Loading...":"sign in"}</button>
      </form>
      <div className='capitalize flex gap-2 mt-2'>
        <p>dont have an account?</p>
       <Link to='/sign-in'><span className='text-blue-500 hover:underline '>sign up</span></Link>
        
      </div> 
      {Error&&<p className='text-red-600'>{Error}</p>}
    </div>
    </>
  )
}

export default SignIn