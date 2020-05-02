import express from 'express';
import cors from 'cors';
import guidedTourData from '../data/guidedTours.json';
import toursRouter from './routes/toursRouter';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/ping', (_req, _res) => {
    console.log(guidedTourData);
});

app.get('/museum', toursRouter);
app.listen (PORT, () => {
    console.log(`Server running. Port: ${PORT}`);
})