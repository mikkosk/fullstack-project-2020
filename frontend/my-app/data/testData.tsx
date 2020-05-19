import { RootState } from '../src/store'

export const initialStateEmpty: RootState = {
    tours: {
        tours: {}
    },
    museums: {
        museums: {}
    }
}

export const initialStateEmptyTours: RootState = {
    tours: {
        tours: {}
    },
    museums: {
        museums: {
            "iidee": {
                _id: "iidee",
                museumName: "testi",
                open: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                },
                closed: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                    
                },
                offeredTours:[],
                openInfo: "Auki",
                museumInfo: "Museo"   
            }
        }
    }
}

export const initialStateEmptyMuseums: RootState = {
    tours: {
        tours: {"three": {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}}
    },
    museums: {
        museums: {}
    }
}