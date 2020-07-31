import express from 'express';
import UserMon from '../models/user';
import ReservedMon from '../models/reservedTour';
import TourMon from '../models/guidedTour';
import MuseumMon from '../models/museum';
import { GuidedTour, NewTour, NewMuseum, ReservedTour, NewUser } from '../types';
import museum from '../models/museum';
import bcrypt from 'bcrypt';

const router = express.Router();

const guidedTour1Cy: NewTour = {
    possibleLanguages: ["Suomi", "Englanti"],
    lengthInMinutes: 60,
    tourName: "Lasten kierros",
    maxNumberOfPeople: 25,
    price: 60
};

const guidedTour2Cy: NewTour = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50
};

const museumNoToursCy: NewMuseum = {
    museumName: "Tyhjä museo",
    open: {
        mon: "closed",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "closed",
        tue: "16:00",
        wed: "16:00",
        thu: "16:00",
        fri: "16:00",
        sat: "16:00",
        sun: "16:00" 
    },
    openInfo: "Suljettu maanantaisin",
    museumInfo: "Pikkuruinen museo",
    location: "location",
    image: undefined
};

const museumNoReservedCy: NewMuseum = {
    museumName: "Varaamaton museo",
    open: {
        mon: "closed",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "closed",
        tue: "16:00",
        wed: "16:00",
        thu: "16:00",
        fri: "16:00",
        sat: "16:00",
        sun: "16:00" 
    },
    openInfo: "Suljettu maanantaisin",
    museumInfo: "Museo kaipaa varauksia",
    location: "location",
    image: undefined
};

const museumReservedCy: NewMuseum = {
    museumName: "Museo",
    open: {
        mon: "closed",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "closed",
        tue: "16:00",
        wed: "16:00",
        thu: "16:00",
        fri: "16:00",
        sat: "16:00",
        sun: "16:00" 
    },
    openInfo: "Suljettu maanantaisin",
    museumInfo: "Täällä kaikki hyvin",
    location: "location",
    image: undefined
};

const reservedTour1Cy: Omit<ReservedTour, '_id'> = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50,
    chosenLanguage: "Suomi",
    groupName: "Vantaan koulu",
    numberOfPeople: 10,
    groupAge: "Koululaisia",
    paymentMethod: "Card",
    time: "10:00",
    date: new Date(),
    email: "email@email.com",
    groupInfo: "Koululaisryhmä",
    guide: {
        name: "",
        id: ""
    },
    confirmed: false,
    museum: {
        name: "",
        id: ""
    }
};

const reservedTour2Cy: Omit<ReservedTour, '_id'> = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50,
    chosenLanguage: "Ruotsi",
    groupName: "Kauniaisten koulu",
    numberOfPeople: 15,
    groupAge: "Koululaisia",
    paymentMethod: "Cash",
    time: "12:00",
    date: new Date(2022, 10, 10),
    email: "email@email.com",
    groupInfo: "Koululaisryhmä",
    guide: {
        name: "",
        id: ""
    },
    confirmed: false,
    museum: {
        name: "",
        id: ""
    }
};

const reservedTour3Cy: Omit<ReservedTour, '_id'> = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50,
    chosenLanguage: "Ruotsi",
    groupName: "Kauniaisten koulu",
    numberOfPeople: 15,
    groupAge: "Koululaisia",
    paymentMethod: "Cash",
    time: "12:00",
    date: new Date(2022, 12, 12),
    email: "email@email.com",
    groupInfo: "Koululaisryhmä",
    guide: {
        name: "",
        id: ""
    },
    confirmed: false,
    museum: {
        name: "",
        id: ""
    }
};

const customerEmptyCy: NewUser = {
    name: "CustomerOne",
    type: "Customer",
    username: "CustomerOne",
    password: "CustomerOne",
    languages: []
};

const customerReservedCy: NewUser = {
    name: "CustomerTwo",
    type: "Customer",
    username: "CustomerTwo",
    password: "CustomerTwo",
    languages: []
};

const admin1Cy: NewUser = {
    name: "AdminOne",
    type: "Admin",
    username: "AdminOne",
    password: "AdminOne",
    languages: []

};

const admin2Cy: NewUser = {
    name: "AdminTwo",
    type: "Admin",
    username: "AdminTwo",
    password: "AdminTwo",
    languages: []
};


const guideEmptyCy: NewUser = {
    name: "GuideOne",
    type: "Guide",
    username: "GuideOne",
    password: "GuideOne",
    languages: ["Suomi"]

};

const guideReservedCy: NewUser = {
    name: "GuideTwo",
    type: "Guide",
    username: "GuideTwo",
    password: "GuideTwo",
    languages: ["Suomi"]
};





router.post('/reset', async (_req, res) => {
    await UserMon.deleteMany({});
    await ReservedMon.deleteMany({});
    await TourMon.deleteMany({});
    await MuseumMon.deleteMany({});

    const tour1 =await new TourMon({...guidedTour1Cy}).save();
    const tour2 = await new TourMon({...guidedTour2Cy}).save();
    const reservedTour1 = await new ReservedMon({...reservedTour1Cy}).save();
    const reservedTour2 = await new ReservedMon({...reservedTour2Cy}).save();
    const reservedTour3 = await new ReservedMon({...reservedTour3Cy}).save();
    const guide1 = await new UserMon({...guideEmptyCy, museums: [], reservedTours: [], passwordHash: await bcrypt.hash(guideEmptyCy.password, 10)}).save();
    const museum1 = await new MuseumMon({...museumNoToursCy}).save();
    const museum2 = await new MuseumMon({...museumNoReservedCy, offeredTours: [tour1], reservedTours: [], userRequests: [guide1]}).save();
    const museum3 = await new MuseumMon({...museumReservedCy, offeredTours: [tour2], reservedTours: [reservedTour1, reservedTour2, reservedTour3], userRequests: [guide1]}).save();
    const customer1 = await new UserMon({...customerEmptyCy, museums: [], reservedTours: [], passwordHash: await bcrypt.hash(customerEmptyCy.password, 10)}).save();
    const customer2 = await new UserMon({...customerReservedCy, museums: [], reservedTours: [reservedTour1, reservedTour2], passwordHash: await bcrypt.hash(customerReservedCy.password, 10)}).save();
    const admin1 = await new UserMon({...admin1Cy, museums: [museum1], reservedTours: [], passwordHash: await bcrypt.hash(admin1Cy.password, 10)}).save();
    const admin2 = await new UserMon({...admin2Cy, museums: [museum2, museum3], reservedTours: [], passwordHash: await bcrypt.hash(admin2Cy.password, 10)}).save();
    const guide2 = await new UserMon({...guideReservedCy, museums: [museum2, museum3], reservedTours: [reservedTour1, reservedTour2], passwordHash: await bcrypt.hash(guideReservedCy.password, 10)}).save();
    await ReservedMon.findByIdAndUpdate(reservedTour1._id, {guide: {name: guide2.name, id: guide2._id}, confirmed: true, museum: {name: museum3.museumName, id: museum3._id}});
    await ReservedMon.findByIdAndUpdate(reservedTour2._id, {guide: {name: guide2.name, id: guide2._id}, confirmed: true, museum: {name: museum3.museumName, id: museum3._id}});
    res.status(200).end();
});

export default router;
