import express from "express"
import mongoose from "mongoose"
import dotenv  from "dotenv";
dotenv.config();
const app=express();
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("connect to mongodb")
})
.catch((err)=>{
  console.log(err)
})

app.listen(3000,()=>{
   console.log(`app is listen on port${3000}`)
}
)
