const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
require('dotenv').config({ path: './config/.env' });
const User = require ("../REST-API-CHECKPOINT/models/User")


const connectionToDB=async()=>{
    mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
    .then(()=>console.log('Connected to DataBase...'))
    .catch(err=>console.error('Could not connect',err));
    }
    connectionToDB();
    
app.use(express.json())

//  GET :  RETURN ALL USERS
app.get('/', async (req,res)=>{
    try{
          const Users = await User.find()
          res.json(Users)
        }
    catch{
          (err)
          res.status(500).json({message: error.message})
        }
     })


//   POST :  ADD A NEW USER TO THE DATABASE

app.post('/', async(req,res)=>{
   const Users = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName
})
   try{
    const newUser = await Users.save()
    res.status(201).json(newUser)
   }catch{
    (err)
    res.status(400).json({message:err.message})
   }
})


// PUT : EDIT A USER BY ID 
app.put('/:id',async(req,res)=>{
  try{
    const Users = await User.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:{...req.body}}
    )
    res.status(201).send({message:"updated"})
  }catch{
    (err)
        res.status(500).send({message: "there is no user"})
    }
  })

  //REMOVE A USER BY ID 

app.delete('/:id', async(req,res)=>{
    try{
      await User.deleteOne({ _id: req.params.id})
      res.json({message:'deleted'})
    }catch (err){
      res.status(500).json({message:err.message})
    }
  })
    
app.use("User",User)

app.listen(8000,()=>{
        console.log('server has started at port 8000')
})
   