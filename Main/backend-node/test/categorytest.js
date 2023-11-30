const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;
const { ACCESS_TOKEN_SECRET } = require('../config.js');
chai.use(chaiHttp);

describe('Category Routes', () => {
  // Assuming you have a category ID for testing
  const categoryIdForTest = '38d5602e-32ab-4475-b515-a55b128fea0e';
  const validAccessToken = ACCESS_TOKEN_SECRET;

  it('should create a new category', async () => {
    const response = await chai
      .request(app)
      .post('/category')
      .set('Authorization', `Bearer ${validAccessToken}`)
      .send({
        categoryName: 'Test Ctegory',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Category created successfully !!');
  });

  it('should get all categories', async () => {
    const response = await chai.request(app).get('/category');
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('All categories received !!');
  });

  it('should get a category based on ID', async () => {
    const response = await chai.request(app).get(`/category/${categoryIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Category received !!');
  });

  it('should update a category based on ID', async () => {
    const response = await chai
      .request(app)
      .put(`/category/${categoryIdForTest}`)
      .set('Authorization', `Bearer ${validAccessToken}`)
      .send({
        categoryName: 'Updated Test Category',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });

  it('should delete a category based on ID', async () => {
    const response = await chai
      .request(app)
      .delete(`/category/${categoryIdForTest}`)
      .set('Authorization', `Bearer ${validAccessToken}`);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
