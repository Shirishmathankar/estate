import React, { useState } from 'react'
import Header from '../components/Header'
import { Link,useNavigate } from 'react-router-dom'
import { email_validation, PASSWORD_VALIDATION } from '../utils/expressions';

const SignUp = () => {
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
      if(!formData.username||!formData.email||!formData.password){
        setError("all feilds are mandetory")
        setLoading(false)
        return
      }
      try {
        setLoading(true);
        setError(null); // Reset error before submission
        const pass=formData.password
        const validpassword=PASSWORD_VALIDATION.test(pass);
        const validemail=email_validation.test(formData.email)
        if(!validpassword){
          setError("password should one capital letter and digit")
          setLoading(false)
          return
        }
        if(!validemail){
          setError("please enter valid email")
          setLoading(false)
          return
        }
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data=await res.json();
        
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
    
        setLoading(false);
        setError(null);
        nevigate('/sign-in');
    
      } catch (error) {
        setError(error.message || "An error occurred. Please try again.");
        setLoading(false);
      }
    };
    
  return (
    <>
    <Header/>
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl font-semibold capitalize text-center my-7'>sign up</h1>
      <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
         <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg' onChange={handleInput}/>
         <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleInput}/>
         <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleInput}/>
         <button disabled={Loading} className='my-3 border p-3 rounded-lg bg-slate-600 hover:opacity-95 disabled:opacity-80 uppercase text-white' >{Loading?"Loading...":"sign up"}</button>
      </form>
      <div className='capitalize flex gap-2 mt-2'>
        <p>already have an account?</p>
       <Link to='/sign-in'><span className='text-blue-500 hover:underline '>sign in</span></Link>
        
      </div >  
      {Error&&<p className='text-red-600 '>{Error}</p>}
    </div>
    </>
  )
}

export default SignUp