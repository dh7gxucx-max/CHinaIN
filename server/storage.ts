// In-memory storage (no database)
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Profile {
  id: number;
  userId: string;
  trustScore: number;
  codLimit: number;
  phoneNumber?: string;
  indianAddress?: string;
  chineseAddress?: string;
}

export interface Parcel {
  id: number;
  userId: string;
  trackingNumber: string;
  description?: string;
  weight?: string;
  status: string;
  codAmount: number;
  createdAt: Date;
}

export interface Store {
  id: number;
  name: string;
  location: string;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: Omit<Profile, 'id'>): Promise<Profile>;
  updateProfile(userId: string, profile: Partial<Profile>): Promise<Profile>;
  getParcels(userId: string): Promise<Parcel[]>;
  getParcel(id: number): Promise<Parcel | undefined>;
  createParcel(parcel: Omit<Parcel, 'id'>): Promise<Parcel>;
  updateParcel(id: number, parcel: Partial<Parcel>): Promise<Parcel>;
  getStores(): Promise<Store[]>;
  createStore(store: Omit<Store, 'id'>): Promise<Store>;
}

// In-memory storage implementation
class InMemoryStorage implements IStorage {
  private users = new Map<string, User>();
  private profiles = new Map<string, Profile>();
  private parcels: Parcel[] = [];
  private stores: Store[] = [];
  private nextId = 1;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    return this.profiles.get(userId);
  }

  async createProfile(profile: Omit<Profile, 'id'>): Promise<Profile> {
    const newProfile = { ...profile, id: this.nextId++ };
    this.profiles.set(profile.userId, newProfile);
    return newProfile;
  }

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const existing = this.profiles.get(userId);
    if (!existing) {
      throw new Error('Profile not found');
    }
    const updated = { ...existing, ...updates };
    this.profiles.set(userId, updated);
    return updated;
  }

  async getParcels(userId: string): Promise<Parcel[]> {
    return this.parcels.filter(p => p.userId === userId);
  }

  async getParcel(id: number): Promise<Parcel | undefined> {
    return this.parcels.find(p => p.id === id);
  }

  async createParcel(parcel: Omit<Parcel, 'id'>): Promise<Parcel> {
    const newParcel = { ...parcel, id: this.nextId++ };
    this.parcels.push(newParcel);
    return newParcel;
  }

  async updateParcel(id: number, updates: Partial<Parcel>): Promise<Parcel> {
    const index = this.parcels.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Parcel not found');
    }
    this.parcels[index] = { ...this.parcels[index], ...updates };
    return this.parcels[index];
  }

  async getStores(): Promise<Store[]> {
    // Return some mock stores
    if (this.stores.length === 0) {
      this.stores = [
        { id: 1, name: 'Guangzhou Warehouse', location: 'Guangzhou, China' },
        { id: 2, name: 'Shenzhen Warehouse', location: 'Shenzhen, China' },
        { id: 3, name: 'Mumbai Hub', location: 'Mumbai, India' },
      ];
    }
    return this.stores;
  }

  async createStore(store: Omit<Store, 'id'>): Promise<Store> {
    const newStore = { ...store, id: this.nextId++ };
    this.stores.push(newStore);
    return newStore;
  }
}

export const storage = new InMemoryStorage();
