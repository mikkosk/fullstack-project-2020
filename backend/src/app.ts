
import express from 'express';
import cors from 'cors';
import toursRouter from './routes/toursRouter';
require('dotenv').config();
import mongoose from 'mongoose';
import museumRouter from './routes/museumRouter';
import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';
import cypressRouter from './routes/cypressRouter';
import keyRouter from './routes/keyRouter';
import path from 'path';

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
app.use(express.static('frontend'));

app.get('/health', (req, res) => {
  res.send('ok');
});

app.use('/uploads', express.static('uploads'));
app.use('/api/tour', toursRouter);
app.use('/api/museum', museumRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/key', keyRouter);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

if(process.env.NODE_ENV === 'test') {
  app.use('/api/test', cypressRouter);
}

export default app;