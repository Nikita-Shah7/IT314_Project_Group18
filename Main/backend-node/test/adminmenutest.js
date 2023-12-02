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
  it('menu item name already exists.', async () => {
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

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('message').to.equal(`Can't create a new menuItem!!`);
  });
  it('should create a new menu item', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: 'Beverages',
        menu_name: 'Test Menu Item second',
        description: 'Test description dummy',
        price: 100,
        profit: 50,
        img: 'test_image_url_2',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('MenuItem created successfully !!');
  });
  it('should not create menuItem as categoryName is NULL ', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: null,
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 10,
        profit: 5,
        img: 'test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });

  it('should not create menuItem as menu_name is NULL ', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: 'Appetizer',
        menu_name: null,
        description: 'Test description',
        price: 10,
        profit: 5,
        img: 'test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });

  it('should not create menuItem as price is NULL ', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: null,
        profit: 5,
        img: 'test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });

  it('should not create menuItem as profit is NULL ', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 10,
        profit: null,
        img: 'test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });

  it('should not create menuItem as image is NULL ', async () => {
    const response = await chai
      .request(app)
      .post('/menu')
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 10,
        profit: 5,
        img: null,
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });


  // it('should get all menu items', async () => {
  //   const response = await chai.request(app).get('/menu');
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('message').to.equal('All menuItems received !!');
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });


  // it('should get a menu item based on ID', async () => {
  //   const response = await chai.request(app).get(`/menu/${menuItemIdForTest}`);
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('message').to.equal('MenuItem received !!');
  // });


  it('should update a image in menu item', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 10,
        profit: 5,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update profit menu item ', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 10,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update price menu item ', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Test description',
        price: 20,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update description menu item ', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Test Menu Item',
        description: 'Updated Test description',
        price: 20,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update menu name in  menu item ', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'UPDATED Test Menu Item',
        description: 'Updated Test description',
        price: 20,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update category name in menu item ', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Bevarages',
        menu_name: 'UPDATED Test Menu Item',
        description: 'Updated Test description',
        price: 20,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('new menu name is already there.', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Bevarages',
        menu_name: 'UPDATED Test Menu Item',
        description: 'Updated Test description',
        price: 20,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('message').to.equal(`Can't update !!`);
  });
  it('Category Name is empty while updating', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: null,
        menu_name: 'Updated Test Menu Item',
        description: 'Updated test description',
        price: 15,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });
  it('Menu name is empty while updating', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: null,
        description: 'Updated test description',
        price: 15,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });
  it('price field is empty while updating', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Updated Test Menu Item',
        description: 'Updated test description',
        price: null,
        profit: 8,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });
  it('profit field is empty while updating', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Updated Test Menu Item',
        description: 'Updated test description',
        price: 10,
        profit: null,
        img: 'updated_test_image_url',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });
  it('image field is empty while updating', async () => {
    const response = await chai
      .request(app)
      .put(`/menu/${menuItemIdForTest}`)
      .send({
        categoryName: 'Appetizer',
        menu_name: 'Updated Test Menu Item',
        description: 'Updated test description',
        price: 10,
        profit: 8,
        img: null,
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message').to.equal('All fields are mandatory !!');
  });
  it('should delete a menu item based on ID', async () => {
    const response = await chai.request(app).delete(`/menu/${menuItemIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
