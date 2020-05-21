/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewTour, NewMuseum, NewUser, UserTypes } from "../types";

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

const isType = (type: any): type is "Customer" | "Admin" => {
    return Object.values(UserTypes).includes(type);
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

const parseType = (type: any): "Customer" | "Admin" => {
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
        };

    if(object.openInfo) {
        newMuseum = {
            ...newMuseum,
            openInfo: parseInfo(object.openInfo)
        };
    }

    if(object.openInfo) {
        newMuseum = {
            ...newMuseum,
            museumInfo: parseInfo(object.museumInfo)
        };
    }
    
    return newMuseum;
    
};

export const toNewUser = (object: any): NewUser => {
    const newUser: NewUser = {
        type: parseType(object.type),
        name: parseName(object.name),
        username: parseName(object.username),
        password: parsePassword(object.passwordHash)
    };

    return newUser;
};