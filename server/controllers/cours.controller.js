import {Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {deleteMediaFromCloudinary, uploadMedia,} from "../utils/cloudinary.js";
 
export const createCourse = async(req,res)=> {
         try {
            const {courseTitle,category} = req.body;
            console.log(courseTitle,category)
            if(!courseTitle || !category){
                return res.status(400).json({
                    message:"Course title and is category required."
                })
            };

            const course = await Course.create({
                courseTitle,
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
};

export const getAllCreatorCourses = async(req,res) => {
          try {
            const userId = req.id;
            const courses = await Course.find({creator:userId}).sort({updatedAt: -1});
            console.log(courses)
            if(!courses){
                return res.status(404).json({
                    courses:[],
                    message:"Course not found."
                });
            }

            return res.status(200).json({
                courses,
            })
          } catch (error) {
            console.log(error)
            return res.status(500).json({
                message:"Failed course."
            })
          }
};

export const editCourse = async(req,res) => {
      try {
        const courseId = req.params.courseId;
        const {courseTitle,subTitle,description,category,courseLevel,coursePrice} = req.body;
        const thumbnail = req.file;
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
              message:"Course not found!"

            })
        };

        let courseThumbnail;
        if(thumbnail){
            if(course.courseThubtnail){
                const publicId = course.courseThubtnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image;
            };
            // upload thubmnail on cloudinary
            courseThumbnail = await uploadMedia(thumbnail.path);
        };
   
         console.log("this is clourse Thumbnail => ",courseThumbnail)

        const updateData = {courseTitle,subTitle,description,category,courseLevel,coursePrice,courseThumbnail:courseThumbnail?.secure_url};
        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});
        
        return res.status(200).json({
            course,
            message:'Course updated successfully.'
        })

      } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to update."
        })   
      }
};

export const getCourseById = async(req,res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            });
        };

        return res.status(200).json({
            course,
        })

    } catch (error) {
        return res.status(500).json({
            message:"Failed to get course by id."
        })
    }
};

export const createLecture = async(req,res) => {
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;
        if(!lectureTitle,!courseId){
            return res.status(400).json({
                message:"Lecture title is required."
            })
        };

    //    create lecture 
    const lecture = await Lecture.create({lectureTitle});
    const course = await Course.findById(courseId);
    
    if(course){
        course.lectures.push(lecture._id);
        await course.save();
    };

    return res.status(201).json({
        lecture,
        message:"Lecture created successfully."

    })

    } catch (error) {
        return res.status(500).json({
            message:"Failed to create lecture."
        })
    }
};

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params;
        if(!courseId){
            return res.status(400).json({
                message:"Course "
            })
        }
        const course = await Course.findById(courseId).populate("lectures")

        if(!course){
            return res.status(404).json({
                message:"Course not found."
            })
        };
        return res.status(200).json({
            lectures:course.lectures
        });
    } catch (error) {  
        // console.log(error)
    }
}