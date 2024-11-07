import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import React from 'react'
import { analytics, app } from "../firebase.js"
import { useDispatch } from "react-redux"
import { signInsuccess } from "../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom"
 

const Oath = () => {
   const dispatch=useDispatch()
   const nevigate=useNavigate()
    const handleOath= async ()=>{
        try{
           const provider=new GoogleAuthProvider()
           const auth=getAuth(app)
           const result = await signInWithPopup(auth,provider)
           console.log(result);
           const res=await fetch('/api/auth/google',
            {
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({name:result.user.displayName,email:result.user.
                email,photo:result.user.photoURL
                })
            }
           )
           const data=await res.json();
            dispatch(signInsuccess(data))
            nevigate('/')
        }
        catch(error){
            console.log("error in auth ",error );
        }
    }
  return (
    <button type="button" className='bg-red-600 p-3 text-white uppercase rounded-lg' onClick={handleOath}>continue with google</button>
  )
}

export default Oath