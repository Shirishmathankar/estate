import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.route.js"
import path from "path"
import dotenv  from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config();

const app=express();
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("connect to mongodb")
})
.catch((err)=>{
  console.log(err)
})
const __dirname=path.resolve(); 

app.use(express.json());
app.use(cookieParser())
app.listen(3000,()=>{
   console.log(`app is listen on port${3000}`)
}
)


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.use(express.static(path.join(__dirname,'/client/dist'))); 

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html') )
})

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||"interna server error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
})