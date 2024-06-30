// src/config/config.ts
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

class Config {
  public readonly PORT: number;
  public readonly MONGO_URI: string;
  public readonly DATA_PATH: string;
  public readonly BASE_URL: string;
  public readonly JWT_TOKEN_SECRET: string;
  public readonly JWT_REFRESH_SECRET: string;
  public readonly JWT_TOKEN_EXPIRY: string;
  public readonly JWT_REFRESH_EXPIRY: string;
  public readonly JWT_REFRESH_TOKEN_LIMIT_IN_SEC: number;
  public readonly AZURE_STORAGE_ACCOUNT_NAME: string;
  public readonly AZURE_STORAGE_CONTAINER_NAME: string;
  public readonly AZURE_STORAGE_ACCOUNT_KEY: string;

  constructor() {
    this.PORT = parseInt(process.env.PORT || '3000', 10);
    this.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/whoishere';
    this.DATA_PATH = process.env.LOCAL_DATA_PATH || path.join(__dirname,'../data');
    this.BASE_URL = process.env.BASE_URL || `127.0.0.1:${this.PORT}`;
    this.JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || 'jwttokensecret';
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'jwtrefreshsecret';
    this.JWT_TOKEN_EXPIRY = process.env.JWT_TOKEN_EXPIRY || '1h';
    this.JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '1d';
    this.AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'whoishere';
    this.AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'profile';
    this.AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
    this.JWT_REFRESH_TOKEN_LIMIT_IN_SEC = parseInt(process.env.JWT_REFRESH_TOKEN_LIMIT_IN_SEC || '10800'); //3 hours
  }
}

// Export a singleton instance of the Config class
export const config = new Config();
