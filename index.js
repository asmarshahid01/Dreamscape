const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const User=require("./models/user.js");
const Analytic=require("./models/analytics.js");
const passport=require("passport");
const session=require("express-session");
const localStrategy=require("passport-local");
const cookieParser=require("cookie-parser");
const Journal=require("./models/journal.js");
const Public =require("./models/publicDreams.js");
const Notify=require("./models/notification.js");
const {isLoggedIn}=require("./middleware.js");
const flash=require("connect-flash");
const ExpressError=require("./utils/ExpressError.js");
const app=express();
const port=8080;

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
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then((res)=>{
    console.log("DB CONNECTED");
}).catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Dreams");
}



app.post("/api/signup",async(req,res)=>{
    let {username,password,genderSelected}=req.body;
    let gender;
    if (genderSelected===1){
        gender="male";
    }
    else{
        gender="female";
    }
    const newUser=new User(
        {
            username:username,
            gender:gender
        }
    );
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return res.json("error");
        }
        return res.json("success");
    })
});

app.get("/api/dreams",isLoggedIn,(req,res)=>{
    if (req.isAuthenticated()){
    let {username,gender}=req.user;
    res.json({username,gender});
    }
    else{
        console.log("ERROR");
        res.json("error");
    }
});


app.post("/api/dreams",async(req,res)=>{
    let {title,dream,meaning,public,date}=req.body;
    let userCurrent=await User.findById(req.user._id);
    let newJournal=new Journal({title,dream,meaning,public,date});
    userCurrent.journal.push(newJournal);

    await newJournal.save();
    await userCurrent.save();

    console.log("DONE");
    res.json("success");
});

app.get("/api/showdreams",isLoggedIn,async(req,res)=>{
    let userCurrent=await User.findById(req.user._id).populate("journal");
    if(userCurrent.journal){
        res.json(userCurrent.journal)
    }
    else{
        res.json("error")
    }

})

app.post("/api/login",passport.authenticate("local"),(req,res)=>{
    if(req.body.username==="admin1")
        {
            res.json("adminsuccess")
        }
    else{
    res.json("success");
    }
})


app.delete("/api/dreams/:id",async(req,res)=>{
    let {id}=req.params;
    await User.findByIdAndUpdate(req.user._id,{$pull:{journal:id}});
    await Journal.findByIdAndDelete(id);
    res.json("success");
})


app.put("/api/dreams/:id/like",async(req,res)=>{
    let {id}=req.params;
    let dream=await Journal.findById(id);
    if(dream.like===0 && dream.dislike===0){
        await Journal.findByIdAndUpdate(id,{like:1});
        let data=await Analytic.find();
        console.log(data);
        let like=data[0].Likes;
        like++;
        let idOfAnalytic=data[0]._id;
        await Analytic.findByIdAndUpdate(idOfAnalytic,{Likes:like});
        res.json("success");
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
        res.json("success");
    }
})

app.put("/api/dreams/dislike",async(req,res)=>{
    let {id}=req.params;
    let dream=await Journal.findById(id);
    if(dream.dislike===0 && dream.like===0){
        await Journal.findByIdAndUpdate(id,{dislike:1});
        let data=await Analytic.find();
        let dislike=data[0].Dislikes;
        dislike++;
        let idOfAnalytic=data[0]._id;
        await Analytic.findByIdAndUpdate(idOfAnalytic,{Dislikes:dislike});
        res.json("success");
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
        res.json("success");
    }
})


app.post("/api/public/:id",async(req,res)=>{
    let {id}=req.params;
    let newUser=await User.findById(req.user._id);
    let newJournal= await Journal.findById(id);
    let newPublic=await new Public({userinfo:newUser,journalinfo:newJournal});
    await newPublic.save();
    res.json("success");
})


app.get("/api/showpublic",async(req,res)=>{
    let allPublicDreams=await Public.find({}).populate("userinfo").populate("journalinfo");
    if (allPublicDreams){
        res.json(allPublicDreams);
    }
    else{
        res.json("error");
    }

});

app.get("/api/showpublicuser",async(req,res)=>{
    let allPublicDreams = await Public.find({ 'userinfo': req.user._id }).populate("journalinfo");
    if (allPublicDreams){
        res.json(allPublicDreams);
    }
    else{
        res.json("error");
    }

});


app.post("/api/comment",async(req,res)=>{
    console.log("API HIT");
    
    let {username,userComment,id}=req.body;
    let userId=await User.findOne({username:username});
    let journalId=await Journal.findById(id);
    // let updatedone=await Public.findOneAndUpdate({"userinfo":userId},{$push:{comments:{comment:userComment,commentedBy:req.user.username}}},{new:true}).populate("journalinfo");
    let updatedone=await Public.findOneAndUpdate({"journalinfo":journalId},{$push:{comments:{comment:userComment,commentedBy:req.user.username}}},{new:true});
    console.log(updatedone);
    let allPublicDreams = await Public.find({ 'userinfo': userId }).populate("journalinfo");
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
    res.json("success");
})


app.get("/api/notification",async(req,res)=>{
    let notification=await Notify.find({username:req.user._id});
    console.log(notification);
    res.json(notification);
})

app.get("/api/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
        res.json("error");
        }
        else{
            res.json("success");
        }
    });
    
});

app.all("*",(err,req,res,next)=>{
    console.log("INSIDE ERROR OF UNKNOWn");
    next(new ExpressError(404,"Page Not Found!"));
})


app.use((err,req,res,next)=>{
    
    let {status=500,message="Something Went Wrong"}=err;
    res.status(status).json({message:message});
})

app.listen(port,()=>{
    console.log("SERVER IS ON!");
})