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
    const updatedUser = await UserMon.findByIdAndUpdate(id, newUser, {new: true}).populate('museums');
    if(!updatedUser) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    return updatedUser;
};

const addUserToMuseum = async (museum: Museum["_id"], id: User['_id']): Promise<UserAnyType> => {
    const existingMuseum = await MuseumMon.findById(museum);
    if(!existingMuseum) {
        throw new Error("Kyseistä museota ei löytynyt");
    }
    const user = await UserMon.findById(id);
    if(!user) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    if(user.type === "Customer") {
        throw new Error('Käyttäjää ei voi liittää museoon');
    }
    user.museums = user.museums.concat(existingMuseum?._id);
    await user.save();
    return user;
};

const deleteUser = async (id: string) => {
    await UserMon.findByIdAndDelete(id);
};


const addReservedTour = async(museumId: Museum['_id'], id: User['_id'], tour: Omit<ReservedTour, "_id">): Promise<User> => {
    const newTour = new ReservedMon({
        ...tour
    });
    await newTour.save();

    const museum = await MuseumMon.findById(museumId);
    if (!museum) {
        throw new Error("Museota, johon varaus yritettiin tehdä ei löytynyt");
    }
    museum.reservedTours = museum.reservedTours.concat(newTour._id);

    const user = await UserMon.findById(id);
    if(!user || user.type !== "Customer") {
        throw new Error("Käyttäjää ei löytynyt tai kyseessä ei ole asiakaskäyttäjä");
    }
    user.reservedTours = user.reservedTours.concat(newTour._id);

    museum.save();
    user.save();

    const result = await UserMon.findById(id).populate("reservedTours");
    if(!result) {
        throw new Error("Käyttäjää ei löytynyt");
    }
    return result;
};

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    addUserToMuseum,
    deleteUser,
    addReservedTour
};