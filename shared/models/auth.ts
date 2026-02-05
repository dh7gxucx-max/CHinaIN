// Auth user types (no database)
export interface User {
  id: string;
  email: string;
  name: string;
  profilePictureUrl?: string;
  updatedAt?: Date;
}

export type UpsertUser = Omit<User, 'updatedAt'>;
