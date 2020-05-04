/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Tour from '../models/guidedTour';
import initialTours from '../../data/guidedTours';

const api = supertest(app);

beforeEach(async () => {
    await Tour.deleteMany({});
  
    let noteObject = new Tour(initialTours[0]);
    await noteObject.save();
  
    noteObject = new Tour(initialTours[1]);
    await noteObject.save();
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

    test('adding a tour increases length by one', async () => {
        const newTour = {
            possibleLanguages: ["Venäjä"],
            lengthInMinutes: 45,
            tourName: "Uusi opastus",
            maxNumberOfPeople: 25,
            price: 600,
            tourInfo: "Opastus museoon"
        };
    
        await api.post('/museum').send(newTour);
        
        const res = await api.get('/museum');
    
        expect(res.body).toHaveLength(initialTours.length + 1);
    });

});


afterAll(() => {
  mongoose.connection.close();
});