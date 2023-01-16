const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Test client', () => {
    let accessToken
    beforeAll(async() => {
        mongoConnect();

        const response = await request(app)
            .post('/auth/client/token')
            .send({
                email: "test@gmail.com",
                password: "Password!123456"
            })
                    
        accessToken = response.body.accessToken;
    });

    afterAll(() => {
        mongoDisconnect()
    })

    describe('Test POST /client/questionary', () => {
        test('It should respont with 400', async() => {
            const response = await request(app)
                .post('/client/questionary')
                .set('authorization', 'bearer ' + accessToken)
                .send({
                    place: "Berlin",
                    jobCategory: {
                        kitchen: true,
                        livingroom: true,
                        bedroom: true,
                        bathroom: false,
                        terrace: false,
                        other: true
                    },
                    area: "0-20",
                    impression: "B",
                    budget: "10000-15000",
                    start: "ASAP",
                    contact: {
                        platform: true,
                        email: true,
                        phone: true
                    }
                })
                .expect(400)
        })
    })

    describe('Test GET /client/questionary', () => {
        test('It should respont with 403', async() => {
            const response = await request(app)
                .get('/client/questionary')
                .set('authorization', 'bearer ' + "Wrong Token")
                .expect(403)
        })

        test('It should respont with 200', async() => {
            const response = await request(app)
                .get('/client/questionary')
                .set('authorization', 'bearer ' + accessToken)
                .expect(200)
        })
    })
})