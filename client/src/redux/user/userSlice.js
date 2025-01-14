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
        },
        updateUserstart:(state)=>{
        state.loading=true
        state.error=null
        },
        updateUsersuccess:(state,action)=>{
            state.error=null
            state.currentUser=action.payload
            state.loading=false
        },
        updateUserfailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        deleteUserstart:(state)=>{
          state.loading=true
          state.error=null
        },
        deleteUsersuccess:(state)=>{
            state.error=null
            state.currentUser=null
            state.loading=false
        },
        deleteUserfailure:(state,action)=>{
            
           state.loading=false
           state.error=action.payload
        },
        signoutUserstart:(state)=>{
           state.error=null
           state.loading=true
        },
        signoutUserfailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        signoutUsersuccess:(state)=>{
            state.error=null
            state.loading=false
            state.currentUser=null
        }



    }
})

export const {signInstart,signInfailure,signInsuccess,updateUserstart,updateUsersuccess,updateUserfailure,deleteUserstart,deleteUsersuccess,deleteUserfailure,signoutUserstart,signoutUserfailure,signoutUsersuccess}=userSlice.actions
export default userSlice.reducer