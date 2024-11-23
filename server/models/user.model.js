import mongoose from "mongoose";

const userSchima = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
        enum:["instructor","student"],
        default:"student"
     },
     enrolledCourses:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Cours"
        }
     ],
     photoUrl:{
        type:String,
        default:""
     }
},{timestamps:true});

export const User = mongoose.model("User",userSchima)

