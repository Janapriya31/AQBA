const request = require('supertest');
const app = require('../server'); // Your Express app

describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(201);
    });
});
