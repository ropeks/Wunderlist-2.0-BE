const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');

const dummyUser = {
    "username": "test-user",
    "password": "test"
};

describe('Authentication Router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    describe('/register route', () => {
        it('should return 201 status code if successful', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send(dummyUser);
            expect(response.status).toBe(201);
        });
        it('should return json object if successful', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send(dummyUser);
            expect(response.type).toBe('application/json');
        });
        it('should return greeting message if successful', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send(dummyUser);
            expect(response.body.message).toBe(`Hey ${dummyUser.username}!`);
        });
        it('should return 401 status code if you don\'t provide username or password', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send({});
            expect(response.status).toBe(401);
        });
    });
    describe('/login route', () => {
        it('should return 201 status code if successful', async () => {
            await request(server).post('/api/auth/register').send(dummyUser);
            const response = await request(server)
                .post('/api/auth/login')
                .send(dummyUser);
            expect(response.status).toBe(201);
        });
        it('should return json object if successful', async () => {
            await request(server).post('/api/auth/register').send(dummyUser);
            const response = await request(server)
                .post('/api/auth/login')
                .send(dummyUser);
            expect(response.type).toBe('application/json');
        });
        it('should return greeting message if successful', async () => {
            await request(server).post('/api/auth/register').send(dummyUser);
            const response = await request(server)
                .post('/api/auth/login')
                .send(dummyUser);
            expect(response.body.message).toBe(`Welcome back ${dummyUser.username}!`);
        });
        it('should return 401 status code if you don\'t provide username or password', async () => {
            await request(server).post('/api/auth/register').send(dummyUser);
            const response = await request(server)
                .post('/api/auth/login')
                .send({});
            expect(response.status).toBe(401);
        });
    });
});