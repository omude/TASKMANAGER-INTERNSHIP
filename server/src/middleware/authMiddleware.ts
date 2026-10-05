import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/authRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

interface DecodedToken extends JwtPayload {
  id: string;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token: string | undefined;

  //Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      //Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        res.status(500).json({ message: "Server Configuration Error" });
        return;
      }

      //Verify token
      const decoded = jwt.verify(token, secret) as DecodedToken;

      //Get user from the token payload (without password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(404).json({ message: "User not Found" });
        return;
      }
      req.user = user;
      next();
      return;
    } catch (error) {
      res.status(401).json({ message: "Not Authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not Authorized, No token" });
    return;
  }
};
export default protect;
