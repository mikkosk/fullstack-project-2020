import jwt from 'jsonwebtoken';
import { UserTypes, UserAnyType, Museum, GuidedTour } from '../types';

export interface Token {
    user: string;
    id: string;
}

export const decodedToken = (token: string | undefined): Token => {
    const secret = process.env.SECRET;
    if(!secret || !token || token.substr(0,7) !== 'bearer ') {
        throw new Error("Virheelliset käyttäjätiedot");
    }
    const decodedToken  = jwt.verify(token.substr(7), secret) as Token;
    return decodedToken;
};

export const allowedUserType = (expected: UserTypes, received: UserAnyType): boolean => {
    if(expected === received.type) {
        return true;
    }
    console.log(received);
    console.log("Usertype");
    return false;
};

export const allowedMuseum = (museumId: Museum["_id"], user: UserAnyType): boolean => {
    if(user.type !== "Admin") {
        console.log("NoAdmin");
        return false;
    }
    if(!user.museums.find((m: Museum) => m._id.toString() === museumId)) {
        console.log(museumId);
        console.log(user.museums);
        console.log("MuseumNot");
        return false;
    }
    return true;
};

export const allowedTour = (museum: Museum, tourId: GuidedTour["_id"]): boolean => {
    if(!museum.offeredTours.find((t: GuidedTour) => t._id === tourId)) {
        return false;
    }
    return true;
};