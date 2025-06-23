import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const authMiddleware = (req : Request,res:Response,next : NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(403).json({
            msg : "invalid token or input!"
        })
    }
    //@ts-ignore
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token,ENV.JWT_SECRET)
        //@ts-ignore
        if (decode.userId) {
            //@ts-ignore
            req.userId = decode.userId
            next()
        }else{
            res.status(403).json({
                msg : "Error"
            })
        }
    } catch (error) {
        res.status(403).json({
            msg : "Error while decoding token"
        })
        
    }
}