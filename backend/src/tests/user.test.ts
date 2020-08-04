/* eslint-disable no-undef */
import mongoose, { Document } from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import UserMon from '../models/user';
import MuseumMon from '../models/museum';
import ReservedMon from '../models/reservedTour';
//import initialTours from '../../data/guidedTours';
import initialUsers from '../../data/users';
import initialMuseums from '../../data/museums';
import initialTours from '../../data/reservedTours';
import { Museum } from '../types';
import jwt from 'jsonwebtoken';

const api = supertest(app);
//let tourId: string;
let customerId: string;
let adminId: string;
let guideId: string;
let museumId: string;
const newUser = {
    name: "Name",
    username: "Username",
    type: "Admin",
    password: "Password"
};

const newTour = initialTours[0];
let savedMuseum: Museum & Document;
let customerHeaders: {Authorization: string};
let adminHeaders: {Authorization: string};
let guideHeaders: {Authorization: string};

beforeEach(async () => {
    await UserMon.deleteMany({});
    await MuseumMon.deleteMany({});
    await ReservedMon.deleteMany({});
    
    savedMuseum = new MuseumMon({...initialMuseums[0]});
    await savedMuseum.save();
    museumId = savedMuseum._id;

    const customer = new UserMon({...initialUsers[1], passwordHash: "HashTwo", reservedTours: []});
    await customer.save();

    const cToken = {
        id: customer._id,
        user: customer.username
    };

    customerId = customer._id;

    if(!process.env.SECRET) {
         return;
    }
    const header = jwt.sign(cToken, process.env.SECRET);
    customerHeaders = {
        'Authorization': `bearer ${header}`
    };

    const admin = new UserMon({...initialUsers[0], passwordHash: "HashOne", museums: [museumId]});
    await admin.save();
    const aToken = {
        id: admin._id,
        user: admin.username
    };

    adminId = admin._id;

    if(!process.env.SECRET) {
         return;
    }
    const aHeader = jwt.sign(aToken, process.env.SECRET);
    adminHeaders = {
        'Authorization': `bearer ${aHeader}`
    };

    const guide = new UserMon({...initialUsers[2], passwordHash: "HashThree", museums: [museumId], reservedTours: []});
    await guide.save();
    const gToken = {
        id: guide._id,
        user: guide.username
    };

    guideId = guide._id;

    if(!process.env.SECRET) {
         return;
    }
    const gHeader = jwt.sign(gToken, process.env.SECRET);
    guideHeaders = {
        'Authorization': `bearer ${gHeader}`
    };
    

    
  });

test('users are returned as json', async () => {
  await api
    .get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all users are returned initially', async () => {
    const res = await api.get('/api/user');
    expect(res.body).toHaveLength(initialUsers.length);
});

describe('adding a user', () => {

    test('increases length by one', async () => {
    
        await api.post(`/api/user`).set(adminHeaders).send(newUser);
        
        const res = await api.get('/api/user');
    
        expect(res.body).toHaveLength(initialUsers.length + 1);
    });

});

describe('deleting a user', () => {

    test('deleting user removes an object', async() => {
        await api.delete(`/api/user/${adminId}`).set(adminHeaders);
        const res = await api.get('/api/user');
        expect(res.body).toHaveLength(initialUsers.length - 1);
    });
    
    test('deleting removes right object', async() => {
        await api.delete(`/api/user/${adminId}`).set(adminHeaders);
        const res = await api.get('/api/user');
        expect(!res.body.find((t: any) => t._id === adminHeaders)).toBeTruthy();
    });

});

describe('updating', () => {
    test('updated user is saved correctly', async() => {
        await api.put(`/api/user/${adminId}`).set(adminHeaders).send(newUser).expect(200);
        const res = await api.get('/api/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(adminId)));
        delete updatedUser.__v;
        delete updatedUser._id;
        delete updatedUser.passwordHash;
        delete updatedUser.museums;
        delete updatedUser.reservedTours;
        delete updatedUser.languages;
        const initial = {...newUser};
        delete initial.password;
        expect(updatedUser).toEqual(initial);
    });
    
    test('updating user does not affect size', async() => {
        await api.put(`/api/user/${adminId}`).set(adminHeaders).send(newUser).expect(200);
        const res = await api.get('/api/user');
        expect(res.body).toHaveLength(initialUsers.length);
    });
    
    test('trying to update with faulty data does not work', async() => {
        const faultyUser = { 
            name: "NAMEname",
            username: 700,
            password: "Pass",
            type: "Type"
        };
        await api.put(`/api/user/${adminId}`).set(adminHeaders).send(faultyUser).expect(400);
        const res = await api.get('/api/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(adminId)));
        delete updatedUser.__v;
        delete updatedUser._id;
        delete updatedUser.passwordHash;
        delete updatedUser.museums;
        delete updatedUser.reservedTours;
        delete updatedUser.languages;
        const initial = {...initialUsers[0]};
        delete initial.password;
        expect(updatedUser).toEqual(initial);
    });

    test('adding user to museum works correctly', async() => {
        await api.put(`/api/user/${guideId}/museum/${museumId}`).set(adminHeaders).expect(200);
        const res = await api.get('/api/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(adminId)));
        expect(updatedUser.museums[0]._id === savedMuseum._id);
    });
});

describe("reserving tour", () => {
    
    test("adding works", async() => {
        const updatedUser = await api.post(`/api/user/${customerId}/museum/${museumId}/reservedtour`).set(customerHeaders).send(newTour).expect(200);
        expect(updatedUser.body.reservedTours.length).toBe(1);
        expect(updatedUser.body.reservedTours[0].tourName).toBe(newTour.tourName);
    });

    test("adding does not work if user is not a customer", async() => {
        await api.post(`/api/user/${guideId}/museum/${museumId}/reservedtour`).set(guideHeaders).send(newTour).expect(401);
        const res = await api.get('/api/user');
        const updatedUser = res.body.find((t: any) => t._id === String(guideId));
        expect(updatedUser.reservedTours.length).toBe(0);
    });
    
    
}); 

describe("confirming tour", () => {
    
    let id: string;

    test("guide can corfirm tour", async () => {
        const res1 = await api.post(`/api/user/${customerId}/museum/${museumId}/reservedtour`).set(customerHeaders).send({...newTour});
        id = res1.body.reservedTours[0]._id;
        await api.put(`/api/user/${guideId}/tour/${id}`).set(guideHeaders).expect(200);
        const res = await api.get('/api/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(guideId)));
        expect(updatedUser.reservedTours.length).toBe(1);
    });

    test("only guide can corfirm tour", async () => {
        const res1 = await api.post(`/api/user/${customerId}/museum/${museumId}/reservedtour`).set(customerHeaders).send({...newTour});
        id = res1.body.reservedTours[0]._id;
        await api.put(`/api/user/${adminId}/tour/${id}`).set(adminHeaders).expect(401);
        const res = await api.get('/api/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(guideId)));
        expect(updatedUser.reservedTours.length).toBe(0);
    });
});

afterAll(() => {
  mongoose.connection.close();
});