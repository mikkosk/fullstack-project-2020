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
    paymentMethod: PaymentMethods;
    time: string;
    date: Date;
    email: string;
    groupInfo: string;
    guide: {
        id: Guide['_id'];
        name: Guide['name'];
    };
    salary?: number;
    confirmed: boolean;
    museum: {
        id: Museum['_id'];
        name: Museum['museumName'];
    };
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
    reservedTours: ReservedTour[];
    userRequests: Professionals[];
    location: string;
    lat: number;
    long: number;
    image?: string;
}

export type NewMuseum = Omit<Museum, '_id' | 'offeredTours' | 'reservedTours' | 'userRequests' | 'image'> & {image: File | undefined};
export type NewTour = Pick<GuidedTour, 'possibleLanguages' | 'lengthInMinutes' | 'tourName' | 'maxNumberOfPeople' | 'price' | 'tourInfo'>;
export type NewUser = Omit<UserAnyType, '_id' | 'museums' | 'passwordHash'> & {password: string; languages: string[]};

export interface TourState {
    tours: { [_id: string]: GuidedTour},
    finished: boolean,
    notification: MessageError
}

export interface MuseumState {
    museums: { [_id: string]: Museum},
    finished: boolean,
    notification: MessageError
}

export interface UserState {
    users: { [_id: string]: UserAnyType},
    finished: boolean,
    notification: MessageError
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
    reservedTours: ReservedTour[]
}

export interface Admin extends User{
    type: "Admin";
    museums: Museum[];
}
export interface Guide extends User{
    type: "Guide";
    museums: Museum[];
    reservedTours: ReservedTour[];
    languages: string[];
}

export type UserAnyType = Customer | Admin | Guide;
export type Professionals = Guide | Admin;

export type UserTypes =
    'Customer' |
    'Admin' |
    'Guide'
;

export interface LoginState extends User {
    type: UserTypes | undefined,
    token: string
    museums?: Museum[]
}

export interface KeyState {
    mapbox: string;
}

export type LoggedInUser = UserAnyType & {token: string}

export interface OptionField {
    label: string,
    value: string
}

export interface MessageError {
    message: string,
    error: boolean
}

export interface NotificationState {
    notification: MessageError
}

export type PaymentMethods =  'Cash' | 'Card' | 'Bill' | 'Other';

export type NewReserved = Pick<ReservedTour, 
    "chosenLanguage" | "groupName" | "numberOfPeople" | "groupAge" | "paymentMethod" | "time" | "date" | "email" | "groupInfo">