import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.headers.authorization?.split(" ")[1]; //split(" ") converts the the string into array and [1] takes the first index of an array
    if(!token){
        const error = new Error("Token missing")
        return next(error)

    }
    try {
         jwt.verify(token,process.env.SECRET_KEY as string)
        
        next();
        
    } catch (error) {
        return res.status(401).json({message:"unauthorized", status:403})
        // next(error)
        
    }
}