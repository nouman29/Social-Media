import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

declare module "express" {
    interface Request {
      user?: any; 
    }
  }

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    });
}

export default checkAuth;