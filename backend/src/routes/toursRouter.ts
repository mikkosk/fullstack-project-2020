import express from 'express';
import toursService from '../services/toursService';
import { toNewTour } from '../utils/parser';
import { decodedToken, allowedUserType, allowedMuseum, allowedTour } from '../utils/userManagement';
import userService from '../services/userService';
import museumService from '../services/museumService';

const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await toursService.getTours());
});


router.post('/museum/:id', async (req, res) => {
    try {
        const museumId = req.params.id;
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user)) {
            res.status(401).send("Ei oikeuksia luoda opastettua kierrosta");
            return;
        }
        const newTour = toNewTour(req.body);
        const addedMuseum = await toursService.addTour(newTour, req.params.id);
        res.json(addedMuseum);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:tourid/museum/:museumid/', async (req, res) => {
    const museumId = req.params.museumid;
    try {
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        const museum = await museumService.getMuseum(museumId);
        if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user) || !allowedTour(museum, req.params.tourid)) {
            res.status(401).send("Ei oikeuksia muokata opastusta");
            return;
        }
        const newTour = toNewTour(req.body);
        const updatedEntry = await toursService.updateTour(newTour, req.params.tourid);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:tourid/museum/:museumid/', async (req, res) => {
    const museumId = req.params.museumid;
    try {
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        const museum = await museumService.getMuseum(museumId);
        if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user) || !allowedTour(museum, req.params.tourid)) {
            res.status(401).send("Ei oikeuksia poistaa opastusta.");
            return;
        }
        await toursService.deleteTour(req.params.tourid);
    } catch(e) {
        res.status(400).send(e.message);
    }

    res.status(204).end();
});

export default router;