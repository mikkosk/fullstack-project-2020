import express from 'express';
import userService from '../services/userService';
import { toNewUser } from '../utils/parser';

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
        const newUser = toNewUser(req.body);
        const updatedEntry = await userService.updateUser(newUser, req.params.id);
        res.json(updatedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.status(204).end();
});

export default router;