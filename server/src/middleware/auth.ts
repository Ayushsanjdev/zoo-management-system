import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, User, UserRole } from "../types";
import { AppError } from "../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Generate JWT token
 */
export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from request headers
 */
function extractToken(req: Request): string | null {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

/**
 * Rate limiting middleware
 */
export function rateLimit(
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  maxRequests: number = 100
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < windowStart) {
        rateLimitStore.delete(key);
      }
    }

    const clientData = rateLimitStore.get(clientId);
    
    if (!clientData || clientData.resetTime < windowStart) {
      rateLimitStore.set(clientId, { count: 1, resetTime: now });
    } else if (clientData.count >= maxRequests) {
      return next(
        new AppError(429, "Too many requests", [
          { field: "rate_limit", message: "Rate limit exceeded" },
        ])
      );
    } else {
      clientData.count++;
    }

    next();
  };
}

/**
 * Authentication middleware
 */
export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = extractToken(req);

    if (!token) {
      return next(
        new AppError(401, "Authentication failed", [
          { field: "auth", message: "Access token required" },
        ])
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return next(
        new AppError(401, "Authentication failed", [
          { field: "auth", message: "Invalid or expired token" },
        ])
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new AppError(401, "Authentication failed", [
        { field: "auth", message: "Token verification failed" },
      ])
    );
  }
}

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = extractToken(req);
  if (token) {
    const user = verifyToken(token);
    if (user) {
      req.user = user;
    }
  }
  next();
}

/**
 * Role-based authorization middleware
 */
export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;

    if (!user) {
      return next(
        new AppError(401, "Unauthorized", [
          { field: "auth", message: "Authentication required" },
        ])
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return next(
        new AppError(403, "Access denied", [
          { field: "auth", message: `Required roles: ${allowedRoles.join(", ")}` },
        ])
      );
    }

    next();
  };
}

/**
 * Admin authorization middleware
 */
export const authorizeAdmin = authorizeRoles("ADMIN");

/**
 * Staff authorization middleware
 */
export const authorizeStaff = authorizeRoles("ADMIN", "STAFF");

/**
 * Vet authorization middleware
 */
export const authorizeVet = authorizeRoles("ADMIN", "VET");

/**
 * Resource ownership middleware
 */
export function authorizeResourceOwner(
  resourceUserIdField: string = "userId"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;
    const resourceUserId = (req.params as any)[resourceUserIdField] || 
                          (req.body as any)[resourceUserIdField];

    if (!user) {
      return next(
        new AppError(401, "Unauthorized", [
          { field: "auth", message: "Authentication required" },
        ])
      );
    }

    // Admin can access any resource
    if (user.role === "ADMIN") {
      return next();
    }

    // Users can only access their own resources
    if (user.id !== resourceUserId) {
      return next(
        new AppError(403, "Access denied", [
          { field: "auth", message: "You can only access your own resources" },
        ])
      );
    }

    next();
  };
}

/**
 * API key authentication middleware
 */
export function authenticateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"] as string;
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    return next(
      new AppError(500, "Server configuration error", [
        { field: "auth", message: "API key not configured" },
      ])
    );
  }

  if (!apiKey || apiKey !== validApiKey) {
    return next(
      new AppError(401, "Authentication failed", [
        { field: "auth", message: "Invalid API key" },
      ])
    );
  }

  next();
}

/**
 * CORS middleware for API security
 */
export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-Key");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
}

/**
 * Security headers middleware
 */
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.header("Content-Security-Policy", "default-src 'self'");
  
  next();
}
