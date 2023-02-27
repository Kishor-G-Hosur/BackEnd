const express=require('express')
const cors=require('cors')
const app=express()
const PORT=4000

//! require data models

const User=require('./models/users')

const mongoose=require('mongoose')
mongoose.set('strictQuery',false)

//! middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors()) //! cross origin resouse origin


const dbURL="mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(()=>{
    console.log("connected to database");
})

app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>
    {
        if(userData){
            res.send({message:"user is already have an account with this email"})
        }
        else{
            const data= new User({
                name:req.body.name,
                email:req.body.email,
                phone_number:req.body.phone_number,
                password:req.body.password
            })
            data.save(()=>{
                if(err){
                    res.send(err)
                }else
                {
                    res.send({message:" user already register"})
                }
            })
            
        }
    })
})

app.listen(PORT,()=>{
    console.log("listening to port")
})