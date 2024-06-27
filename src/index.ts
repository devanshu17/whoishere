import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import { config } from './config/config';
import * as fs from 'fs';

const app = express();
const port = config.PORT;
const mongoUri = config.MONGO_URI;
console.log(config);

//Check if data dir exists else create one
if (!fs.existsSync(config.DATA_PATH)){
  fs.mkdirSync(config.DATA_PATH);
}

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use(cors());
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// Connect to MongoDB 
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
