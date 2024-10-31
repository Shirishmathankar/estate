import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.route.js"

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
app.use(express.json());
app.listen(3000,()=>{
   console.log(`app is listen on port${3000}`)
}
)
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)