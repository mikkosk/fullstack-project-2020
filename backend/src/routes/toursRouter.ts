import express from 'express';
import toursService from '../services/toursService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(toursService.getTours());
});


router.post('/', (req, res) => {
    try {
        const newTour = toNewTour(req.body);
        const addedTour = toursService.addTour(newTour);
        res.json(addedTour);
    } catch (e) {
        res.status(400).send(e.message)
    }
});

router.post('/:id', (req, res) => {
    try {
        const newTour = toNewTour(req.body);
        const addedTour = toursService.updateTour(newTour);
        res.json(addedTour);
    } catch (e) {
        res.status(400).send(e.message)
    }
});

router.delete('/:id', (req, res) => {
    toursService.deleteTour(req.params.id);

    res.status(204).end();
})

export default router;