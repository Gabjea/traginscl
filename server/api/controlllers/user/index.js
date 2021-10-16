const User = require('../../../models/user')
const jwt = require("jsonwebtoken");
const passport = require('../../../auth/passport');
const userFunctions = require("../../functions/user");
const mongoose = require("../../../database")


const loginController = async (req, res) => {
    const { email, password } = req.body;
   
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
      
     
    const expire = "60s"

    const jwtToken = jwt.sign(
      { id: userWithEmail._id, email: userWithEmail.email },
      process.env.JWT_SECRET,{
        expiresIn: expire
      }
    );
  
    res.json({ message: "Welcome Back!", token: "Bearer " +jwtToken, expin: expire });
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
   
    const newUser = new User({_id: new mongoose.Types.ObjectId ,username,email,password,weight, role:"user" });
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });
  
    if (savedUser) res.json({ message: "Thanks for registering" });
  }


const accountController =async(req, res) => {
  const token= req.headers.authorization.split(' ')[1]
    res.send(await userFunctions.getUserByIdFromToken(token))
   
  }


const fileUploadController = async(req, res) => {
  
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        
        let file = req.files.file;
      
        file.mv('./server/uploads/' + file.name);
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
}

const getAllUsers = (req,res)=>{
  User.find({}, (err,users) =>{
    if (err) res.send(err)
    else res.send(users)
  })
}


module.exports = {
    loginController,
    registerController,
    accountController,
    fileUploadController,
    getAllUsers
    }