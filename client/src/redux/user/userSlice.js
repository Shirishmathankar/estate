import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:null,
    error:null,
    loading:false,
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInstart:(state)=>{
          state.loading=true,
          state.error=null
        },
        signInsuccess:(state,action)=>
        {   state.error=null
            state.currentUser=action.payload
            state.loading=false
        
        },
        signInfailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }


    }
})

export const {signInstart,signInfailure,signInsuccess}=userSlice.actions
export default userSlice.reducer