
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

export interface User {
    _id: string;
    name: string;
    username: string;
    passwordHash: string;
}

export interface Customer extends User {
    type: "Customer";
    reservedTours: ReservedTour[];
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

export type Professionals = Omit<Guide, "type"> | Omit<Admin, "type"> & {type: "Guide" | "Admin"};
export type UserAnyType = Customer | Admin | Guide;

type BothUsers = Omit<Customer, "type"> & Omit<Admin, "type"> & Omit<Guide, "type">;

export type UniversalUser = BothUsers & {type: UserTypes};

export type NewUser = Omit<UserAnyType, '_id' | 'museums' | 'passwordHash' | 'reservedTours'> & {password: string; languages: string[]};
export type NewMuseum = Omit<Museum, '_id' | 'offeredTours' | 'reservedTours' | 'userRequests'>;
export type NewTour = Pick<GuidedTour, 'possibleLanguages' | 'lengthInMinutes' | 'tourName' | 'maxNumberOfPeople' | 'price' | 'tourInfo'>;

export type UserTypes =
    'Customer' |
    'Admin' |
    'Guide'
;

export type PaymentMethods =  'Cash' | 'Card' | 'Bill' | 'Other';