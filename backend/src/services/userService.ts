import { User, NewUser, UserAnyType, Admin, Customer } from '../types';
import UserMon from '../models/user';
import { Document } from 'mongoose';

const getUsers = async (): Promise<UserAnyType[]> => {
    const users = await UserMon.find({}).populate('museums');
    return users;
};

const getUser = async (id: string): Promise<UserAnyType> => {
    const user = await UserMon.findById(id).populate('museums');
    if(!user) {
        throw new Error('Kyseistä käyttäjää ei löytynyt');
    }
    return user;
};

const addUser = async (entry: NewUser): Promise<UserAnyType> => {
    const { type, name, username, password } = entry;
    const newUser = new UserMon({
        type,
        name,
        username,
        passwordHash: "lol",
        museums: []
    });
    const savedUser = await newUser.save();
    if(type === "Admin") {
        const returnUser: (Admin) = savedUser;
        return returnUser;
    }
    if(type === "Customer") {
        const returnUser: (Customer) = savedUser;
        return returnUser;
    }
    throw new Error("Käyttäjää ei voitu lisätä");
};

const updateUser = async (entry: NewUser, id: User['_id']): Promise<UserAnyType> => {
    const { type, name, username, password } = entry;
    const newUser = {
        type,
        name,
        username,
        passwordHash: "lol",
        museums: []
    };
    const updatedUser = await UserMon.findByIdAndUpdate(id, {newUser}, {new: true}).populate('museums');
    if(!updatedUser) {
        throw new Error('Kyseistä museota ei löytynyt');
    }
    return updatedUser;
};

const deleteUser = async (id: string) => {
    await UserMon.findByIdAndDelete(id);
};

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};