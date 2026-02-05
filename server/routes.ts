import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import { setupAuth, isAuthenticated, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Setup Auth first
  await setupAuth(app);
  registerAuthRoutes(app);

  // --- Profiles ---
  app.get(api.profiles.get.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    let profile = await storage.getProfile(userId);
    
    if (!profile) {
      // Create default profile if not exists
      // Generate a mock Chinese Address ID
      const chineseAddressId = `CN-WAREHOUSE-${userId.substring(0, 6).toUpperCase()}-001`;
      profile = await storage.createProfile({
        userId,
        trustScore: 50,
        codLimit: 15000,
        chineseAddress: `No. 888, Logistic Park, Baiyun District, Guangzhou, ID: ${chineseAddressId}`,
        isKycVerified: false
      });
    }
    
    res.json(profile);
  });

  app.patch(api.profiles.update.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    try {
      const updates = api.profiles.update.input.parse(req.body);
      const updatedProfile = await storage.updateProfile(userId, updates);
      res.json(updatedProfile);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", details: err.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.profiles.uploadKyc.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const { aadhaarUrl } = req.body;
    // Simulate KYC verification process
    const updatedProfile = await storage.updateProfile(userId, {
      aadhaarUrl,
      isKycVerified: true // Auto-verify for simulation
    });
    res.json(updatedProfile);
  });

  // --- Parcels ---
  app.get(api.parcels.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const parcels = await storage.getParcels(userId);
    res.json(parcels);
  });

  app.post(api.parcels.create.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    try {
      const input = api.parcels.create.input.parse(req.body);
      
      // Simulate checking if tracking exists (could be a real check)
      const parcel = await storage.createParcel({
        ...input,
        userId,
        status: "registered",
        codAmount: 0,
        isVoiceVerified: false,
        images: []
      });
      res.status(201).json(parcel);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.parcels.get.path, isAuthenticated, async (req: any, res) => {
    const id = Number(req.params.id);
    const parcel = await storage.getParcel(id);
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    if (parcel.userId !== req.user.claims.sub) return res.status(401).json({ message: "Unauthorized" });
    res.json(parcel);
  });

  // Initiate Voice Verification (Simulated)
  app.post(api.parcels.initiateVoiceVerification.path, isAuthenticated, async (req: any, res) => {
    const id = Number(req.params.id);
    const userId = req.user.claims.sub;
    
    // Log SIP Call
    await storage.logSipCall({
      userId,
      type: "verification",
      status: "completed",
      duration: 45,
      recordingUrl: "/recordings/simulated.mp3"
    });

    // Update parcel status
    await storage.updateParcel(id, { isVoiceVerified: true, status: "ready_to_ship" });

    res.json({ success: true, message: "Voice verification completed successfully." });
  });

  // --- Ticker ---
  app.get(api.ticker.get.path, (req, res) => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Simple deterministic random based on date
    const yuanRate = (11.5 + (seed % 100) / 100).toFixed(2);
    
    // Next flight date (e.g., every 3 days)
    const flightDate = new Date(today);
    flightDate.setDate(today.getDate() + (3 - (today.getDate() % 3)));
    
    res.json({
      yuanRate: parseFloat(yuanRate),
      nextFlightDate: flightDate.toLocaleDateString('ru-RU'),
    });
  });

  // --- Calculator ---
  app.post(api.calculator.calculate.path, (req, res) => {
    const { weight } = req.body;
    const ratePerKgUsd = 15;
    const usdToInr = 83; // Example conversion
    
    const costUsd = weight * ratePerKgUsd;
    const totalInr = costUsd * usdToInr;

    res.json({
      freight: Math.round(totalInr),
      customs: 0,
      commission: 0,
      total: Math.round(totalInr)
    });
  });

  // --- Admin Dashboard (Simulated) ---
  app.get(api.admin.dashboard.path, isAuthenticated, (req, res) => {
    // In real app, check for admin role
    res.json({
      totalParcels: 1250,
      pendingVerification: 45,
      revenue: 540000
    });
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const stores = await storage.getStores();
  if (stores.length === 0) {
    await storage.createStore({ name: "FashionTrend (Taobao)", category: "Clothing", url: "https://taobao.com/store1", description: "Best trending fashion" });
    await storage.createStore({ name: "TechGadgets (1688)", category: "Electronics", url: "https://1688.com/store2", description: "Wholesale electronics" });
    await storage.createStore({ name: "KidsZone", category: "Kids", url: "https://taobao.com/store3", description: "Toys and kids wear" });
    await storage.createStore({ name: "HomeDecor", category: "Home", url: "https://taobao.com/store4", description: "Modern home accessories" });
  }
}
