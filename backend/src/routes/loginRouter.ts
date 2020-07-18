import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import loginService from '../services/loginService';
import express from 'express';
import { Token } from '../utils/userManagement';
import { UserAnyType } from '../types';
const router = express.Router();

router.post('/', async (req, res) => {
    const user = await loginService.login(req.body.username);
    const rightCredentials = user === null
        ? false
        : await bcrypt.compare(req.body.password, user.passwordHash);
    if(!(user && rightCredentials)) {
        res.status(401).send("Kirjautumistiedot väärin");
        return;
    }
    const userToken: Token = {
        user: user.username,
        id: user._id
    };

    if(!process.env.SECRET) {
        res.status(500).send("Ongelma. Ole yhteydessä palveluntarjoajaan.");
        return;
    }

    const token = jwt.sign(userToken, process.env.SECRET);

    const {name, username, type, passwordHash, _id} = user;
    const loggedInUser: UserAnyType & {token: string} = {
        token,
        name,
        username,
        type,
        passwordHash,
        _id,
        languages: user.type === "Guide" ? user.languages: [],
        museums: user.type === "Admin" ? user.museums : [],
        reservedTours: user.type === "Customer" ? user.reservedTours : []
    };

    res.status(200).send(loggedInUser);
});


export default router;