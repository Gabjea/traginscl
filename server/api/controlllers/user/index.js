const User = require('../../../models/user')
const jwt = require("jsonwebtoken");
const passport = require('../../../auth/passport');
const userFunctions = require("../../functions/user");


const loginController = async (req, res) => {
    const { email, password } = req.body;
   // console.log(email)
    const userWithEmail = await User.findOne({ email:email }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
  
    if (!userWithEmail)
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
  
    if (userWithEmail.password !== password)
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
      
     
      
    const jwtToken = jwt.sign(
      { id: userWithEmail._id, email: userWithEmail.email },
      process.env.JWT_SECRET,{
        expiresIn: '10s'
      }
    );
  
    res.json({ message: "Welcome Back!", token: "Bearer " +jwtToken, expin: '10s' });
  }


const registerController = async (req, res) => {
    const { username,email,password,weight } = req.body;
    
    const alreadyExistsUser = await User.findOne({ email : email }).exec().catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
  
    if (alreadyExistsUser) {
      return res.status(409).json({ message: "User with email already exists!" });
    }
   
    const newUser = new User({  username,email,password,weight });
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });
  
    if (savedUser) res.json({ message: "Thanks for registering" });
  }


const accountController =async(req, res) => {
    const token= req.headers.authorization
    res.send(await userFunctions.getUserByIdFromToken(token))
  }
module.exports = {
    loginController,
    registerController,
    accountController
    }