import { GuidedTour } from "../src/types";

const tours: GuidedTour[] = [
    {
        id: "asdfgh",
        possibleLanguages: ["Suomi", "Englanti"],
        lengthInMinutes: 45,
        tourName: "Lasten opastus",
        maxNumberOfPeople: 25,
        price: 60,
        tourInfo: "Opastus lapsille museoon"
    },
    {
        id: "123456",
        possibleLanguages: ["Englanti"],
        lengthInMinutes: 60,
        tourName: "Opastus turisteille",
        maxNumberOfPeople: 20,
        price: 1000,
        tourInfo: "Opastus turisteille museoon"
    }
];

export default tours;