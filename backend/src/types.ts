
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
    //guide: Guide;
    salary?: number;
    confirmed: boolean;
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

export type UserAnyType = Customer | Admin;

type BothUsers = Omit<Customer, "type"> & Omit<Admin, "type">;

export type UniversalUser = BothUsers & {type: UserTypes};

export type NewUser = Omit<UserAnyType, '_id' | 'museums' | 'passwordHash'> & {password: string};
export type NewMuseum = Omit<Museum, '_id' | 'offeredTours' | 'reservedTours'>;
export type NewTour = Pick<GuidedTour, 'possibleLanguages' | 'lengthInMinutes' | 'tourName' | 'maxNumberOfPeople' | 'price' | 'tourInfo'>;

export type UserTypes =
    'Customer' |
    'Admin'
;

export type PaymentMethods =  'Cash' | 'Card' | 'Bill' | 'Other';