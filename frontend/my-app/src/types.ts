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
export type NewUser = Omit<UserAnyType, '_id' | 'museums' | 'passwordHash'> & {password: string};

export interface TourState {
    tours: { [_id: string]: GuidedTour}
}

export interface MuseumState {
    museums: { [_id: string]: Museum}
}

export interface UserState {
    users: { [_id: string]: UserAnyType}
}

export type AddTourPayload = {
    tour: GuidedTour;
    museumId: string;
};

export interface User {
    _id: string;
    name: string;
    username: string;
    passwordHash: string;
}

export interface Customer extends User {
    type: "Customer";
}

export interface Admin extends User{
    type: "Admin";
    museums: Museum[];
}

export type UserAnyType = Customer | Admin;

export type UserTypes =
    'Customer' |
    'Admin'
;

export interface LoginState extends User {
    type: UserTypes | undefined,
    token: string
}

export type LoggedInUser = UserAnyType & {token: string}