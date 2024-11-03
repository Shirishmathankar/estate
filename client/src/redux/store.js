import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.js";



const store=configureStore({
    reducer:{
      user:userSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
})

export default store