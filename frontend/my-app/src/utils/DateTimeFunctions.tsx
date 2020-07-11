import { Museum } from "../types"

export const museumHoursArray = (open: boolean, museum: Museum) => {
    const openingHours = [museum.open.sun, museum.open.mon, museum.open.tue, museum.open.wed, museum.open.thu, museum.open.fri, museum.open.sat]
    const closingHours = [museum.closed.sun, museum.closed.mon, museum.closed.tue, museum.closed.wed, museum.closed.thu, museum.closed.fri, museum.closed.sat]
    if(open) return openingHours
    else return closingHours
}

export const dateToString = (dateOrg: Date) => {
    const date = new Date(dateOrg)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}

export const addTime = (time: string, number: number) => {
    let hours = parseInt(time.slice(0,2), 10)
    let minutes = parseInt(time.slice(3,5), 10)

    hours = hours + (number - (number % 60)) / 60
    minutes = minutes + number % 60

    if(minutes < 0) {
        hours = hours - 1
        minutes = 60 + minutes
    }
    if(minutes > 59) {
        hours = hours + 1
        minutes = 0 + minutes - 60
    }
    let hoursString = hours.toString()
    let minutesString = minutes.toString()

    if(hours < 0) {
        hours = 0
    }

    if(hours > 23) {
        hours = 23
        minutes = 59
    }

    if(hours < 10) {
        hoursString = `0${hours}`
    }
    if(minutes < 10) {
        minutesString = `0${minutes}`
    }


    return `${hoursString}:${minutesString}`
}

export const compareTime = (time: string, compare: string) => {
    let hours = parseInt(time.slice(0,2), 10)
    let minutes = parseInt(time.slice(3,5), 10)
    let cHours = parseInt(compare.slice(0,2), 10)
    let cMinutes = parseInt(compare.slice(3,5), 10)

    if(hours === cHours && minutes === cMinutes) return 0
    if(hours > cHours) return 1
    if(hours < cHours) return -1
    if(minutes > cMinutes) return 1
    return -1 
}

export const isTime = (time: string): boolean => {
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