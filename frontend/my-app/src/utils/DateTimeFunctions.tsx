import { Museum } from "../types"

export const museumHoursArray = (open: boolean, museum: Museum) => {
    const openingHours = [museum.open.mon, museum.open.tue, museum.open.wed, museum.open.thu, museum.open.fri, museum.open.sat, museum.open.sun]
    const closingHours = [museum.closed.mon, museum.closed.tue, museum.closed.wed, museum.closed.thu, museum.closed.fri, museum.closed.sat, museum.closed.sun]
    if(open) return openingHours
    else return closingHours
}

export const dateToSring = (date: Date) => {
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