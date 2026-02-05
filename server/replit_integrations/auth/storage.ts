// In-memory auth storage (no database)
export interface User {
  id: string;
  email: string;
  name: string;
  profilePictureUrl?: string;
  updatedAt?: Date;
}

export type UpsertUser = Omit<User, 'updatedAt'>;

// Interface for auth storage operations
export interface IAuthStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

class AuthStorage implements IAuthStorage {
  private users = new Map<string, User>();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      ...userData,
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }
}

export const authStorage = new AuthStorage();
