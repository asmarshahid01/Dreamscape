const mongoose=require("mongoose");
const Journal=require("./journal.js");
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new mongoose.Schema(
    {
        gender:{
            type:String,
            required:true
        },
        journal:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Journal"
            }
        ]
    }
);
userSchema.plugin(passportLocalMongoose)
const User=mongoose.model("User",userSchema);
module.exports=User;