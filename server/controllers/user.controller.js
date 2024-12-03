import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genrateToken } from "../utils/genrateToken.js";

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