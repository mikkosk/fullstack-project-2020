/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewTour } from "./types";

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

const parseLanguages = (languages: any): string[] => {
    if(!languages || !Array.isArray(languages)) {
        throw new Error('Incorrect or missing list of languages');
    }
    languages.forEach((l: any): string => parseLanguage(l));
    return languages;
};

export const toNewTour = (object: any): NewTour => {
    const newTour =
        {
            possibleLanguages: parseLanguages(object.possibleLanguages),
            lengthInMinutes: parseLength(object.lengthInMinutes),
            type: parseType(object.type),
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
    
}