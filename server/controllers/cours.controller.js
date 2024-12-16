import {Course } from "../models/course.model.js";

export const createCourse = async(req,res)=> {
         try {
            const {coursTitle,category} = req.body;
            if(!coursTitle || !category){
                return res.status(400).json({
                    message:"Course title and is required."
                })
            };

            const course = await Course.create({
                coursTitle,
                category,
                creator:req.id
            })

             return res.status(201).json({
                course,
                message:"Course created."
             });

         } catch (error) {
            console.log(error)
            return res.status(500).json({
                message:"Failed to create course"
            })
            
         }
}