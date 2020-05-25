import express from 'express';
import userService from '../services/userService';
import { toNewUser } from '../utils/parser';
import { decodedToken, allowedUserType, allowedMuseum } from '../utils/userManagement';

const router = express.Router();

router.get('/', async (_req, res) => {
    res.json(await userService.getUsers());
});

router.get('/:id', async (req, res) => {
    res.json(await userService.getUser(req.params.id));
});

router.post('/', async (req, res) => {
    try {
        const newUser = toNewUser(req.body);
        const addedUser = await userService.addUser(newUser);
        res.json(addedUser);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const token = decodedToken(req.headers.authorization);
        if(req.params.id !== token.id) {
            res.status(401).send("Ei oikeuksia muokata käyttäjää");
        }
        const newUser = toNewUser(req.body);
        const updatedEntry = await userService.updateUser(newUser, req.params.id);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:userid/museum/:museumid', async (req, res) => {
    try {
        const museumId = req.params.museumid;
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        if(!user || !allowedUserType("Admin", user) || !allowedMuseum(museumId, user)) {
            res.status(401).send("Ei oikeuksia lisätä käyttäjää museoon");
        }
        const updatedEntry = await userService.addUserToMuseum(req.params.museumid, req.params.userid);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    const token = decodedToken(req.headers.authorization);
    if(req.params._id !== token.id) {
        res.status(401).send("Ei oikeuksia poistaa käyttäjää");
    }
    await userService.deleteUser(req.params.id);

    res.status(204).end();
});

export default router;