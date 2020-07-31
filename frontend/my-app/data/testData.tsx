import { RootState } from '../src/store'

export const initialStateEmpty: RootState = {
    login: {type: undefined, username: "", name: "", _id: "", passwordHash: "", token: ""},
    users: {
        finished: true,
        notification: {message: "", error: false},
        users: {}
    },
    tours: {
        finished: true,
        notification: {message: "", error: false},
        tours: {}
    },
    museums: {
        finished: true,
        notification: {message: "", error: false},
        museums: {}
    },
    notification: {notification: {message: "", error: false}}
}


export const initialStateEmptyTours: RootState = {
    login: {
        type: "Admin",
        token: "token",
        name: "Name",
        username: "username",
        passwordHash: "hash",
        _id: "User"
    },
    users: {
        finished: true,
        notification: {message: "", error: false},
        users: {
            "UserOne":{
                name: "One",
                type: "Admin",
                username: "One",
                passwordHash: "One",
                _id: "UserOne",
                museums: []
            }, 
            "UserTwo": {
                name: "Two",
                type: "Customer",
                username: "Two",
                passwordHash: "Two",
                _id: "UserTwo",
                reservedTours: []
            }
        }
    },
    tours: {
        finished: true,
        notification: {message: "", error: false},
        tours: {}
    },
    museums: {
        finished: true,
        notification: {message: "", error: false},
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
                image: undefined,
                location: "Location",
                offeredTours:[],
                openInfo: "Auki",
                museumInfo: "Museo",
                reservedTours: [],
                userRequests: []   
            }
        }
    },
    notification: {notification: {message: "", error: false}}
}

export const initialStateEmptyMuseums: RootState = {
    login: {
        type: "Admin",
        token: "token",
        name: "Name",
        username: "username",
        passwordHash: "hash",
        _id: "User"
    },
    users: {
        finished: true,
        notification: {message: "", error: false},
        users: {
            "UserOne":{
                name: "One",
                type: "Admin",
                username: "One",
                passwordHash: "One",
                _id: "UserOne",
                museums: []
            }, 
            "UserTwo": {
                name: "Two",
                type: "Customer",
                username: "Two",
                passwordHash: "Two",
                _id: "UserTwo",
                reservedTours: []
            }
        }
    },
    tours: {
        finished: true,
        notification: {message: "", error: false},
        tours: {"three": {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}}
    },
    museums: {
        finished: true,
        notification: {message: "", error: false},
        museums: {
        }
    },
    notification: {notification: {message: "", error: false}}
}

export const initialState: RootState = {
    login: {
        type: "Admin",
        token: "token",
        name: "Name",
        username: "username",
        passwordHash: "hash",
        _id: "User",
        museums: []
    },
    users: {
        finished: true,
        notification: {message: "", error: false},
        users: {
            "UserOne":{
                name: "One",
                type: "Admin",
                username: "One",
                passwordHash: "One",
                _id: "UserOne",
                museums: [{
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
                        mon: "12:00",
                        tue: "12:00",
                        wed: "12:00",
                        thu: "12:00",
                        fri: "12:00",
                        sat: "12:00",
                        sun: "12:00"
                        
                    },
                    image: undefined,
                    location: "Location",
                    offeredTours:[{lengthInMinutes: 2, 
                        maxNumberOfPeople:2, 
                        possibleLanguages: ["Two"],
                        price: 1, 
                        tourName: "Two", 
                        tourInfo: "Two", 
                        _id: "three"}],
                    openInfo: "Auki",
                    museumInfo: "Museo",
                    userRequests: [],
                    reservedTours: [
                        {_id:"testi",
                        possibleLanguages:["Kieli"],
                        lengthInMinutes:3,
                        tourName:"Testi",
                        maxNumberOfPeople:2,
                        price:2,
                        tourInfo:"Ei infoa saatavilla",
                        chosenLanguage:"Kieli",
                        groupName:"ryhmä",
                        numberOfPeople:1,
                        groupAge:"ikä",
                        paymentMethod:"Cash",
                        time:"03:00",
                        date: new Date(),
                        email:"Sähköposti",
                        groupInfo:"Info",
                        guide: {
                            id: "",
                            name: ""
                        },
                        salary:0,
                        confirmed:false,
                        museum: {
                            id: "iidee",
                            name: "testi"
                        }
                    }
                    ]     
                }]
            }, 
            "UserTwo": {
                name: "Two",
                type: "Customer",
                username: "Two",
                passwordHash: "Two",
                _id: "UserTwo",
                reservedTours: [
                    {_id:"testi",
                    possibleLanguages:["Kieli"],
                    lengthInMinutes:3,
                    tourName:"Testi",
                    maxNumberOfPeople:2,
                    price:2,
                    tourInfo:"Ei infoa saatavilla",
                    chosenLanguage:"Kieli",
                    groupName:"ryhmä",
                    numberOfPeople:1,
                    groupAge:"ikä",
                    paymentMethod:"Cash",
                    time:"03:00",
                    date: new Date(),
                    email:"Sähköposti",
                    groupInfo:"Info",
                    guide: {
                        id: "",
                        name: ""
                    },
                    salary:0,
                    confirmed:false,
                    museum: {
                        id: "iidee",
                        name: "testi"
                    }
                }
                ]  
            }
        }
    },
    tours: {
        finished: true,
        notification: {message: "", error: false},
        tours: {"three": {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}}
    },
    museums: {
        finished: true,
        notification: {message: "", error: false},
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
                    mon: "12:00",
                    tue: "12:00",
                    wed: "12:00",
                    thu: "12:00",
                    fri: "12:00",
                    sat: "12:00",
                    sun: "12:00"
                    
                },
                image: undefined,
                location: "Location",
                offeredTours:[
                    {lengthInMinutes: 2, 
                    maxNumberOfPeople:2, 
                    possibleLanguages: ["Two"],
                    price: 1, 
                    tourName: "Two", 
                    tourInfo: "Two", 
                    _id: "three"}
                ],
                openInfo: "Auki",
                museumInfo: "Museo",
                userRequests: [],
                reservedTours: [
                    {_id:"testi",
                    possibleLanguages:["Kieli"],
                    lengthInMinutes:3,
                    tourName:"Testi",
                    maxNumberOfPeople:2,
                    price:2,
                    tourInfo:"Ei infoa saatavilla",
                    chosenLanguage:"Kieli",
                    groupName:"ryhmä",
                    numberOfPeople:1,
                    groupAge:"ikä",
                    paymentMethod:"Cash",
                    time:"03:00",
                    date: new Date(),
                    email:"Sähköposti",
                    groupInfo:"Info",
                    guide: {
                        id: "",
                        name: ""
                    },
                    salary:0,
                    confirmed:false,
                    museum: {
                        id: "iidee",
                        name: "testi"
                    }}
                ]   
            }
        }
    },
    notification: {notification: {message: "", error: false}}
}

export const initialStateCustomer: RootState = {
    ...initialState,
    login: {
        name: "Two",
        type: "Customer",
        username: "Two",
        passwordHash: "Two",
        _id: "UserTwo",
        museums: [],
        token: "token"
    }
}

export const initialStateAdmin: RootState = {
    ...initialState,
    login: {
        name: "One",
        type: "Admin",
        username: "One",
        passwordHash: "One",
        _id: "UserOne",
        museums: [],
        token: "token"
    }
}


