// src/utils/passwordUtils.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt hashing

/**
 * Hashes a plain text password using bcrypt.
 * @param password Plain text password to hash.
 * @returns Promise resolving to hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

/**
 * Compares a plain text password with a hashed password to verify.
 * @param password Plain text password to compare.
 * @param hashedPassword Hashed password stored in the database.
 * @returns Promise resolving to a boolean indicating if the password matches.
 */
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
