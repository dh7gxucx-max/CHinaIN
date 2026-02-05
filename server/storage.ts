import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { 
  users, profiles, parcels, stores, sipCalls,
  type User, type InsertUser, type Profile, type InsertProfile,
  type Parcel, type InsertParcel, type Store, type InsertStore,
  type SipCall, type InsertSipCall
} from "@shared/schema";
import { authStorage } from "./replit_integrations/auth/storage";

export interface IStorage {
  // Auth users (delegated to authStorage but exposed here for convenience)
  getUser(id: string): Promise<User | undefined>;
  
  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, profile: Partial<InsertProfile>): Promise<Profile>;

  // Parcels
  getParcels(userId: string): Promise<Parcel[]>;
  getParcel(id: number): Promise<Parcel | undefined>;
  createParcel(parcel: InsertParcel): Promise<Parcel>;
  updateParcel(id: number, parcel: Partial<InsertParcel>): Promise<Parcel>;
  
  // Stores
  getStores(): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;

  // SIP Calls
  logSipCall(call: InsertSipCall): Promise<SipCall>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return authStorage.getUser(id);
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const [newProfile] = await db.insert(profiles).values(profile).returning();
    return newProfile;
  }

  async updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile> {
    const [updated] = await db
      .update(profiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(profiles.userId, userId))
      .returning();
    return updated;
  }

  async getParcels(userId: string): Promise<Parcel[]> {
    return db.select().from(parcels).where(eq(parcels.userId, userId)).orderBy(desc(parcels.createdAt));
  }

  async getParcel(id: number): Promise<Parcel | undefined> {
    const [parcel] = await db.select().from(parcels).where(eq(parcels.id, id));
    return parcel;
  }

  async createParcel(parcel: InsertParcel): Promise<Parcel> {
    const [newParcel] = await db.insert(parcels).values(parcel).returning();
    return newParcel;
  }

  async updateParcel(id: number, updates: Partial<InsertParcel>): Promise<Parcel> {
    const [updated] = await db
      .update(parcels)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(parcels.id, id))
      .returning();
    return updated;
  }

  async getStores(): Promise<Store[]> {
    return db.select().from(stores);
  }

  async createStore(store: InsertStore): Promise<Store> {
    const [newStore] = await db.insert(stores).values(store).returning();
    return newStore;
  }

  async logSipCall(call: InsertSipCall): Promise<SipCall> {
    const [newCall] = await db.insert(sipCalls).values(call).returning();
    return newCall;
  }
}

export const storage = new DatabaseStorage();
