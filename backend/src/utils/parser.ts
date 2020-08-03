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

const parseGenericTextField = (text: any): string => {
    if(!text || !isString(text)) {
        throw new Error();
    }
    return text;
};

const parseGenericNumberField = (number: any): number => {
    if(!number || !isNumber(number)) {
        throw new Error();
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

const parseLocation = (location: any): string => {
    try {
        return parseGenericTextField(location);
    } catch {
        throw new Error("Missing or invalid location");
    }
};

const parseImage = (image: any): string => {
    try {
        return parseGenericTextField(image);
    } catch {
        throw new Error("Missing or invalid image path");
    }
};
const parseLanguage = (language: any): string => {
    try {
        const parsedLanguage = parseGenericTextField(language);
        return parsedLanguage;
    } catch {
        throw new Error('Missing or invalid language');
    }
};

const parseLength = (length: any): number => {
    try {
        const parsedLength = parseGenericNumberField(length);
        return parsedLength;
    } catch {
        throw new Error('Missing or invalid length');
    }
};

const parseName = (name: any): string => {
    try {
        const parsedName = parseGenericTextField(name);
        return parsedName;
    } catch {
        throw new Error('Missing or invalid name' + name);
    }
};

const parseNumberOfPeople = (number: any): number => {
    try {
        const parsedNumber = parseGenericNumberField(number);
        return parsedNumber;
    } catch {
        throw new Error('Missing or invalid number of people');
    }
};

const parsePrice = (price: any): number => {
    try {
        const parsedPrice = parseGenericNumberField(price);
        return parsedPrice;
    } catch {
        throw new Error('Missing or invalid price');
    }
};

const parseInfo = (info: any): string => {
    try {
        const parsedInfo = parseGenericTextField(info);
        return parsedInfo;
    } catch {
        throw new Error('Missing or invalid info');
    }
};

const parseLanguages = (languages: any): string[] => {
    if(!languages || !Array.isArray(languages)) {
        throw new Error('Incorrect or missing list of languages');
    }
    languages.forEach((l: any): string => parseLanguage(l));
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

const parsePassword = (hash: any): string => {
    try {
        const parsedPassword = parseGenericTextField(hash);
        return parsedPassword;
    } catch {
        throw new Error('Faulty password');
    }
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
            lengthInMinutes: parseLength(object.lengthInMinutes),
            tourName: parseName(object.tourName),
            maxNumberOfPeople: parseNumberOfPeople(object.maxNumberOfPeople),
            price: parsePrice(object.price),
        };

    if(object.tourInfo) {
        return {
            ...newTour,
            tourInfo: parseInfo(object.tourInfo)
        };
    } else {
        return newTour;
    }
    
};


export const toNewMuseum = (object: any): NewMuseum => {
    let newMuseum: NewMuseum =
        {
            museumName: parseName(object.museumName),
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
            location: parseLocation(object.location),
            lat: parseLatLong(object.lat),
            long: parseLatLong(object.long)
        };

    if(object.openInfo) {
        newMuseum = {
            ...newMuseum,
            openInfo: parseInfo(object.openInfo)
        };
    }

    if(object.museumInfo) {
        newMuseum = {
            ...newMuseum,
            museumInfo: parseInfo(object.museumInfo)
        };
    }
    if(object.image) {
        newMuseum = {
            ...newMuseum,
            image: parseImage(object.image)
        };
    }
    return newMuseum;
    
};

export const toNewUser = (object: any): NewUser => {
    const newUser: NewUser = {
        type: parseType(object.type),
        name: parseName(object.name),
        username: parseName(object.username),
        password: parsePassword(object.password),
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
        lengthInMinutes: parseLength(object.lengthInMinutes),
        tourName: parseName(object.tourName),
        maxNumberOfPeople: parseNumberOfPeople(object.maxNumberOfPeople),
        price: parsePrice(object.price),
        chosenLanguage: parseLanguage(object.chosenLanguage),
        groupName: parseName(object.groupName),
        numberOfPeople: parseNumberOfPeople(object.numberOfPeople),
        groupAge: parseInfo(object.groupAge),
        paymentMethod: parsePaymentMethod(object.paymentMethod),
        time: parseTime(object.time),
        date: parseDate(object.date),
        email: parseInfo(object.email),
        groupInfo: parseInfo(object.groupInfo),
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
            tourInfo: parseInfo(object.tourInfo)
        };
    }

    return tour;
};