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
        }
        const newTour = toNewTour(req.body);
        const addedMuseum = await toursService.addTour(newTour, req.params.id);
        res.json(addedMuseum);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//KORJAA TESTIT
router.put('/:tourid/museum/:museumid/', async (req, res) => {
    console.log("put");
    try {
        const museumId = req.params.museumid;
        console.log(req.params.museumid);
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        const museum = await museumService.getMuseum(museumId);
        if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user) || !allowedTour(museum, req.params.tourid)) {
            res.status(401).send("Ei oikeuksia muokata opastusta");
        }
        const newTour = toNewTour(req.body);
        const updatedEntry = await toursService.updateTour(newTour, req.params.id);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    const museumId = req.params.museumid;
    const token = decodedToken(req.headers.authorization);
    const user = await userService.getUser(token.id);
    const museum = await museumService.getMuseum(museumId);
    if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user) || !allowedTour(museum, req.params.tourid)) {
        res.status(401).send("Ei oikeuksia poistaa opastusta.");
    }
    await toursService.deleteTour(req.params.id);

    res.status(204).end();
});

export default router;