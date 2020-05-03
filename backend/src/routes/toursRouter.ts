import express from 'express';
import toursService from '../services/toursService';
import { toNewTour } from '../utils/parser';

const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await toursService.getTours());
});


router.post('/', async (req, res) => {
    try {
        const newTour = toNewTour(req.body);
        const addedTour = await toursService.addTour(newTour);
        console.log("joo");
        console.log(addedTour);
        res.json(addedTour);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Muuta asynceicsi
router.put('/:id', (req, res) => {
    try {
        const newTour = toNewTour(req.body);
        const tourWithId = {...newTour, id: req.params.id};
        const updatedEntry = toursService.updateTour(tourWithId);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', (req, res) => {
    toursService.deleteTour(req.params.id);

    res.status(204).end();
});

export default router;