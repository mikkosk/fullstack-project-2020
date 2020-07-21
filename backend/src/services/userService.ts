import { User, NewUser, UserAnyType, Museum, ReservedTour } from '../types';
import UserMon from '../models/user';
import MuseumMon from '../models/museum';
import ReservedMon from '../models/reservedTour';
import bcrypt from 'bcrypt';

const getUsers = async (): Promise<UserAnyType[]> => {
    const users = await UserMon.find({}).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    return users;
};

const getUser = async (id: UserAnyType["_id"]): Promise<UserAnyType> => {
    const user = await UserMon.findById(id).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    if(!user) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    return user;
};

const addUser = async (entry: NewUser): Promise<UserAnyType> => {
    const { type, name, username, password, languages } = entry;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new UserMon({
        type,
        name,
        username,
        passwordHash,
        museums: [],
        reservedTours: [],
        languages
    });
    const savedUser = await newUser.save();

    return savedUser;
};

const updateUser = async (entry: NewUser, id: User['_id']): Promise<UserAnyType> => {
    const { name, username, password, type, languages } = entry;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = {
        name,
        type,
        username,
        passwordHash,
        languages
    };
    const updatedUser = await UserMon.findByIdAndUpdate(id, newUser, {new: true}).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    if(!updatedUser) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    return updatedUser;
};

const addUserToMuseum = async (museum: Museum["_id"], id: User['_id']): Promise<UserAnyType> => {
    const existingMuseum = await MuseumMon.findById(museum).populate('reservedTours');
    if(!existingMuseum) {
        throw new Error("Kyseistä museota ei löytynyt");
    }
    const user = await UserMon.findById(id).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    if(!user) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    if(user.type === "Customer") {
        throw new Error('Käyttäjää ei voi liittää museoon');
    }
    user.museums = user.museums.concat(existingMuseum);
    await user.save();
    return user;
};

const deleteUser = async (id: string) => {
    await UserMon.findByIdAndDelete(id);
};


const addReservedTour = async(museumId: Museum['_id'], id: User['_id'], tour: Omit<ReservedTour, "_id" | "museum">): Promise<User> => {
    const museum = await MuseumMon.findById(museumId);
    if (!museum) {
        throw new Error("Museota, johon varaus yritettiin tehdä ei löytynyt");
    }

    const newTour = new ReservedMon({
        ...tour,
        museum: {
            name: museum.museumName,
            id: museum._id 
        }
    });
    await newTour.save();

    museum.reservedTours = museum.reservedTours.concat(newTour._id);

    const user = await UserMon.findById(id).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    if(!user || user.type !== "Customer") {
        throw new Error("Käyttäjää ei löytynyt tai kyseessä ei ole asiakaskäyttäjä");
    }
    user.reservedTours = user.reservedTours.concat(newTour);

    museum.save();
    user.save();

    if(!user) {
        throw new Error("Käyttäjää ei löytynyt");
    }
    return user;
};

const confirmTour = async (tourId: string, userId: string): Promise<UserAnyType> => {
    const user = await UserMon.findById(userId).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    const tour = await ReservedMon.findById(tourId);

    if(!user || user.type !== "Guide") {
        throw new Error('Käyttäjää ei ole olemassa tai se ei ole oikeanlainen');
    }
    if(tour && tour.confirmed === true) {
        throw new Error('Kierros on jo varattu');
    }

    const updatedTour = await ReservedMon.findByIdAndUpdate(tourId, {guide: {name: user.name, id: user._id}, confirmed: true}, {new: true});
    if(!updatedTour) {
        throw new Error('Kyseistä museota ei löytynyt');
    }

    const updatedUser = await UserMon.findById(userId).populate({path: 'museums', populate: {path: 'reservedTours'}}).populate("reservedTours");
    if(!updatedUser) {
        throw new Error('Käyttäjää ei löytynyt');
    }
    updatedUser.reservedTours = updatedUser.reservedTours.concat(updatedTour);
    await updatedUser.save();
    return updatedUser;
};

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    addUserToMuseum,
    deleteUser,
    addReservedTour,
    confirmTour
};