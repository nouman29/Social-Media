import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Express Request interface to include user property
declare module "express" {
  interface Request {
    user?: any; // You can define a better type for `user` if needed
  }
}

// Authentication middleware to verify JWT token from cookies
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // Strip 'Bearer ' prefix if present
  const token = req.cookies?.token?.replace(/^Bearer\s+/, '');
  console.log('Cookies:', req.cookies);
  console.log('Token:', token);
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
    // Attach decoded user information to request object
    req.user = user;
    next();
  });
};

export default checkAuth;
