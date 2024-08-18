require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const User=require("./models/user.js");
//const passport=require("passport");
const session=require("express-session");
//const localStrategy=require("passport-local");
const cookieParser=require("cookie-parser");
const ExpressError=require("./utils/ExpressError.js");
const WrapAsync=require("./utils/WrapAsync.js");
const {isLoggedIn}=require("./middleware.js");
const app=express();
const port=8080;
const { userRoutes, dreamRoutes, adminRoutes } = require("./routes");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  };

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};


app.use(session(sessionOptions));

//app.use(passport.initialize());
//app.use(passport.session());
//passport.use(new localStrategy(User.authenticate()));

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());


connectDB().then((res)=>{
    console.log("DB CONNECTED");
}).catch((err)=>{
    console.log(err);
})


async function connectDB(){
    // await mongoose.connect("mongodb+srv://saadsohail:saadsohail@dreams.jb3s9gv.mongodb.net/")
    await mongoose.connect(process.env.MONGODB_URI)
}



// app.post("/api/user/signup",WrapAsync (async(req,res)=>{
//     let {username,password,genderSelected}=req.body;
//     let gender;
//     if (genderSelected===1){
//         gender="male";
//     }
//     else{
//         gender="female";
//     }
//     const newUser=new User(
//         {
//             username:username,
//             gender:gender
//         }
//     );
//     const registeredUser=await User.register(newUser,password);
//     req.login(registeredUser,(err)=>{
//         if(err){
//             req.session.loginTime=Date.now();
//             return res.json("error");
//         }
//         return res.json("success");
//     })
// }));

// app.get("/api/dreams",isLoggedIn,WrapAsync ((req,res)=>{
//     if (req.isAuthenticated()){
//     let {username,gender}=req.user;
//     res.json({username,gender});
//     }
//     else{
//         console.log("ERROR");
//         res.json("error");
//     }
// }));


// app.post("/api/dreams",isLoggedIn,WrapAsync (async(req,res)=>{
//     let {title,dream,meaning,public,date}=req.body;
//     let userCurrent=await User.findById(req.user._id);
//     let newJournal=new Journal({title,dream,meaning,public,date});
//     userCurrent.journal.push(newJournal);

//     await newJournal.save();
//     await userCurrent.save();

//     console.log("DONE");
//     res.json("success");
// }));

// app.get("/api/showdreams",isLoggedIn,WrapAsync (async(req,res)=>{
//     let userCurrent=await User.findById(req.user._id).populate("journal");
//     if(userCurrent.journal){
//         res.json(userCurrent.journal)
//     }
//     else{
//         res.json("error")
//     }

// }))

// app.post("/api/user/login",passport.authenticate("local"),WrapAsync ((req,res)=>{
//     if(req.body.username==="admin"){
//         req.session.loginTime=Date.now();
//         return res.json("admin")
//     }
//     req.session.loginTime=Date.now();
//     res.json("success");
// }))

// app.delete("/api/dreams/:id",WrapAsync (async(req,res)=>{
//     let {id}=req.params;
//     await User.findByIdAndUpdate(req.user._id,{$pull:{journal:id}});
//     let publicCheck=await Public.find({journalinfo:id});
//     if(publicCheck.length!==0)
//         {
//             await Public.deleteOne({journalinfo:id})
//         }
//     await Journal.findByIdAndDelete(id);
//     res.json("success");
// }))


// app.post("/api/public/:id",WrapAsync (async(req,res)=>{
//     let {id}=req.params;
//     let newUser=await User.findById(req.user._id);
//     let newJournal= await Journal.findById(id);
//     let newPublic=await new Public({userinfo:newUser,journalinfo:newJournal});
//     await newPublic.save();
//     await Journal.findByIdAndUpdate(id, {public:true})
//     res.json("dream made public");
// }))

// app.delete("/api/public/:id",WrapAsync (async(req,res)=>{
//     let {id}=req.params;
//     await Public.deleteOne({journalinfo:id});
//     await Journal.findByIdAndUpdate(id, {public:false})
//     res.json("success");
// }))

// app.get("/api/showpublic",WrapAsync (async(req,res)=>{
//     let allPublicDreams=await Public.find({}).populate("userinfo").populate("journalinfo");
//     if (allPublicDreams){
//         res.json(allPublicDreams);
//     }
//     else{
//         res.json("error");
//     }

// }));

// app.get("/api/showpublicuser",WrapAsync (async(req,res)=>{
//     let allPublicDreams = await Public.find({ 'userinfo': req.user._id }).populate("journalinfo");
//     if (allPublicDreams){
//         res.json(allPublicDreams);
//     }
//     else{
//         res.json("error");
//     }

// }));


// app.post("/api/user/comment",WrapAsync (async(req,res)=>{
//     console.log("API HIT");
    
