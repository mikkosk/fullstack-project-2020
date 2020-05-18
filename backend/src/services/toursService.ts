import { GuidedTour, NewTour, Museum } from '../types';
import TourMon from '../models/guidedTour';
import MuseumMon from '../models/museum';

const getTours = async (): Promise<GuidedTour[]> => {
    const tours = await TourMon.find({});
    return tours;
};

const addTour = async (entry: NewTour, museumId: Museum['_id']): Promise<GuidedTour> => {
    const newTour = new TourMon({
        ...entry,
        tourInfo: entry.tourInfo || "Ei infoa saatavilla"
    });

    const savedTour = await newTour.save();
    const museum = await MuseumMon.findById(museumId);

    if(!museum) {
        throw new Error("Museota ei löytynyt");
    }
    
    museum.offeredTours = museum.offeredTours.concat(savedTour._id);
    await museum.save();
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