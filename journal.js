const mongoose=require("mongoose");

const journalSchema=new mongoose.Schema(
    {
        title:{
            type:String
,       },
        dream:{
            type:String,
        },
        meaning:{
            type:String
        },
        public:{
            type:Boolean
        },
        date:{
            type:String
        },
        like:{
            type:Number,
            default:0
        },
        dislike:{
            type:Number,
            default:0
        }
    }
);

const Journal=mongoose.model("Journal",journalSchema);
module.exports=Journal;