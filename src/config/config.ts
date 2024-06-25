// src/config/config.ts
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

class Config {
  public readonly PORT: number;
  public readonly MONGO_URI: string;
  public readonly DATA_PATH: string;

  constructor() {
    this.PORT = parseInt(process.env.PORT || '3000', 10);
    this.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/whoishere';
    this.DATA_PATH = process.env.LOCAL_DATA_PATH || path.join(__dirname,'../data');
  }
}

// Export a singleton instance of the Config class
export const config = new Config();
