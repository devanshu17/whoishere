import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import { config } from './config/config';

const app = express();
const port = config.PORT;
const mongoUri = config.MONGO_URI;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/users', userRoutes);

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
