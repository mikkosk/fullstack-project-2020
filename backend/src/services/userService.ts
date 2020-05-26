import { User, NewUser, UserAnyType, Museum } from '../types';
import UserMon from '../models/user';
import MuseumMon from '../models/museum';
import bcrypt from 'bcrypt';

const getUsers = async (): Promise<UserAnyType[]> => {
    const users = await UserMon.find({}).populate('museums');
    return users;
};

const getUser = async (id: UserAnyType["_id"]): Promise<UserAnyType> => {
    const user = await UserMon.findById(id);
    if(!user) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    return user;
};

const addUser = async (entry: NewUser): Promise<UserAnyType> => {
    const { type, name, username, password } = entry;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new UserMon({
        type,
        name,
        username,
        passwordHash,
        museums: []
    });
    const savedUser = await newUser.save();

    return savedUser;
};

const updateUser = async (entry: NewUser, id: User['_id']): Promise<UserAnyType> => {
    const { name, username, password, type } = entry;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = {
        name,
        type,
        username,
        passwordHash,
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
    user.museums = user.museums.concat(existingMuseum?._id);
    await user.save();
    return user;
};

const deleteUser = async (id: string) => {
    await UserMon.findByIdAndDelete(id);
};

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    addUserToMuseum,
    deleteUser
};