/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Tour from '../models/guidedTour';
import initialTours from '../../data/guidedTours';

const api = supertest(app);
let id: string;
const newTour = {
    possibleLanguages: ["Venäjä"],
    lengthInMinutes: 45,
    tourName: "Uusi opastus",
    maxNumberOfPeople: 25,
    price: 600,
    tourInfo: "Opastus museoon"
};

beforeEach(async () => {
    await Tour.deleteMany({});
  
    let noteObject = new Tour(initialTours[0]);
    await noteObject.save();
  
    noteObject = new Tour(initialTours[1]);
    await noteObject.save();
    id = noteObject._id;
  });

test('tours are returned as json', async () => {
  await api
    .get('/museum')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all tours are returned initially', async () => {
    const res = await api.get('/museum');
    expect(res.body).toHaveLength(initialTours.length);
});

describe('adding a tour', () => {

    test('increases length by one', async () => {
    
        await api.post('/museum').send(newTour);
        
        const res = await api.get('/museum');
    
        expect(res.body).toHaveLength(initialTours.length + 1);
    });

});

describe('deleting a tour', () => {

    test('deleting tour removes an object', async() => {
        await api.delete(`/museum/${id}`);
        const res = await api.get('/museum');
        expect(res.body).toHaveLength(initialTours.length - 1);
    });
    
    test('deleting removes right object', async() => {
        await api.delete(`/museum/${id}`);
        const res = await api.get('/museum');
        expect(!res.body.find((t:any) => t._id === id)).toBeTruthy();
    });

});

describe('updating', () => {
    test('updated tour is saved correctly', async() => {
        await api.put(`/museum/${id}`).send(newTour).expect(200);
        const res = await api.get('/museum');
        const updatedTour = (res.body.find((t: any) => t._id === String(id)));
        delete updatedTour.__v;
        delete updatedTour._id;
        expect(updatedTour).toEqual({...newTour});
    });
    
    test('updating tour does not affect size', async() => {
        await api.put(`/museum/${id}`).send(newTour).expect(200);
        await api.post('/museum').send(newTour);
        const res = await api.get('/museum');
        expect(res.body).toHaveLength(initialTours.length + 1);
    });
    
    test('trying to update with faulty id does not work', async() => {
        await api.put(`/museum/faultyId`).send(newTour).expect(400);
        const res = await api.get('/museum');
        const updatedTour = (res.body.find((t: any) => t._id === String(id)));
        delete updatedTour.__v;
        delete updatedTour._id;
        expect(updatedTour).toEqual({...initialTours[1]});
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
        await api.put(`/museum/${id}`).send(faultyTour).expect(400);
        const res = await api.get('/museum');
        const updatedTour = (res.body.find((t: any) => t._id === String(id)));
        delete updatedTour.__v;
        delete updatedTour._id;
        expect(updatedTour).toEqual({...initialTours[1]});
    });
});



afterAll(() => {
  mongoose.connection.close();
});