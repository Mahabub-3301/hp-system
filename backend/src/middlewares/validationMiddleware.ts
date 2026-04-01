import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


const JWT_SECRET = "supersecretkey";

// Utility: check if email is valid
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Middleware for registration
export function validateRegister(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Name, email, password, and role are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  if (!["teacher", "student"].includes(role)) {
    return res.status(400).json({ error: "Role must be either 'teacher' or 'student'." });
  }

  next();
}

// Middleware for login
export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  next();
}

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      // Attach user info to request
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}