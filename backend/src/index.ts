import express from 'express';
import cors from 'cors';
import guidedTourData from '../data/guidedTours';
import toursRouter from './routes/toursRouter';
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error: any) => {
    console.log('error connection to MongoDB:', error.message)
  })

const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3001;

app.get('/ping', (_req, _res) => {
    console.log(guidedTourData);
});

app.use('/museum', toursRouter);

app.listen (PORT, () => {
    console.log(`Server running. Port: ${PORT}`);
})