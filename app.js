const express=require('express')
const cors=require('cors')
const app=express()


//! require data models
const Post=require('./models/posts')
const User=require('./models/users')

const mongoose=require('mongoose')

const users = require('./models/users')
mongoose.set('strictQuery',false)

//! middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors()) //! cross origin resouse origin


const dbURL="mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(()=>{
    console.log("connected to database");
})
app.post('/login',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{
        if(userData){
            if (req.body.password == userData.password)
             {
                res.send({message:"login Successfull"})
            } else {
                res.send({message:"loging failed"})
            }

        }else{
            res.send({message:'no account is matching with the email adress'})
        }
    })
})
app.get('/posts',async(req,res)=>{
    try{
        const posts=await Post.find()
        res.send(posts)
    }catch(err)
    {
        console.log(err)
    }
})
app.get('/users',async(req,res)=>{
    try{
        const users=await User.find()
        res.send(users)
    }catch(err)
    {
        console.log(err)
    }
})
app.get('/posts/:id',async(req,res)=>{
    const {id} = req.params
    try{
        const singlePost=await Post.findById(id)
        res.send(singlePost)
    }catch(error){
        res.send(error)
    }
})
app.post('/add-posts', async(req,res)=>{
    let postData=new Post({
        author:req.body.author,
        Title:req.body.Title,
        summary:req.body.summary,
        image:req.body.image,
        location:req.body.location
    })
    try{
        await postData.save()
        console.log(postData)
        res.send({message:"post added successfully"})

    }catch(err){
        res.send({message:"Faild to add"})

    }
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
const PORT=4000
app.listen(PORT,()=>{
    console.log("listening to port")
})