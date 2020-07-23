import express from 'express';
import museumService from '../services/museumService';
import { toNewMuseum } from '../utils/parser';
import userService from '../services/userService';
import { decodedToken, allowedUserType, allowedMuseum } from '../utils/userManagement';
const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await museumService.getMuseums());
});


router.post('/', async (req, res) => {
    try {
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        if(!user || !allowedUserType("Admin", user)) {
            res.status(401).send("Ei oikeuksia luoda museota");
            return;
        }
        const newMuseum = toNewMuseum(req.body);
        const addedMuseum = await museumService.addMuseum(newMuseum);
        await userService.addUserToMuseum(addedMuseum._id, token.id);
        res.json(addedMuseum);
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const museumId = req.params.id;
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user)) {
            res.status(401).send("Ei oikeuksia muokata museota");
            return;
        }
        const updatedMuseum = toNewMuseum(req.body);
        const updatedEntry = await museumService.updateMuseum(updatedMuseum, req.params.id);
        res.json(updatedEntry);
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    const museumId = req.params.id;
    const token = decodedToken(req.headers.authorization);
    const user = await userService.getUser(token.id);
    if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user)) {
        res.status(401).send("Ei oikeuksia poistaa museota");
        return;
    }
    await museumService.deleteMuseum(req.params.id);

    res.status(204).end();
});

router.put('/:id/request', async (req, res) => {
    const museumId = req.params.id;
    const userId = String(req.body.id);
    try {
        const museum = await museumService.sendRequestMuseum(userId, museumId);
        res.json(museum);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

router.put('/:id/request/remove', async (req, res) => {
    const museumId = req.params.id;
    const userId = String(req.body.id);
    const token = decodedToken(req.headers.authorization);
    const user = await userService.getUser(token.id);
    if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user)) {
        res.status(401).send("Ei oikeuksia poistaa pyyntöä");
        return;
    }
    try {
        const museum = await museumService.removeRequest(userId, museumId);
        res.json(museum);
    } catch(e) {
        res.status(400).send(e.message);
    }
});
export default router;