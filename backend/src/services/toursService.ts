import { GuidedTour, NewTour } from '../types';
import TourMon from '../models/guidedTour';

const getTours = async (): Promise<GuidedTour[]> => {
    const tours = await TourMon.find({});
    return tours;
};

const addTour = async (entry: NewTour): Promise<GuidedTour> => {
    const newTour = new TourMon({
        ...entry,
        tourInfo: entry.tourInfo || "Ei infoa saatavilla"
    });
    const savedTour = await newTour.save();
    return savedTour;
};

const updateTour = async (entry: NewTour, id: GuidedTour['_id']): Promise<GuidedTour> => {
    const updatedTour = await TourMon.findByIdAndUpdate(id, entry, {new: true});
    if(!updatedTour) {
        throw new Error('Kyseistä opastusta ei löytynyt');
    }
    return updatedTour;
};

const deleteTour = async (id: string) => {
    await TourMon.findByIdAndDelete(id);
};

export default {
    getTours,
    addTour,
    updateTour,
    deleteTour
};