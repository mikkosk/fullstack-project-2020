/* eslint-disable no-undef */
import mongoose, { Document } from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import UserMon from '../models/user';
import MuseumMon from '../models/museum';
//import initialTours from '../../data/guidedTours';
import initialUsers from '../../data/users';
import initialMuseums from '../../data/museums';
import { Museum } from '../types';

const api = supertest(app);
//let tourId: string;
let userId: string;
let museumId: string;
const newUser = {
    name: "Name",
    username: "Username",
    type: "Admin",
    password: "Password"
};
let savedMuseum: Museum & Document;

beforeEach(async () => {
    await UserMon.deleteMany({});
    await MuseumMon.deleteMany({});
    let user = new UserMon({...initialUsers[0], passwordHash: "HashOne", museums: []});
    await user.save();

    user = new UserMon({...initialUsers[1], passwordHash: "HashTwo"});
    await user.save();

    savedMuseum = new MuseumMon({...initialMuseums[0]});
    await savedMuseum.save();

    museumId = savedMuseum._id;
    userId = user._id;
  });

test('users are returned as json', async () => {
  await api
    .get('/user')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all users are returned initially', async () => {
    const res = await api.get('/user');
    expect(res.body).toHaveLength(initialUsers.length);
});

describe('adding a user', () => {

    test('increases length by one', async () => {
    
        await api.post(`/user`).send(newUser);
        
        const res = await api.get('/user');
    
        expect(res.body).toHaveLength(initialUsers.length + 1);
    });

});

describe('deleting a user', () => {

    test('deleting user removes an object', async() => {
        await api.delete(`/user/${userId}`);
        const res = await api.get('/user');
        expect(res.body).toHaveLength(initialUsers.length - 1);
    });
    
    test('deleting removes right object', async() => {
        await api.delete(`/user/${userId}`);
        const res = await api.get('/user');
        expect(!res.body.find((t: any) => t._id === userId)).toBeTruthy();
    });

});

describe('updating', () => {
    test('updated user is saved correctly', async() => {
        await api.put(`/user/${userId}`).send(newUser).expect(200);
        const res = await api.get('/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(userId)));
        delete updatedUser.__v;
        delete updatedUser._id;
        delete updatedUser.__v;
        delete updatedUser._id;
        delete updatedUser.passwordHash;
        delete updatedUser.museums;
        const initial = {...newUser};
        delete initial.password;
        expect(updatedUser).toEqual(initial);
    });
    
    test('updating user does not affect size', async() => {
        await api.put(`/user/${userId}`).send(newUser).expect(200);
        const res = await api.get('/user');
        expect(res.body).toHaveLength(initialUsers.length);
    });
    
    test('trying to update with faulty data does not work', async() => {
        const faultyUser = { 
            name: "NAMEname",
            username: 700,
            password: "Pass",
            type: "Type"
        };
        await api.put(`/user/${userId}`).send(faultyUser).expect(400);
        const res = await api.get('/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(userId)));
        delete updatedUser.__v;
        delete updatedUser._id;
        delete updatedUser.passwordHash;
        delete updatedUser.museums;
        const initial = {...initialUsers[1]};
        delete initial.password;
        expect(updatedUser).toEqual(initial);
    });

    test('adding user to museum works correctly', async() => {
        await api.put(`/user/${userId}/museum/${museumId}`).expect(200);
        const res = await api.get('/user');
        const updatedUser = (res.body.find((t: any) => t._id === String(userId)));
        expect(updatedUser.museums[0]._id === savedMuseum._id);
    });
});

afterAll(() => {
  mongoose.connection.close();
});