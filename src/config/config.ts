// src/config/config.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

class Config {
  public readonly PORT: number;
  public readonly MONGO_URI: string;

  constructor() {
    this.PORT = parseInt(process.env.PORT || '3000', 10);
    this.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/whoishere';
  }
}

// Export a singleton instance of the Config class
export const config = new Config();
