import express from 'express';
import toursService from '../services/toursService';
import { toNewTour } from '../utils/parser';

const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await toursService.getTours());
});


router.post('/museum/:id', async (req, res) => {
    try {
        const newTour = toNewTour(req.body);
        const addedMuseum = await toursService.addTour(newTour, req.params.id);
        res.json(addedMuseum);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const newTour = toNewTour(req.body);
        const updatedEntry = await toursService.updateTour(newTour, req.params.id);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    await toursService.deleteTour(req.params.id);

    res.status(204).end();
});

export default router;