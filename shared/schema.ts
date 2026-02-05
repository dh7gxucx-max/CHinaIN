import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { users } from "./models/auth";

export * from "./models/auth";

// User Profile extension (linked to Auth User)
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id), // Link to auth user
  trustScore: integer("trust_score").default(50),
  codLimit: integer("cod_limit").default(15000),
  phoneNumber: text("phone_number"),
  indianAddress: text("indian_address"),
  chineseAddress: text("chinese_address"), // Unique ID for warehouse
  aadhaarUrl: text("aadhaar_url"),
  isKycVerified: boolean("is_kyc_verified").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
  parcels: many(parcels),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  parcels: many(parcels),
}));

// Parcels
export const parcels = pgTable("parcels", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  trackingNumber: text("tracking_number").notNull(),
  description: text("description"),
  weight: decimal("weight", { precision: 10, scale: 2 }), // kg
  status: text("status").notNull().default("registered"), // registered, received, weighing, checking, ready_to_ship, shipped, delivered
  codAmount: integer("cod_amount").default(0), // Calculated cost
  images: jsonb("images").$type<string[]>(), // Array of image URLs
  isVoiceVerified: boolean("is_voice_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const parcelsRelations = relations(parcels, ({ one }) => ({
  user: one(users, {
    fields: [parcels.userId],
    references: [users.id],
  }),
}));

// Stores Directory
export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Clothing, Electronics, Kids, etc.
  url: text("url").notNull(),
  imageUrl: text("image_url"),
  description: text("description"),
});

// SIP Calls Log
export const sipCalls = pgTable("sip_calls", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  type: text("type").notNull(), // verification, support
  status: text("status").notNull(), // completed, missed, failed
  duration: integer("duration"),
  recordingUrl: text("recording_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod Schemas
export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true, userId: true, updatedAt: true });
export const insertParcelSchema = createInsertSchema(parcels).omit({ id: true, userId: true, createdAt: true, updatedAt: true, status: true, codAmount: true, isVoiceVerified: true });
export const insertSipCallSchema = createInsertSchema(sipCalls).omit({ id: true, createdAt: true });

// Types
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Parcel = typeof parcels.$inferSelect;
export type InsertParcel = z.infer<typeof insertParcelSchema>;
export type SipCall = typeof sipCalls.$inferSelect;
