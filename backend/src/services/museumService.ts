import { Museum, NewMuseum } from '../types';
import MuseumMon from '../models/museum';

const getMuseums = async (): Promise<Museum[]> => {
    const museums = await MuseumMon.find({}).populate('offeredTours');
    return museums;
};

const addMuseum = async (entry: NewMuseum): Promise<Museum> => {
    const newMuseum = new MuseumMon({
        ...entry,
    });
    const savedTour = await newMuseum.save();
    return savedTour;
};

const updateMuseum = async (entry: NewMuseum, id: Museum['_id']): Promise<Museum> => {
    const updatedTour = await MuseumMon.findByIdAndUpdate(id, entry, {new: true}).populate('offeredTours');
    if(!updatedTour) {
        throw new Error('Kyseistä museota ei löytynyt');
    }
    return updatedTour;
};

const deleteMuseum = async (id: string) => {
    await MuseumMon.findByIdAndDelete(id);
};

export default {
    getMuseums,
    addMuseum,
    updateMuseum,
    deleteMuseum
};