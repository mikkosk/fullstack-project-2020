/* eslint-disable no-undef */
 
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import TourMon from '../models/guidedTour';
import MuseumMon from '../models/museum';
import UserMon from '../models/user';
import initialMuseums from '../../data/museums';
import initialUsers from '../../data/users';
import { Museum } from '../types';
import jwt from 'jsonwebtoken';

const api = supertest(app);
let museumId: string;
let customerHeaders: {Authorization: string};
let adminHeaders: {Authorization: string};
let guideHeaders: {Authorization: string};
let customerId: string;
let guideId: string;
const newMuseumAdd = {
    museumName: "Uusi",
    open: JSON.stringify({
        mon: "10:00",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    }),
    closed: JSON.stringify({
        mon: "10:00",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00" 
    }),
    openInfo: "Auki",
    museumInfo: "Museo",
    location: "location",
    long: 0,
    lat: 0
};

const newMuseumUpdate = {
    ...newMuseumAdd,
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
    }
};

beforeEach(async () => {
    await TourMon.deleteMany({});
    await MuseumMon.deleteMany({});
    await UserMon.deleteMany({});

    let museum = new MuseumMon({...initialMuseums[0], offeredTours: []});
    await museum.save();
    museum = new MuseumMon({...initialMuseums[1], offeredTours: []});
    await museum.save();
    museumId = museum._id;

    if(!process.env.SECRET) {
         return;
    }


    const admin = new UserMon({...initialUsers[0], passwordHash: "HashOne", museums: [museumId]});
    await admin.save();
    const aToken = {
        id: admin._id,
        user: admin.username
    };

    const aHeader = jwt.sign(aToken, process.env.SECRET);
    adminHeaders = {
        'Authorization': `bearer ${aHeader}`
    };


    const customer = new UserMon({...initialUsers[1], passwordHash: "HashTwo", reservedTours: []});
    await customer.save();

    const cToken = {
        id: customer._id,
        user: customer.username
    };

    const header = jwt.sign(cToken, process.env.SECRET);
    customerHeaders = {
        'Authorization': `bearer ${header}`
    };

    customerId = customer._id;


    const guide = new UserMon({...initialUsers[2], passwordHash: "HashThree", museums: [], reservedTours: []});
    await guide.save();
    const gToken = {
        id: guide._id,
        user: guide.username
    };

    guideId = guide._id;

    const gHeader = jwt.sign(gToken, process.env.SECRET);
    guideHeaders = {
        'Authorization': `bearer ${gHeader}`
    };
  });

test('museums are returned as json', async () => {
  await api
    .get('/api/museum')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all museums are returned initially', async () => {
    const res = await api.get('/api/museum');
    expect(res.body).toHaveLength(initialMuseums.length);
});

describe('adding a museum', () => {
    beforeEach(async () => {
        await api.post(`/api/museum`).set(adminHeaders).send(newMuseumAdd).expect(200);
    });
    test('increases length by one', async () => {
        const res = await api.get('/api/museum');
        expect(res.body).toHaveLength(initialMuseums.length + 1);
        
    });

});

describe('deleting a museum', () => {

    test('deleting museum removes an object', async() => {
        await api.delete(`/api/museum/${museumId}`).set(adminHeaders);
        const res = await api.get('/api/museum');
        expect(res.body).toHaveLength(initialMuseums.length - 1);
    });
    
    test('deleting removes right object', async() => {
        await api.delete(`/api/museum/${museumId}`).set(adminHeaders);
        const res = await api.get('/api/museum');
        expect(!res.body.find((t: any) => t._id === museumId)).toBeTruthy();
    });

});

describe('updating', () => {
    test('updated museum is saved correctly', async() => {
        await api.put(`/api/museum/${museumId}`).set(adminHeaders).send(newMuseumUpdate).expect(200);
        const res = await api.get('/api/museum');
        const updatedMuseum = (res.body.find((t: any) => t._id === String(museumId)));
        delete updatedMuseum.__v;
        delete updatedMuseum._id;
        expect(updatedMuseum).toEqual({...newMuseumUpdate, offeredTours: [], reservedTours: [], userRequests: []});
    });
    
    test('updating museum does not affect size', async() => {
        await api.put(`/api/museum/${museumId}`).set(adminHeaders).send(newMuseumUpdate).expect(200);
        const res = await api.get('/api/museum');
        expect(res.body).toHaveLength(initialMuseums.length);
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
            museumInfo: "Museo",
            location: "location",
            long: 0,
            lat: 0
        };
        await api.put(`/api/museum/${museumId}`).set(adminHeaders).send(faultyMuseum).expect(400);
        const res = await api.get('/api/museum');
        const updatedMuseum = (res.body.find((t: any) => t._id === String(museumId)));
        delete updatedMuseum.__v;
        delete updatedMuseum._id;
        expect(updatedMuseum).toEqual({...initialMuseums[1], offeredTours: [], reservedTours: [], userRequests: []});
    });
});

describe("request", () => {

    test('adding request works on right type', async() => {
        await api.put(`/api/museum/${museumId}/request`).set(guideHeaders).send({id: guideId}).expect(200);
        const res = await api.get('/api/museum');
        const updatedMuseum: Museum = (res.body.find((t: any) => t._id === String(museumId)));
        expect(updatedMuseum.userRequests.length).toEqual(1);
        expect(String(updatedMuseum.userRequests[0]._id)).toBe(String(guideId));
    });

    test('adding request will not work on wrong type', async() => {
        await api.put(`/api/museum/${museumId}/request`).set(customerHeaders).send({id: customerId}).expect(400);
    });

    test('removing request works if museum admin', async () => {
        await api.put(`/api/museum/${museumId}/request`).set(guideHeaders).send({id: guideId}).expect(200);
        await api.put(`/api/museum/${museumId}/request/remove`).set(adminHeaders).send({id: guideId}).expect(200);
        const res = await api.get('/api/museum');
        const updatedMuseum: Museum = (res.body.find((t: any) => t._id === String(museumId)));
        expect(updatedMuseum.userRequests.length).toEqual(0);
    });

    test('removing request will not work if not museum admin', async () => {
        await api.put(`/api/museum/${museumId}/request`).set(guideHeaders).send({id: guideId}).expect(200);
        await api.put(`/api/museum/${museumId}/request/remove`).set(customerHeaders).send({id: guideId}).expect(401);
    });
});

test('updating is not possible with faulty headers', async() => {
    await api.put(`/api/museum/${museumId}`).set(customerHeaders).send(newMuseumUpdate).expect(401);
});
test('posting is not possible', async() => {
    const res = await api.post(`/api/museum`).set(customerHeaders).send(newMuseumAdd);
    expect(res.status).toBe(401);
});
test('deleting is not possible', async() => {
    const result = await api.delete(`/api/museum/${museumId}`).set(customerHeaders);
    expect(result.status).toBe(401);
});



afterAll(() => {
  mongoose.connection.close();
});
