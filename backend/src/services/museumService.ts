import { Museum, NewMuseum } from '../types';
import MuseumMon from '../models/museum';

const getMuseums = async (): Promise<Museum[]> => {
    const museums = await MuseumMon.find({}).populate('offeredTours');
    return museums;
};

const getMuseum = async (id: Museum["_id"]): Promise<Museum> => {
    const museum = await MuseumMon.findOne({id}).populate('offeredTours');
    if(!museum) {
        throw new Error("Kyseistä museota ei löytynyt");
    }
    return museum;
};

const addMuseum = async (entry: NewMuseum): Promise<Museum> => {
    const newMuseum = new MuseumMon({
        ...entry,
        offeredTours: []
    });
    const savedMuseum = await newMuseum.save();
    return savedMuseum;
};

const updateMuseum = async (entry: NewMuseum, id: Museum['_id']): Promise<Museum> => {
    const updatedMuseum = await MuseumMon.findByIdAndUpdate(id, entry, {new: true}).populate('offeredTours');
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
    deleteMuseum
};