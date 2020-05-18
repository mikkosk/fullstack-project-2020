import express from 'express';
import museumService from '../services/museumService';
import { toNewMuseum } from '../utils/parser';

const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await museumService.getMuseums());
});


router.post('/', async (req, res) => {
    try {
        const newMuseum = toNewMuseum(req.body);
        const addedMuseum = await museumService.addMuseum(newMuseum);
        res.json(addedMuseum);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const newMuseum = toNewMuseum(req.body);
        const updatedEntry = await museumService.updateMuseum(newMuseum, req.params.id);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    await museumService.deleteMuseum(req.params.id);

    res.status(204).end();
});

export default router;