//     let {username,userComment,id}=req.body;
//     let userId=await User.findOne({username:username});
//     let journalId=await Journal.findById(id);
//     // let updatedone=await Public.findOneAndUpdate({"userinfo":userId},{$push:{comments:{comment:userComment,commentedBy:req.user.username}}},{new:true}).populate("journalinfo");
//     let updatedone=await Public.findOneAndUpdate({"journalinfo":journalId},{$push:{comments:{comment:userComment,commentedBy:req.user.username}}},{new:true});
//     console.log(updatedone);
//     let allPublicDreams = await Public.find({ 'userinfo': userId }).populate("journalinfo");
//     const currentDate = new Date();
//     const month = currentDate.getMonth() + 1;
//     const year = currentDate.getFullYear();
//     console.log(allPublicDreams);
//     let newNotification=new Notify(
//         {
//             title:allPublicDreams[0].journalinfo.title,
//             commentBy:req.user.username,
//             createdAt:currentDate.getDate() + ' / ' + month + ' / ' + year,
//             username:userId
//         }
//     );
//     await newNotification.save();
//     res.json("success");
// }))


// app.get("/api/user/notification",WrapAsync (async(req,res)=>{
//     let notification=await Notify.find({username:req.user._id});
//     console.log(notification);
//     res.json(notification);
// }))

// app.get("/api/user/logout",async(req,res)=>{
//     console.log("LOGUT API ");
//     let pastTime=req.session.loginTime;
//     let time=Date.now();
//     console.log(pastTime);
//     console.log(time);
//     let ms=time-pastTime;
//     let updateTime=await User.findByIdAndUpdate(req.user._id,{$inc:{time:ms}});
//     req.logOut((err)=>{
//         if(err){
//         res.json("error");
//         }
//         else{
//             res.json("success");
//         }
//     });
    
// });


// app.patch("/api/dreams/:id/like",WrapAsync (async(req,res)=>{
//     let {id}=req.params;
//     let dream=await Journal.findById(id);
//     if(dream.like===0 && dream.dislike===0){
//         await Journal.findByIdAndUpdate(id,{like:1});
//         let data=await Analytic.find();
//         let like=data[0].Likes;
//         like++;
//         let idOfAnalytic=data[0]._id;
//         await Analytic.findByIdAndUpdate(idOfAnalytic,{Likes:like});
//         res.json("success");
//     }
//     else if(dream.like===0 && dream.dislike!==0){
//         await Journal.findByIdAndUpdate(id,{like:1,dislike:0});
//         let data=await Analytic.find();
//         let like=data[0].Likes;
//         let dislike=data[0].Dislikes;
//         like++;
//         dislike--;
//         if(dislike<=0){
//             dislike=0;
//         }
//         let idOfAnalytic=data[0]._id;
//         await Analytic.findByIdAndUpdate(idOfAnalytic,{Likes:like,Dislikes:dislike});
//         res.json("success");
//     }
// }))

// app.patch("/api/dreams/:id/dislike",WrapAsync (async(req,res)=>{
//     let {id}=req.params;
//     let dream=await Journal.findById(id);
//     if(dream.dislike===0 && dream.like===0){
//         await Journal.findByIdAndUpdate(id,{dislike:1});
//         let data=await Analytic.find();
//         let dislike=data[0].Dislikes;
//         dislike++;
//         let idOfAnalytic=data[0]._id;
//         await Analytic.findByIdAndUpdate(idOfAnalytic,{Dislikes:dislike});
//         res.json("success");
//     }
//     else if(dream.dislike===0 && dream.like!==0){
//         await Journal.findByIdAndUpdate(id,{dislike:1,like:0});
//         let data=await Analytic.find();
//         let like=data[0].Likes;
//         let dislike=data[0].Dislikes;
//         dislike++;
//         like--;
//         if(like<=0)
//             {
//                 like=0;
//             }
//         let idOfAnalytic=data[0]._id;
//         await Analytic.findByIdAndUpdate(idOfAnalytic,{Dislikes:dislike,Likes:like});
//         res.json("success");
//     }
// }))

// app.get("/api/admin/analytics",WrapAsync (async(req,res)=>{
//     let response = await Analytic.find()
//     res.json(response[0])
// }))

// app.get("/api/admin/user",WrapAsync (async(req,res)=>{
//     let data=await User.find();
//     res.json(data);
// }))

app.use('/api/user', userRoutes)
app.use('/api/dreams', dreamRoutes)
app.use('/api/admin', adminRoutes)

app.all("*",(err,req,res,next)=>{
    console.log("INSIDE ERROR OF UNKNOWn");
    next(new ExpressError(404,"Page Not Found!"));
})


// app.use((err,req,res,next)=>{
//     console.log("INSIDE ERROR MIDDLEWARE");
//     let {status=500,message="Something Went Wrong"}=err;
//     res.status(status).json({message:message});
// })

app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
})

