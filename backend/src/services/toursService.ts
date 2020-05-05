import { GuidedTour, NewTour } from '../types';
import crypto from 'crypto';
import Tour from '../models/guidedTour';

const getTours = async (): Promise<GuidedTour[]> => {
    const tours = await Tour.find({});
    return tours;
};

const addTour = async (entry: NewTour): Promise<GuidedTour> => {
    const newTour = new Tour({
        ...entry,
        id: crypto.randomBytes(20).toString('hex'),
        tourInfo: entry.tourInfo || "Ei infoa saatavilla"
    });
    const savedTour = await newTour.save();
    return savedTour;
};

const updateTour = async (entry: NewTour, id: string): Promise<GuidedTour> => {
    const updatedTour = await Tour.findByIdAndUpdate(id, entry, {new: true});
    if(!updatedTour) {
        throw new Error('Kyseistä opastusta ei löytynyt');
    }
    return updatedTour;
};

const deleteTour = async (id: string) => {
    await Tour.findByIdAndDelete(id);
};

export default {
    getTours,
    addTour,
    updateTour,
    deleteTour
};