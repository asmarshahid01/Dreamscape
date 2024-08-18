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
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        }
    }
);

const Journal=mongoose.model("Journal",journalSchema);
module.exports=Journal;