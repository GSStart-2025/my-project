// lib/db.ts
interface User {
  email: string;
  password: string; // hashed
}

export const users: User[] = [];
