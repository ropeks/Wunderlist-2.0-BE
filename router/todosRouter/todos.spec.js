const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');

// helpers

const dummyTodo = {
    "caption": "test todo",
    "description": "test test test test test test test test test",
    "due_date": [2019, 8, 2, 12]
};

const ropeksData = {
    "username": "ropeks",
    "password": "1234"
};

// tests

describe('Todos Router', () => {

    beforeEach(async () => {
        await db('todos').truncate();
    });

    describe('POST /api/todos', () => {

        it('should return 200 status code if successful', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const response = await request(server)
                .post('/api/todos')
                .send(dummyTodo)
                .set({ Authorization: token, UserID: userID });
            expect(response.status).toBe(200);
        });

        it('should return json object if successful', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const response = await request(server)
                .post('/api/todos')
                .send(dummyTodo)
                .set({ Authorization: token, UserID: userID });
            expect(response.type).toBe('application/json');
        });

        it('should return created todo if successful', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const response = await request(server)
                .post('/api/todos')
                .send(dummyTodo)
                .set({ Authorization: token, UserID: userID });
            expect(response.body.caption).toBe(dummyTodo.caption);
        });

        it('should return 401 status code if you don\'t provide caption, description and due_date', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const response = await request(server)
                .post('/api/todos')
                .send({})
                .set({ Authorization: token, UserID: userID });
            expect(response.status).toBe(401);
        });

        it('should return 401 status code if you don\'t add token and userID to request headers', async () => {
            const response = await request(server)
                .post('/api/todos')
                .send(ropeksData)
                .set({});
            expect(response.status).toBe(401);
        });

    });

    describe('GET /api/todos', () => {

        it('should return 200 status code if successful', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const response = await request(server)
                .get('/api/todos')
                .set({ Authorization: token, UserID: userID });
            expect(response.status).toBe(200);
        });

        it('should return json object if successful', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const response = await request(server)
                .get('/api/todos')
                .set({ Authorization: token, UserID: userID });
            expect(response.type).toBe('application/json');
        });

        it('should return all todos if successful', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send(ropeksData);
            const token = login.body.token;
            const userID = login.body.userID;
            const user = await request(server)
                .post('/api/todos')
                .send(dummyTodo)
                .set({ Authorization: token, UserID: userID });
            const response = await request(server)
                .get('/api/todos')
                .set({ Authorization: token, UserID: userID });
            expect(response['body'][0]['caption']).toBe(dummyTodo.caption);
        });

        it('should return 401 status code if you don\'t add token and userID to request headers', async () => {
            const response = await request(server)
                .get('/api/todos')
                .set({});
            expect(response.status).toBe(401);
        });
        
    });
    describe('GET /api/todos/:id', () => {

    });
    describe('DELETE /api/todos/:id', () => {

    });
    describe('PUT /api/todos/:id', () => {

    });
    describe('GET /api/todos/deleted', () => {

    });
    describe('GET /api/todos/completed', () => {

    });
});