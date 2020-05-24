import express from 'express';
import museumService from '../services/museumService';
import { toNewMuseum } from '../utils/parser';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';
interface Token {
    user: string;
    id: string;
}
const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await museumService.getMuseums());
});


router.post('/', async (req, res) => {
    const secret = process.env.SECRET;
    if(!secret || !req.headers.authorization) {
        throw new Error("Jotain meni pieleen");
    }
    const decodedToken  = jwt.verify(req.headers.authorization.substr(7), secret) as Token;
    try {
        const user = await userService.getUser(decodedToken.id);
        if(!user || user.type !== "Admin") {
            throw new Error("Ei oikeuksia luoda museota");
        }
        const newMuseum = toNewMuseum(req.body);
        const addedMuseum = await museumService.addMuseum(newMuseum);
        await userService.addUserToMuseum(addedMuseum._id, decodedToken.id);
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
    console.log(req.params.id);
    await museumService.deleteMuseum(req.params.id);

    res.status(204).end();
});

export default router;