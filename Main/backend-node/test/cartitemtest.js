const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;

chai.use(chaiHttp);

describe('Cart Items Routes', () => {
  // Assuming you have a table_id and menu_name for testing
  const tableIdForTest = 'your_table_id';
  const tableIdForTest2 = 'new_table_id';
  const menuNameForTest = 'your_menu_name';
  const menuNameForTest2 = "new_menu_name";

  it('should create a new cart item', async () => {
    const response = await chai
      .request(app)
      .post('/cart-items')
      .send({
        table_id: tableIdForTest,
        menu_name: menuNameForTest,
        quantity: 1,
        item_price: 10,
        total_price: 10,
        item_profit: 5,
        total_profit: 5,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('CartItem created successfully !!');
  });
  it('should create a new cart item for different table id', async () => {
    const response = await chai
      .request(app)
      .post('/cart-items')
      .send({
        table_id: tableIdForTest2,
        menu_name: menuNameForTest,
        quantity: 1,
        item_price: 10,
        total_price: 10,
        item_profit: 5,
        total_profit: 5,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('CartItem created successfully !!');
  });
  it('should create a new cart item', async () => {
    const response = await chai
      .request(app)
      .post('/cart-items')
      .send({
        table_id: tableIdForTest,
        menu_name: menuNameForTest2,
        quantity: 1,
        item_price: 10,
        total_price: 10,
        item_profit: 5,
        total_profit: 5,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('CartItem created successfully !!');
  });


//   it('should get all cart items', async () => {
//     const response = await chai.request(app).get('/cart-items');
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('message').to.equal('All CartItems received !!');
//   });

//   it('should get cart items for a particular table', async () => {
//     const response = await chai.request(app).get(`/cart-items/cart_table/${tableIdForTest}`);
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('message').to.equal('All CartItems received of particular table!!');
//   });

  it('should update a cart item', async () => {
    const response = await chai
      .request(app)
      .put('/cart-items')
      .send({
        table_id: tableIdForTest,
        menu_name: menuNameForTest,
        quantity: 2,
        total_price: 20,
        total_profit: 10,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update a cart item', async () => {
    const response = await chai
      .request(app)
      .put('/cart-items')
      .send({
        table_id: tableIdForTest,
        menu_name: menuNameForTest,
        quantity: 4,
        total_price: 40,
        total_profit: 20,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update a cart item', async () => {
    const response = await chai
      .request(app)
      .put('/cart-items')
      .send({
        table_id: tableIdForTest2,
        menu_name: menuNameForTest,
        quantity: 1,
        total_price: 10,
        total_profit: 5,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });

//   it('should delete cart items for a particular table', async () => {
//     const response = await chai.request(app).delete(`/cart-items/cart_table/${tableIdForTest}`);
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
//   });

  it('should delete a particular menu item from cart', async () => {
    const response = await chai
      .request(app)
      .delete(`/cart-items/${tableIdForTest}/${menuNameForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
  it('should delete a particular menu item from cart', async () => {
    const response = await chai
      .request(app)
      .delete(`/cart-items/${tableIdForTest2}/${menuNameForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
