import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json(process.env.MAPBOX);
});

export default router;