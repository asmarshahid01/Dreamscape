const {Journal, Analytic, Public, User} = require('../models');
const { handleSuccessResponse, handleErrorResponse } = require('../utils/responseHandlers');

const getDreams = (req,res) => {
    //console.log(req)
    // if (req.isAuthenticated()){
    //     try{
    //     let username = req.user.username;
    //     let gender = req.user.gender;
    //     console.log(username,gender)
    //     }
    //     catch(err){
    //         handleErrorResponse(res,err)
    //     }
    //     handleSuccessResponse(res, "Username and gender sent", {username,gender})
    //     }
    //     else{
    //         handleErrorResponse(res, { message: "Couldn't Authenticate User", statusCode: 401 });
    //         console.log("ERROR");
    //         res.json("error");
    //     }
    try{
        const username = req.user.username
        const gender = req.user.gender
        handleSuccessResponse(res, "Username and gender sent", {username, gender})
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

const writeDream = async(req,res)=>{
    try{
    let { title, dream, meaning, public, date } = req.body;
    console.log(req.user)

    //let userCurrent = await User.findById(req.user._id);
    const userCurrent = await User.findOne({username: req.user.username})
    console.log(userCurrent)
    const newJournal=new Journal({title,dream,meaning,public,date,userId:userCurrent});
    //userCurrent.journal.push(newJournal);
    console.log(newJournal)
    await newJournal.save();
    // await userCurrent.save();
    handleSuccessResponse(res, "Dreams saved successfully", newJournal)
    console.log("DONE");}
    catch(err){
        handleErrorResponse(res,err)
    }
}

const showDreams = async(req,res)=>{
    // try{
    // let userCurrent=await User.findById(req.user._id).populate("journal");
    // if(userCurrent.journal){
    //     handleSuccessResponse(res, "Dreams sent successfully", userCurrent.journal)
    // }
    // else{
    //     handleErrorResponse(res, { message: "User doesnt have any journals", statusCode: 401 });
    // }}
    // catch(err){
    //     handleErrorResponse(res, err)
    // }
    try{
        const owner = await User.findOne({username: req.user.username})
        const journals = await Journal.find({userId: owner._id})
        console.log("inside write dreams:",journals)
        handleSuccessResponse(res, "Dreams sent successfully", journals)
    }
    catch(err){
        handleErrorResponse(res, err)
    }
}

const deleteDream = async(req,res)=>{
    try{
    let {id}=req.params;
    //await User.findByIdAndUpdate(req.user._id,{$pull:{journal:id}});
    await Public.deleteOne({journalinfo:id})
    await Journal.findByIdAndDelete(id);
    handleSuccessResponse(res, "Dream deleted", {})
    }
    catch(err){
        handleErrorResponse(res, err)
    }
}

const makePublicDream = async(req,res)=>{
    try{
    let {id}=req.params;
    console.log("Dream id", id)
    console.log("User:",req.user)
    const user = await User.findOne({username: req.user.username})
    let newJournal= await Journal.findById(id);
    const newPublic= new Public({userinfo:user,journalinfo:newJournal});
    await newPublic.save();
    await Journal.findByIdAndUpdate(id, {public:true})
    handleSuccessResponse(res, "Dream made public", newPublic)
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

const deletePublicDream = async(req,res)=>{
    try{
    let {id}=req.params;
    await Public.deleteOne({journalinfo:id});
    await Journal.findByIdAndUpdate(id, {public:false})
    handleSuccessResponse(res, "Dream deleted from public", {})
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

const showPublicDreams = async(req,res)=>{
    try{
    let allPublicDreams=await Public.find({}).populate("userinfo").populate("journalinfo");
    if (allPublicDreams){
        handleSuccessResponse(res, "Public dreams sent", allPublicDreams)
    }
    else{
        handleErrorResponse(res, { message: "No public dreams found", statusCode: 401 })
    }}
    catch(err){
        handleErrorResponse(res,err)
    }
}

const showUserPublicDreams = async(req,res)=>{
    try{
    const user = await User.findOne({username: req.user.username})
    let allPublicDreams = await Public.find({ 'userinfo': user._id }).populate("journalinfo");
    if (allPublicDreams){
        handleSuccessResponse(res, "Public dreams sent", allPublicDreams)
    }
    else{
        handleErrorResponse(res, { message: "No public dreams found", statusCode: 401 })
    }}
    catch(err){
        handleErrorResponse(res,err)
    }
}

const likeDream = async(req,res)=>{
    try{
    let {id}=req.params;
    let dream=await Journal.findById(id);
    if(dream.like===0 && dream.dislike===0){
        await Journal.findByIdAndUpdate(id,{like:1});
        let data=await Analytic.find();
        let like=data[0].Likes;
        like++;
        let idOfAnalytic=data[0]._id;
        await Analytic.findByIdAndUpdate(idOfAnalytic,{Likes:like});
    }
    else if(dream.like===0 && dream.dislike!==0){
        await Journal.findByIdAndUpdate(id,{like:1,dislike:0});
        let data=await Analytic.find();
        let like=data[0].Likes;
        let dislike=data[0].Dislikes;
        like++;
        dislike--;
        if(dislike<=0){
            dislike=0;
        }
        let idOfAnalytic=data[0]._id;
        await Analytic.findByIdAndUpdate(idOfAnalytic,{Likes:like,Dislikes:dislike});
    }
    handleSuccessResponse(res, "Dream liked", data)
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

const dislikeDream = async(req,res)=>{
    try{
    let {id}=req.params;
    let dream=await Journal.findById(id);
    if(dream.dislike===0 && dream.like===0){
        await Journal.findByIdAndUpdate(id,{dislike:1});
        let data=await Analytic.find();
        let dislike=data[0].Dislikes;
        dislike++;
        let idOfAnalytic=data[0]._id;
        await Analytic.findByIdAndUpdate(idOfAnalytic,{Dislikes:dislike});
    }
    else if(dream.dislike===0 && dream.like!==0){
        await Journal.findByIdAndUpdate(id,{dislike:1,like:0});
        let data=await Analytic.find();
        let like=data[0].Likes;
        let dislike=data[0].Dislikes;
        dislike++;
        like--;
        if(like<=0)
            {
                like=0;
            }
        let idOfAnalytic=data[0]._id;
        await Analytic.findByIdAndUpdate(idOfAnalytic,{Dislikes:dislike,Likes:like});
    }
    handleSuccessResponse(res, "Dream disliked", data)
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

module.exports ={
    getDreams,
    writeDream,
    showDreams,
    deleteDream,
    makePublicDream,
    showUserPublicDreams,
    showPublicDreams,
    likeDream,
    dislikeDream,
    deletePublicDream
}