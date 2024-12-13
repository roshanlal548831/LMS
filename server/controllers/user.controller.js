import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genrateToken } from "../utils/genrateToken.js";
import  { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        console.log(name,email,password)

        if(!name || !email || !password){
             return res.status(400).json({
                success:false,
                message: "All fields are require"
             })
        };
        const userFind = await User.findOne({email});
        console.log(userFind)
        if(userFind){
            return res.status(400).json({
                success:false,
                message:"User already with this email."
            });
        }
        const hashPassword = await bcrypt.hash(password,10);

         const user =  await User.create({
            name,
            email,
            password:hashPassword
        });
        console.log("this is data => ",user)

        return res.status(201).json({
            success:true,
            message:`welcome back ${user.name}.`,
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Fieled to register."
        })
    }
};

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;
         if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "All fields are require"
             });
         };
         const user = await User.findOne({email});
         if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password."
            });
         };

         const isMatch = await bcrypt.compare(password,user.password);
         
         if(!isMatch){
             return res.status(400).json({
                 success:false,
                 message:"Incorrect email or password."
                });
            };
            
            genrateToken(res,user,`welcome back ${user.name}`);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Fieled to register."
        })
        
    }
}

export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
        } catch (error) {

         console.log(error)
        return res.status(500).json({
            success:false,
            message:"Fieled to logout."
        })
        
    }
}

export const getUserProfile = async(req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User not found.",
                success:false
            })
        }
       return res.status(200).json({
        success:true,
        user
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Fieled to load user."
        })
    }
};

export const editProfile = async(req,res) => {
    try {
        const {name} = req.body
        const profilePhoto = req.file;
        
        const userId = req.id
        
        const user = await User.findById(userId);
        if(!user){
          return res.status(404).json({
              message:"User not found.",
              success:false
            })
        };
        
        // extract public id of the old image the url is exist;
        
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0] // extract public id
            deleteMediaFromCloudinary(publicId)
        };
        // upload new photot
        
        const cloudResponse =await uploadMedia(profilePhoto.path);
        const phototUrl = cloudResponse.secure_url;

        console.log("this is profile photo",phototUrl)

     const uploadData = {name,phototUrl}

    const updatedUser = await User.findByIdAndUpdate(userId,{name:uploadData.name,photoUrl:uploadData.phototUrl},{new:true}).select("-password");
    console.log("updated Data ",updatedUser)

    return res.status(200).json({
        message:"Profile updated successfully.",
        user: updatedUser,
        success:true
    })

    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            success:false,
            message:"Fieled to update profile ."
        })
    }
}