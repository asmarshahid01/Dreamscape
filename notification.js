const mongoose=require("mongoose");
const User=require("./user.js");


const notifySchema=mongoose.Schema(
    {
        title:{
            type:String
        },
        commentBy:{
            type:String
        },
        createdAt:{
            type:String
        },
        username:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
);


const Notify=mongoose.model("Notify",notifySchema);
module.exports=Notify;