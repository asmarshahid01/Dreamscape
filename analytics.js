const mongoose=require("mongoose");

const analyticsSchema=new mongoose.Schema(
    {
        Likes:{
            type:Number,
            default:0
        },
        Dislikes:{
            type:Number,
            default:0
        }
    }
);

const Analytic=mongoose.model("Analytic",analyticsSchema);
module.exports=Analytic;