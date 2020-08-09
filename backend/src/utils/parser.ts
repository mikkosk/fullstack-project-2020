/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewTour, NewMuseum, NewUser, ReservedTour, PaymentMethods } from "../types";

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: any): number is number => {
    return typeof number === 'number' || number instanceof Number;
};


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isTime = (time: string): boolean => {
    if(time === "closed") {
        return true;
    }
    if(time.length !== 5) {
        return false;
    }
    if(time.substr(2,1) !== ":") {
        return false;
    }
    let hours = time.substr(0,2);
    let minutes = time.substr(3,2);

    if(hours.substr(0,1) === "0") {
        hours = hours.substr(1,1);
    }
    if(minutes.substr(0,1) === "0") {
        minutes = minutes.substr(1,1);
    }
    return Boolean(Number(minutes) > -1 && Number(minutes) < 60 && Number(hours) > -1 && Number(hours) < 24);
};

const isType = (type: any): boolean => {
    return type === "Customer" || type === "Admin" || type === "Guide";
};

const isPaymentMethod = (method: any): boolean => {
    return method === "Cash" || method == "Card" || method === "Bill" || method === "Other";
};

const parseGenericTextField = (text: any, error: string): string => {
    if(!text || !isString(text)) {
        throw new Error('Missing or invalid ' + error);
    }
    return text;
};

const parseGenericNumberField = (number: any, error: string): number => {
    if(!number || !isNumber(number)) {
        throw new Error('Missing or invalid ' + error);
    }
    return number;
};

const parseLatLong = (number: any): number => {
    if(!isNaN(number) && number <= 90 && number >= -90) {
        return number;
    } else {
        throw new Error("Missing or invalid coordinate");
    }
};

const parseLanguages = (languages: any): string[] => {
    if(!languages || !Array.isArray(languages)) {
        throw new Error('Incorrect or missing list of languages');
    }
    languages.forEach((l: any): string => parseGenericTextField(l, "language"));
    return languages;
};

const parseTime = (time: any): string => {
    if (!time || !isString(time) || !isTime(time)) {
        throw new Error('Incorrect or missing time');
    }
    return time;
};

const parseDate = (date: any): Date => {
    if (!date ||  !isDate(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};

const parseType = (type: any): "Customer" | "Admin" | "Guide" => {
    if(!type || !isType(type)) {
        throw new Error('Incorrect or missing user type');
    } 
    return type;
};

const parsePaymentMethod = (method: any): PaymentMethods => {
    if(!method || !isPaymentMethod(method)) {
        throw new Error('Incorrect or missing payment method');
    }
    return method;
};

export const toNewTour = (object: any): NewTour => {
    const newTour =
        {
            possibleLanguages: parseLanguages(object.possibleLanguages),
            lengthInMinutes: parseGenericNumberField(object.lengthInMinutes, "length"),
            tourName: parseGenericTextField(object.tourName, "tour name"),
            maxNumberOfPeople: parseGenericNumberField(object.maxNumberOfPeople, "number of people"),
            price: parseGenericNumberField(object.price, "price"),
        };

    if(object.tourInfo) {
        return {
            ...newTour,
            tourInfo: parseGenericTextField(object.tourInfo, "tour info")
        };
    } else {
        return newTour;
    }
    
};


export const toNewMuseum = (object: any): NewMuseum => {
    let newMuseum: NewMuseum =
        {
            museumName: parseGenericTextField(object.museumName, "museum name"),
            open: {
                mon: parseTime(object.open.mon),
                tue: parseTime(object.open.tue),
                wed: parseTime(object.open.wed),
                thu: parseTime(object.open.thu),
                fri: parseTime(object.open.fri),
                sat: parseTime(object.open.sat),
                sun: parseTime(object.open.sun)
            },
            closed: {
                mon: parseTime(object.closed.mon),
                tue: parseTime(object.closed.tue),
                wed: parseTime(object.closed.wed),
                thu: parseTime(object.closed.thu),
                fri: parseTime(object.closed.fri),
                sat: parseTime(object.closed.sat),
                sun: parseTime(object.closed.sun)
            },
            location: parseGenericTextField(object.location, "location"),
            lat: parseLatLong(object.lat),
            long: parseLatLong(object.long)
        };

    if(object.openInfo) {
        newMuseum = {
            ...newMuseum,
            openInfo: parseGenericTextField(object.openInfo, "open info")
        };
    }

    if(object.museumInfo) {
        newMuseum = {
            ...newMuseum,
            museumInfo: parseGenericTextField(object.museumInfo, "museum info")
        };
    }
    if(object.image) {
        newMuseum = {
            ...newMuseum,
            image: parseGenericTextField(object.image, "image path")
        };
    }
    return newMuseum;
    
};

export const toNewUser = (object: any): NewUser => {
    const newUser: NewUser = {
        type: parseType(object.type),
        name: parseGenericTextField(object.name, "name"),
        username: parseGenericTextField(object.username, "username"),
        password: parseGenericTextField(object.password, "password"),
        languages: []
    };

    if(newUser.type === "Guide" && object.languages) {
        newUser.languages =  parseLanguages(object.languages);
    }
    return newUser;
};

export const toReservedTour = (object: any): Omit<ReservedTour, '_id' | 'museum'> => {
    const tour: Omit<ReservedTour, '_id' | 'museum'>= {
        possibleLanguages: parseLanguages(object.possibleLanguages),
        lengthInMinutes: parseGenericNumberField(object.lengthInMinutes, "length"),
        tourName: parseGenericTextField(object.tourName, "tour name"),
        maxNumberOfPeople: parseGenericNumberField(object.maxNumberOfPeople, "max number of people"),
        price: parseGenericNumberField(object.price, "price"),
        chosenLanguage: parseGenericTextField(object.chosenLanguage, "language"),
        groupName: parseGenericTextField(object.groupName, "group name"),
        numberOfPeople: parseGenericNumberField(object.maxNumberOfPeople, "number of people"),
        groupAge: parseGenericTextField(object.groupAge, "group age"),
        paymentMethod: parsePaymentMethod(object.paymentMethod),
        time: parseTime(object.time),
        date: parseDate(object.date),
        email: parseGenericTextField(object.email, "email"),
        groupInfo: parseGenericTextField(object.groupInfo, "group info"),
        guide: {
            id: "",
            name: ""
        },
        salary: 0,
        confirmed: false
    };

    if(object.tourInfo) {
        return {
            ...tour,
            tourInfo: parseGenericTextField(object.tourInfo, "tour info")
        };
    }

    return tour;
};