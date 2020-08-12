import express from 'express';
import museumService from '../services/museumService';
import { toNewMuseum } from '../utils/parser';
import userService from '../services/userService';
import { decodedToken, allowedUserType, allowedMuseum } from '../utils/userManagement';
import multer from 'multer';
import crypto from 'crypto';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(10).toString('hex') + file.originalname);
    }
    
});

const filter = (_req: any, file: Express.Multer.File, cb: any) => {
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, fileFilter: filter});

router.get('/', async (_req, res) => {
    res.json(await museumService.getMuseums());
});

//AddMuseum
router.post('/', upload.single('image'), async (req, res) => {
    try {    
        const token = decodedToken(req.headers.authorization);
        const user = await userService.getUser(token.id);
        if(!user || !allowedUserType("Admin", user)) {
            res.status(401).send("Ei oikeuksia luoda museota");
            return;
        }
        let image = undefined;
        if(req.file) {
            image = req.file.filename;
        }
        const newMuseum = toNewMuseum({...req.body, open: JSON.parse(req.body.open), closed: JSON.parse(req.body.closed), image: image});
        const addedMuseum = await museumService.addMuseum(newMuseum);
        await userService.addUserToMuseum(addedMuseum._id, token.id);
        res.json(addedMuseum);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//UpdateMuseum
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