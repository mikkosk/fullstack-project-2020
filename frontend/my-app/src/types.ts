export interface GuidedTour {
    _id: string;
    possibleLanguages: Array<string>;
    lengthInMinutes: number;
    tourName: string;
    maxNumberOfPeople: number;
    price: number;
    tourInfo?: string;
}

export interface ReservedTour extends GuidedTour {
    chosenLanguage: string;
    groupName: string;
    numberOfPeople: number;
    groupAge: string;
    paymentMethod: 'Cash' | 'Card' | 'Bill' | 'Other';
    time: string;
    date: string;
    email: string;
    groupInfo: string;
}

export interface ConfirmedTour extends ReservedTour {
    guide: Guide;
    salary: number;
}

export interface Guide {
    guideName: string;
    languages: string[];
}

export interface Museum {
    _id: string;
    museumName: string;
    open: {
        mon: string;
        tue: string;
        wed: string;
        thu: string;
        fri: string;
        sat: string;
        sun: string;
    };
    closed: {
        mon: string;
        tue: string;
        wed: string;
        thu: string;
        fri: string;
        sat: string;
        sun: string;
    };
    openInfo?: string;
    offeredTours: GuidedTour[];
    museumInfo?: string;
}

export type NewMuseum = Omit<Museum, '_id' | 'offeredTours'>;
export type NewTour = Pick<GuidedTour, 'possibleLanguages' | 'lengthInMinutes' | 'tourName' | 'maxNumberOfPeople' | 'price' | 'tourInfo'>;

export interface TourState {
    tours: { [_id: string]: GuidedTour}
}

export interface MuseumState {
    museums: { [_id: string]: Museum}
}

export type AddTourPayload = {
    tour: GuidedTour;
    museumId: string;
};