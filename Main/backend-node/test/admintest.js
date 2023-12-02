const chai = require('chai');
const chaiHttp = require('chai-http');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config.js');
const app = require('../index'); // Make sure to replace this with the actual path to your Express app file.
const pool = require('../db.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Admin Routes', () => {
    // Define a test admin data for creating, updating, and deleting
    const testAdmin = {
        admin_name: 'stAdmin',
        password: 'stPassword',
    };

    let adminId = 'f9f15def-2ca9-4085-96f4-9fff7c4bb029';

    // Test POST /admin
    describe('POST /admin', () => {
        it('should create a new admin', async () => {
            const res = await chai
                .request(app)
                .post('/admin')
                .send(testAdmin);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').to.equal('Admin created successfully !!');
        });

        it('should return an error if required fields are missing', async () => {
            const res = await chai.request(app).post('/admin').send({});
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message').to.equal('All fields are mandatory !!');
        });
    });

    // Test GET /admin
    describe('GET /admin', () => {
        it('should get all admins', async () => {
            const res = await chai.request(app).get('/admin');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal('All admin received !!');
            expect(res.body).to.have.property('count');
            expect(res.body).to.have.property('data').to.be.an('array');
        });
    });

    // Test GET /admin/:admin_name
    describe('GET /admin/:admin_name', () => {
        it('should get a specific admin by name', async () => {
            const res = await chai.request(app).get(`/admin/${testAdmin.admin_name}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal('Admin received !!');
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('accessToken');
        });

        it('should return 404 if the admin does not exist', async () => {
            const res = await chai.request(app).get('/admin/nonexistentadmin');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message').to.equal('Admin not found !!');
        });
    });

    // Test PUT /admin/:id
    describe('PUT /admin/:id', () => {
        it('should update an admin', async () => {
            const res = await chai.request(app).put(`/admin/${adminId}`).send({ admin_name: 'UpdatedAdminName' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal('Updated successfully !!');
        });

        it('should return 404 if the admin does not exist', async () => {
            const res = await chai.request(app).put('/admin/nonexistentid').send({ admin_name: 'UpdatedAdminName' });
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message').to.equal('Admin not found !!');
        });
    });

    // Test DELETE /admin/:id
    describe('DELETE /admin/:id', () => {
        it('should delete an admin', async () => {
            const res = await chai.request(app).delete(`/admin/${adminId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal('Deleted successfully !!');
        });

        it('should return 404 if the admin does not exist', async () => {
            const res = await chai.request(app).delete('/admin/nonexistentid');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message').to.equal('Admin not found !!');
        });
    });
});
