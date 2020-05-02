export interface GuidedTour {
    id: string;
    possibleLanguages: Array<string>;
    lengthInMinutes: number;
    type: string;
    maxNumberOfPeople: number;
    price: number;
    tourInfo?: string;
}

export interface ReservedTour extends GuidedTour {
    chosenLanguage: String;
    groupName: String;
    numberOfPeople: number;
    groupAge: String;
    paymentMethod: 'Cash' | 'Card' | 'Bill' | 'Other';
    time: String;
    date: String;
    email: String;
    groupInfo: String;
}

export interface confirmedTour extends ReservedTour {
    guide: Guide;
    salary: Number;
}

export interface Guide {
    name: String;
    languages: String[];
}

export interface Museum {
    name: String;
    open: {
        mon: String;
        tue: String;
        wed: String;
        thu: String;
        fri: String;
        sat: String;
        sun: String;
    };
    closed: {
        mon: String;
        tue: String;
        wed: String;
        thu: String;
        fri: String;
        sat: String;
        sun: String;
    };
    offeredTours: GuidedTour[];
    reservedTours: ReservedTour[];
    guides: Guide[];
}

export type NewTour = Omit<GuidedTour, 'id'>;