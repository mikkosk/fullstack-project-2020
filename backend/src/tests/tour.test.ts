/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import TourMon from '../models/guidedTour';
import MuseumMon from '../models/museum';
import UserMon from '../models/user';
import initialTours from '../../data/guidedTours';
import initialMuseums from '../../data/museums';
import initialUsers from '../../data/users';
import jwt from 'jsonwebtoken';

const api = supertest(app);
let tourId: string;
let museumId: string;
let user;
let headers: {Authorization: string};
const newTour = {
    possibleLanguages: ["Venäjä"],
    lengthInMinutes: 45,
    tourName: "Uusi opastus",
    maxNumberOfPeople: 25,
    price: 600,
    tourInfo: "Opastus museoon"
};

beforeEach(async () => {
    await TourMon.deleteMany({});
    await MuseumMon.deleteMany({});
    await UserMon.deleteMany({});

    let noteObject = new TourMon(initialTours[0]);
    await noteObject.save();
  
    noteObject = new TourMon(initialTours[1]);
    await noteObject.save();
    tourId = noteObject._id;

    const museum = new MuseumMon({...initialMuseums[0], offeredTours: [tourId]});
    await museum.save();
    museumId = museum._id;

    user = new UserMon({...initialUsers[0], passwordHash: "HashOne", museums: [museumId]});
    await user.save();

    const {_id, username } = user;
    const token = {
        id: _id,
        user: username
    };
    if(!process.env.SECRET) {
         return;
    }
    const header = jwt.sign(token, process.env.SECRET);
    headers = {
        'Authorization': `bearer ${header}`
    };


  });

test('tours are returned as json', async () => {
  await api
    .get('/tour')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all tours are returned initially', async () => {
    const res = await api.get('/tour');
    expect(res.body).toHaveLength(initialTours.length);
});

describe('adding a tour', () => {

    test('increases length by one', async () => {
    
        await api.post(`/tour/museum/${museumId}`).set(headers).send(newTour);
        
        const res = await api.get('/tour');
    
        expect(res.body).toHaveLength(initialTours.length + 1);
    });

});

describe('deleting a tour', () => {

    test('deleting tour removes an object', async() => {
        await api.delete(`/tour/${tourId}/museum/${museumId}`).set(headers);
        const res = await api.get('/tour');
        expect(res.body).toHaveLength(initialTours.length - 1);
    });
    
    test('deleting removes right object', async() => {
        await api.delete(`/tour/${tourId}/museum/${museumId}`).set(headers);
        const res = await api.get('/tour');
        expect(!res.body.find((t: any) => t._id === tourId)).toBeTruthy();
    });

});

describe('updating', () => {
    test('updated tour is saved correctly', async() => {
        await api.put(`/tour/${tourId}/museum/${museumId}`).set(headers).send(newTour).expect(200);
        const res = await api.get('/tour');
        const updatedTour = (res.body.find((t: any) => t._id === String(tourId)));
        delete updatedTour.__v;
        delete updatedTour._id;
        expect(updatedTour).toEqual({...newTour});
    });
    
    test('updating tour does not affect size', async() => {
        await api.put(`/tour/${tourId}/museum/${museumId}`).set(headers).send(newTour).expect(200);
        const res = await api.get('/tour');
        expect(res.body).toHaveLength(initialTours.length);
    });
    
    test('trying to update with faulty data does not work', async() => {
        const faultyTour = {
            possibleLanguages: ["Venäjä"],
            lengthInMinutes: 45,
            tourName: "Uusi opastus",
            maxNumberOfPeople: 25,
            price: "ok",
            tourInfo: "Opastus museoon"
        };
        await api.put(`/tour/${tourId}/museum/${museumId}`).set(headers).send(faultyTour).expect(400);
        const res = await api.get('/tour');
        const updatedTour = (res.body.find((t: any) => t._id === String(tourId)));
        delete updatedTour.__v;
        delete updatedTour._id;
        expect(updatedTour).toEqual({...initialTours[1]});
    });
});



afterAll(() => {
  mongoose.connection.close();
});