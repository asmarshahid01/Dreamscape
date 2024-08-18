const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { JWT_SECRET } = process.env

const { User, Journal, Public, Notify } = require('../models');

const { genderValues } =  require('../utils/constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils/responseHandlers')

const login = async (req,res) => {
    try{
        console.log(JWT_SECRET)
        const { username, password } = req.body
        
        const user = await User.findOne({username});
        if (!user){

        }
        const isMatched = bcrypt.compareSync(password, user.password)
        if (!isMatched){

        }
        const gender = user.gender
        const payload = { username, gender }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h'})

        handleSuccessResponse(res,"Login successful", { username, gender, token })
    }
    catch(err){
        handleErrorResponse(res, err)
    }
}

const signup = async (req,res) => {
    try{
    const { username, password, genderSelected } = req.body; 
    const gender = genderValues[genderSelected]

    const hashedPassword = bcrypt.hashSync(password, 10)

    await User.create({
        username: username,
        gender: gender,
        password: hashedPassword
    })

    const token = jwt.sign({ username, gender }, JWT_SECRET, { expiresIn: '8h'})

    handleSuccessResponse(res,"Signup successful", { username, gender, token })
    }
    catch(err){
        handleErrorResponse(res, err)
    }
}

const comment = async (req,res) => {
    console.log("API HIT");
    try {
    let {username,userComment,id}=req.body;
    let user=await User.findOne({username:username});
    let journalId=await Journal.findById(id);
    // let updatedone=await Public.findOneAndUpdate({"userinfo":userId},{$push:{comments:{comment:userComment,commentedBy:req.user.username}}},{new:true}).populate("journalinfo");
    let updatedone=await Public.findOneAndUpdate({"journalinfo":journalId},{$push:{comments:{comment:userComment,commentedBy:user.username}}},{new:true});
    console.log(updatedone);
    let allPublicDreams = await Public.find({ 'userinfo': user._id }).populate("journalinfo");
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    console.log(allPublicDreams);
    let newNotification=new Notify(
        {
            title:allPublicDreams[0].journalinfo.title,
            commentBy:req.user.username,
            createdAt:currentDate.getDate() + ' / ' + month + ' / ' + year,
            username:userId
        }
    );
    await newNotification.save();
    handleSuccessResponse(res, "Comment published", newNotification);
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

// const logout = (req,res) => {
//     console.log("LOGUT API");
//     req.logOut((err)=>{
//         if(err){
//             handleErrorResponse(res,err)
//         }
//         else{
//             handleSuccessResponse(res, "User logged out", req.user);
//         }
//     });
// }

const notification = async(req,res)=>{
    try{const notification=await Notify.find({username:req.user._id});}
    catch(err){
        handleErrorResponse(res,err)
    }
    handleSuccessResponse(res, "Notifications searched and displayed", notification);
}

module.exports ={
    login,
    signup,
    comment,
    notification
}