const mongoose=require("mongoose");
const Journal=require("./journal.js");
const User=require("./user.js");

const publicDreamSchema=new mongoose.Schema(
    {
        userinfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        journalinfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Journal"
        },
        comments:[
            {
                comment:String,
                commentedBy:String,
            }
        ]
    }
);

const Public=mongoose.model("Public",publicDreamSchema);
module.exports=Public;