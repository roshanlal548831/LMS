import mongoose, { Schema } from "mongoose";

const coursSchema = new Schema({
    courseTitle:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
        
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enim:["Beginner","Medium","Advance"]
    },
    coursePrice:{
        type:Number,
        
    },
    courseThubtnail:{
        type:Number,
        
    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPublist:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const Course = mongoose.model("Cours",coursSchema);