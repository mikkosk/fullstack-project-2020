import express from 'express';
import cors from 'cors';
import guidedTourData from '../data/guidedTours.json'

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, _res) => {
    console.log(guidedTourData);
});

app.listen (PORT, () => {
    console.log(`Server running. Port: ${PORT}`);
})