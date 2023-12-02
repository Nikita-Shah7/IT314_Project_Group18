const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;

chai.use(chaiHttp);

describe('Restaurant Menu Routes', () => {
  // Assuming you have a menu item ID for testing
  const menuItemIdForTest = '918e823a-20dc-4821-9a84-44a614d926ec';

  it('should create a new menu item', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 10,
        profit: 5,
        img: 'test_image_url',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('MenuItem created successfully !!');
  });

  it('should get all menu items', async () => {
    const response = await chai.request(app).get('/menu');
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('All menuItems received !!');
  });

  it('should get a menu item based on ID', async () => {
    const response = await chai.request(app).get(`/menu/${menuItemIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('MenuItem received !!');
  });

  it('should update a menu item based on ID', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Updated Test Menu Item',
        description: 'Updated test description',
        price: 15,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });

  it('should delete a menu item based on ID', async () => {
    const response = await chai.request(app).delete(`/menu/${menuItemIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
