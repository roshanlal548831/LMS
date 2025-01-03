import jwt from "jsonwebtoken";

export const genrateToken = async(res,user,message) => {
    
    const token =  jwt.sign({userId:user._id},process.env.SECRET_KEY, {expiresIn: "1d"});

    return res.status(200).cookie("token",token,{
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    
    }).json({
        success:true,
        message,
        user
    })
}