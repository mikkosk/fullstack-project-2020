
import express from 'express';
import cors from 'cors';
import toursRouter from './routes/toursRouter';
require('dotenv').config();
import mongoose from 'mongoose';
import museumRouter from './routes/museumRouter';
import userRouter from './routes/userRouter';

mongoose.set('useCreateIndex', true);
let MONGODB_URI = process.env.MONGODB_URI;

if(process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}
if(!MONGODB_URI) {
    MONGODB_URI = "";
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error: any) => {
    console.log('error connection to MongoDB:', error.message);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use('/tour', toursRouter);
app.use('/museum', museumRouter);
app.use('/user', userRouter);

export default app;