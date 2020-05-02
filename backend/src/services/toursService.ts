import toursData from '../../data/guidedTours.json';
import { GuidedTour, NewTour } from '../types';
import crypto from 'crypto';

const getTours = (): GuidedTour[] => {
    return toursData;
};

const addTour = (entry: NewTour): GuidedTour => {
    const newTour = {
        ...entry,
        id: crypto.randomBytes(20).toString('hex'),
        tourInfo: entry.tourInfo || "Ei infoa saatavilla"
    };
    toursData.push(newTour);
    return newTour;
};

const updateTour = (entry: GuidedTour): GuidedTour => {
    toursData.map(t => t.id === entry.id ? entry : t);
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