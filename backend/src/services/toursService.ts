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

const updateTour = (entry: GuidedTour): GuidedTour => {
    console.log(entry.id);
    toursData.forEach(t => console.log(t.id));
    toursData.map(t => t.id === entry.id ? entry : t);
    console.log(toursData);
    return entry;
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