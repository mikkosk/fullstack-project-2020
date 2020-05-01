export interface GuidedTour {
    possibleLanguages: String[];
    lengthInMinutes: number;
    Type: String;
    MaxNumberOfPeople: number;
    Price: number;
    TourInfo: string;
}

export interface ReservedTour extends GuidedTour {
    chosenLanguage: String;
    groupName: String;
    numberOfPeople: number;
    groupAge: String;
    paymentMethod: 'Cash' | 'Card' | 'Bill' | 'Other';
    Time: String;
    Date: String;
    email: String;
    GroupInfo: String;
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