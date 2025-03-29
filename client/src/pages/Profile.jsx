import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {deleteUserfailure, deleteUserstart, deleteUsersuccess, signoutUserfailure, signoutUserstart, signoutUsersuccess, updateUserfailure, updateUserstart, updateUsersuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Profile = () => {
  const {currentUser,loading,error}=useSelector(state=>state.user)
  const fileRef=useRef(null);
  const dispatch=useDispatch();
  const [formData,setformData]=useState({})
  const nevigate=useNavigate();
  const handelsignout=async()=>{
     try {
        dispatch(signoutUserstart())
        const res=await fetch('/api/auth/sign-out') 
        const data=await res.json()
        if(data.message===false)
        {
          dispatch(signoutUserfailure(data.message))
          return 
        }
      dispatch(signoutUsersuccess())
      
     } catch (error) {
        dispatch(signoutUserfailure(error.message))
     }
  }
  const handleClick=(e)=>{
      setformData({
        ...formData, [e.target.id]:e.target.value,
      })
  }
  const handelDelete= async ()=>{
    try{
    dispatch(deleteUserstart())
    const res=await fetch(`/api/user/delete/${currentUser._id}`,{
    method:'DELETE'
    })
    const data=await res.json();
   if(data.success===false)
   {
      dispatch(deleteUserfailure(data.message))
      return
   }
     dispatch(deleteUsersuccess(data))
    
    }
    catch(error){
       dispatch(deleteUserfailure(error.message))
    }
  }
  const handleFileUpload = async () => {
    if (!fileRef.current.files[0]) {
      alert('Please select a file to upload.');
      return;
    }
  
    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
  
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        body: formData, // Send FormData directly
      });
  
      const data = await res.json();
      console.log('Avatar URL:', data);
      if (data?.success===false) {
        dispatch(updateUserfailure(data.message));
        return;
      }
      console.log(data.avatar)
      dispatch(updateUsersuccess(data));
      alert('File uploaded successfully');
    } catch (error) {
      dispatch(updateUserfailure(error.message));
      alert('File upload failed.');
    }
  };
  

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
       dispatch(updateUserstart())

       const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
         
       })
       const data=await res.json();
       if(data.success===false){
        
        dispatch(updateUserfailure(data.message));
        return 
       }
     dispatch(updateUsersuccess(data));
       
    }
    catch(error){
      dispatch(updateUserfailure(data.message))
    }
  }
  
  return (
    <div>
      <Header/>
      <div className=' max-w-lg mx-auto'> 
      <h1 className='text-3xl font-semibold capitalize text-center mt-6 mb-4'>profile</h1>
      
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>  
        <input 
        type='file' 
        hidden ref={fileRef}
        onChange={handleFileUpload}
        />

<img
  src={
    currentUser.avatar ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGylI3uBTUYSwfiDYT9UnFXYPYLChX2ltSJvsjAOKGokgRQeJ158QoAAzk-HyfmuWlTJ8&usqp=CAU"
  }
  onClick={() => {
    fileRef.current.click();
  }}
  className="self-center cursor-pointer object-cover rounded-full w-32 h-32"
  alt="profile-pic"
/>

        <input
         type='username' 
         placeholder='username'
         id='username' 
         defaultValue={currentUser.username}
         onChange={handleClick}  
         className=' border p-3 rounded-md '
        />
        <input
        type='email' 
        placeholder='email' 
        id='email' 
        defaultValue={currentUser.email}
         onChange={handleClick}       
        className=' border p-3 rounded-md '
        />
        <input 
        type='password' 
        placeholder='password' 
        id='password'
        defaultValue={currentUser.password}
        onChange={handleClick}
        className=' border p-3 rounded-md '
        />
        <button 
        className='uppercase bg-slate-700 rounded-md p-3 text-white hover:opacity-95'>{loading?'loading':'upadte'}
        </button>
        <Link className='uppercase bg-green-700 rounded-md p-3 text-white text-center hover:opacity-95 ' to={"Create-Listing"}>Create Listing</Link>
      </form>
      <div className='flex justify-between text-red-600 mt-3'>
        <span onClick={handelDelete}className='cursor-pointer'>Delete Account </span>
        <span className='cursor-pointer' onClick={handelsignout}>Sign Up</span>

      </div>
      <p className='text-red-700 my-2'>{error?error:""}</p>
      </div>
    </div>
  )
}

export default Profile