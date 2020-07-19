import { Museum, NewMuseum, Professionals } from '../types';
import MuseumMon from '../models/museum';
import UserMon from '../models/user';

const getMuseums = async (): Promise<Museum[]> => {
    const museums = await MuseumMon.find({}).populate('offeredTours').populate('reservedTours').populate('userRequests');
    return museums;
};

const getMuseum = async (id: Museum["_id"]): Promise<Museum> => {
    const museum = await MuseumMon.findById(id).populate('offeredTours').populate('reservedTours').populate('userRequests');
    if(!museum) {
        throw new Error("Kyseistä museota ei löytynyt");
    }
    return museum;
};

const addMuseum = async (entry: NewMuseum): Promise<Museum> => {
    const newMuseum = new MuseumMon({
        ...entry,
        offeredTours: [],
        reservedTours: [],
        userRequests: []
    });
    const savedMuseum = await newMuseum.save();
    return savedMuseum;
};

const updateMuseum = async (entry: NewMuseum, id: Museum['_id']): Promise<Museum> => {
    const updatedMuseum = await MuseumMon.findByIdAndUpdate(id, entry, {new: true}).populate('offeredTours').populate('reservedTours').populate('userRequests');
    if(!updatedMuseum) {
        throw new Error('Kyseistä museota ei löytynyt');
    }
    return updatedMuseum;
};

const sendRequestMuseum = async(userId: Professionals['_id'], museumId: Museum['_id']): Promise<Museum> => {
    const museum = await MuseumMon.findById(museumId).populate("userRequests");
    const user = await UserMon.findById(userId);

    if(!museum || !user) {
        throw new Error('Museota ei ole olemassa');
    }
    if(!user || user.type === "Customer") {
        throw new Error('Käyttäjää ei ole olemassa tai se ei ole oikeanlainen');
    }
    const updatedMuseum = await MuseumMon.findByIdAndUpdate(museumId, {userRequests: museum.userRequests.concat(user)}, {new:true}).populate('offeredTours').populate('reservedTours').populate('userRequests');
    if(!updatedMuseum) {
        throw new Error('Kyseistä museota ei löytynyt');
    }

    return updatedMuseum;
};

const removeRequest = async (userId: Professionals['_id'], museumId: Museum['_id']): Promise<Museum> => {
    const museum = await MuseumMon.findById(museumId).populate("userRequests");
    const user = await UserMon.findById(userId);

    if(!museum || !user) {
        throw new Error('Museota ei ole olemassa');
    }
    if(!user || user.type === "Customer") {
        throw new Error('Käyttäjää ei ole olemassa tai se ei ole oikeanlainen');
    }
    const updatedMuseum = await MuseumMon.findByIdAndUpdate(museumId, {userRequests: museum.userRequests.filter((u: Professionals) => u._id !== userId)}, {new:true}).populate('offeredTours').populate('reservedTours').populate('userRequests');
    if(!updatedMuseum) {
        throw new Error('Kyseistä museota ei löytynyt');
    }
    return updatedMuseum;
};

const deleteMuseum = async (id: string) => {
    await MuseumMon.findByIdAndDelete(id);
};

export default {
    getMuseums,
    getMuseum,
    addMuseum,
    updateMuseum,
    deleteMuseum,
    sendRequestMuseum,
    removeRequest
};