import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import MemoryStore from "memorystore";
import { authStorage } from "./storage";

// Simple session setup without database
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const MemStore = MemoryStore(session);

  return session({
    secret: process.env.SESSION_SECRET || 'dev-secret-please-change',
    store: new MemStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

// Simplified auth setup without OAuth
export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  // Mock login endpoint (for development)
  app.get("/api/login", (req, res) => {
    // Create a mock user
    const mockUser = {
      id: "mock-user-id",
      email: "demo@example.com",
      name: "Demo User",
      profilePictureUrl: "",
    };

    // Store in session
    req.login(mockUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      // Store in memory
      authStorage.upsertUser(mockUser);
      res.redirect("/");
    });
  });

  app.get("/api/callback", (req, res) => {
    res.redirect("/");
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });
}

// Simplified authentication check
export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // For development, allow all requests
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};
