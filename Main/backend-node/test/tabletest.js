const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;
const { ACCESS_TOKEN_SECRET } = require('../config.js');
chai.use(chaiHttp);

describe('Table Routes', () => {
  // Assuming you have a table ID for testing
  const tableIdForTest = 31;
  const validAccessToken = ACCESS_TOKEN_SECRET;
  it('should create a new table', async () => {
    const response = await chai
      .request(app)
      .post('/table')
      .set('Authorization', `Bearer ${validAccessToken}`)
      .send({
        table_id: 32,
        capacity: 4,
        availability_status: 'Available',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Table created successfully !!');
  });

  it('should get all tables', async () => {
    const response = await chai.request(app).get('/table');
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('All Tables received !!');
  });

  it('should get a table based on ID', async () => {
    const response = await chai.request(app).get(`/table/${tableIdForTest}`);
    // console.log(response)
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Table received !!');
  });

  it('should update a table based on ID', async () => {
    const response = await chai
      .request(app)
      .put(`/table/${tableIdForTest}`)
      .set('Authorization', `Bearer ${validAccessToken}`)
      .send({
        table_id: tableIdForTest,
        capacity: 6,
        availability_status: 'Occupied',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });

  it('should delete a table based on ID', async () => {
    const response = await chai.request(app).delete(`/table/${tableIdForTest}`).set('Authorization', `Bearer ${validAccessToken}`);;
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
