import toursData from '../../data/guidedTours';
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
    console.log(newTour);
    const savedTour = await newTour.save();
    console.log(savedTour);
    return savedTour;
};

const updateTour = async (entry: NewTour, id: GuidedTour['_id']): Promise<GuidedTour> => {
    console.log(id);
    toursData.forEach(t => console.log(t.id));
    toursData.map(t => t.id === id ? entry : t);
    const updatedTour = await Tour.findByIdAndUpdate(id, entry, {new: true});
    if(!updatedTour) {
        throw new Error('Kyseistä opastusta ei löytynyt');
    }
    console.log(updatedTour);
    return updatedTour;
};

const deleteTour = (id: string) => {
    toursData.filter(t => t.id !== id);
};

export default {
    getTours,
    addTour,
    updateTour,
    deleteTour
};