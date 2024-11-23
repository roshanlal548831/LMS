import jwt from "jsonwebtoken";

export const genrateToken = async(res,user,message) => {
    const token =  jwt.sign({userId:user._id},process.env.SECRET_KEY);
    return res.status(200).cookie("token",token,{httpOnly:true}).json({
        success:true,
        message,
        user
    })
}