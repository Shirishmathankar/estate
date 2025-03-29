import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.route.js"
import path from "path"
import dotenv  from "dotenv";
import cookieParser from "cookie-parser"
import router from "./routes/listing.route.js"
import bodyParser from "body-parser"
import cors from "cors"

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
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Parse form-urlencoded
app.use(bodyParser.json());


app.listen(3000,()=>{
   console.log(`app is listen on port${3000}`)
}
)


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",router)
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