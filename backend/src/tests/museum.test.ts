/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import TourMon from '../models/guidedTour';
import MuseumMon from '../models/museum';
//import initialTours from '../../data/guidedTours';
import initialMuseums from '../../data/museums';

const api = supertest(app);
//let tourId: string;
let museumId: string;
const newMuseum = {
    museumName: "Uusi",
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
    openInfo: "Auki",
    museumInfo: "Museo"

};

beforeEach(async () => {
    await TourMon.deleteMany({});
    await MuseumMon.deleteMany({});
    let museum = new MuseumMon({...initialMuseums[0], offeredTours: []});
    await museum.save();

    museum = new MuseumMon({...initialMuseums[1], offeredTours: []});
    await museum.save();

    museumId = museum._id;
  });

test('museums are returned as json', async () => {
  await api
    .get('/museum')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all museums are returned initially', async () => {
    const res = await api.get('/museum');
    expect(res.body).toHaveLength(initialMuseums.length);
});

describe('adding a museum', () => {

    test('increases length by one', async () => {
    
        await api.post(`/museum`).send(newMuseum);
        
        const res = await api.get('/museum');
    
        expect(res.body).toHaveLength(initialMuseums.length + 1);
    });

});

describe('deleting a museum', () => {

    test('deleting museum removes an object', async() => {
        await api.delete(`/museum/${museumId}`);
        const res = await api.get('/museum');
        expect(res.body).toHaveLength(initialMuseums.length - 1);
    });
    
    test('deleting removes right object', async() => {
        await api.delete(`/museum/${museumId}`);
        const res = await api.get('/museum');
        expect(!res.body.find((t: any) => t._id === museumId)).toBeTruthy();
    });

});

describe('updating', () => {
    test('updated museum is saved correctly', async() => {
        await api.put(`/museum/${museumId}`).send(newMuseum).expect(200);
        const res = await api.get('/museum');
        const updatedMuseum = (res.body.find((t: any) => t._id === String(museumId)));
        delete updatedMuseum.__v;
        delete updatedMuseum._id;
        delete updatedMuseum.offeredTours;
        expect(updatedMuseum).toEqual({...newMuseum});
    });
    
    test('updating museum does not affect size', async() => {
        await api.put(`/museum/${museumId}`).send(newMuseum).expect(200);
        await api.post('/museum').send(newMuseum);
        const res = await api.get('/museum');
        expect(res.body).toHaveLength(initialMuseums.length);
    });
    
    test('trying to update with faulty id does not work', async() => {
        await api.put(`/museum/faultyId`).send(newMuseum).expect(400);
        const res = await api.get('/museum');
        const updatedMuseum = (res.body.find((t: any) => t._id === String(museumId)));
        delete updatedMuseum.__v;
        delete updatedMuseum._id;
        delete updatedMuseum.offeredTours;
        expect(updatedMuseum).toEqual({...initialMuseums[1]});
    });
    
    test('trying to update with faulty data does not work', async() => {
        const faultyMuseum = { 
            museumName: "Faulty",
            open: {
                mon: "10K00",
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
            openInfo: "Auki",
            museumInfo: "Museo"
        };
        await api.put(`/museum/${museumId}`).send(faultyMuseum).expect(400);
        const res = await api.get('/museum');
        const updatedMuseum = (res.body.find((t: any) => t._id === String(museumId)));
        delete updatedMuseum.__v;
        delete updatedMuseum._id;
        delete updatedMuseum.offeredTours;
        expect(updatedMuseum).toEqual({...initialMuseums[1]});
    });
});



afterAll(() => {
  mongoose.connection.close();
});