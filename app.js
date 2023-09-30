const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware')
// const dotenv = require('dotenv');
const {MongoClient} = require("mongodb");
require('dotenv').config({path: '.env'});
const url = `mongodb://0.0.0.0:27017`;
const client = new MongoClient(url);
const db = client.db("test")

const app = express();
const PORT = process.env.PORT || 5000;


//to send users to the client
const findUsers = async (db)=>{
    await client.connect();
    const collection = db.collection("users");
    try{
        const result = await collection.find({}).toArray();
        //console.log('All users found', result);
        return result;
    }catch (err){
        console.log('Error finding users')
    }finally{
        await client.close();
    }
}



mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 50,
    wtimeoutMS:2500,
    useNewUrlParser: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
});
mongoose.connection.on('connected', ()=>{
    console.log('Connected to MongoDB');
});

app.use(express.json());
//Regular expression for email validation

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Regular expression for password validation (minimum 8 characters, at least one letter, and one number)
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//Define  your MongoDB Schema and model for user data

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

//Register a new user
app.post('/register', async (req, res)=>{
    try{
        const {username, email, password } = req.body;
        //Check if email already exists
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({error: 'Email already in use'})
        }

        //validate email and password format
        if (!emailRegex.test(email)|| !passwordRegex.test(password)){
            return res.status(400).json({error: 'Invalid email or password format'});

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password:hashedPassword});
        await user.save();
        res.status(201).json({message:'User registered successfully'});

    }catch(err) {
        res.status(500).json({error: 'Internal Server error'})
    }
});

//login and Generate a JWT token

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        //Validate email format
        if (!emailRegex.test(email)){
            return res.status(400).json({error: 'Invalid email format'})
        }
        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({error: 'User does not exist'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(401).json({error: 'Invalid Password'});
        }
        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
           expiresIn:'1h' ,//Token expires in 1 hour
        });
        res.status(200).json({token});
    }catch (err){
        res.status(500).json({error: 'Internal server error'});
    }
})

app.get('/profile',authMiddleware, async (req, res) => {
    try{
        //if the authentication middleware succeeds, the user information is available in req.user
        res.status(200).json({user:req.user});
    }catch (err){
        return err;
    }
})
app.get('/users', async (req, res)=>{
    const userss = findUsers(db)
   await console.log(userss);
    res.send(userss);
    
})

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
});