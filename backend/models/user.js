const mongoose=require("mongoose");
const Journal=require("./journal.js");
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        time:{
            type:Number,
            default:0
        },
        password:{
            type: String,
            required: true
        }   
    }
);
const User=mongoose.model("User",userSchema);
module.exports=User;