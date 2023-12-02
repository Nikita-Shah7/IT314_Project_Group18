const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;

chai.use(chaiHttp);

describe('Cart Routes', () => {
  // Assuming you have a table_id for testing
  const tableIdForTest = 'your_table_id';
  const tableIdForTest2= 'new_table_id';

  it('should create a new cart', async () => {
    const response = await chai
      .request(app)
      .post('/cart')
      .send({
        table_id: tableIdForTest,
        total_bill_amount: 50,
        total_bill_profit: 20,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Cart created successfully !!');
  });
  it('should create a new cart', async () => {
    const response = await chai
      .request(app)
      .post('/cart')
      .send({
        table_id: tableIdForTest2,
        total_bill_amount: 100,
        total_bill_profit: 40,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Cart created successfully !!');
  });
 
//   it('should get all carts ordered by date_time', async () => {
//     const response = await chai.request(app).get('/cart');
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('message').to.equal('All Carts received !!');
//   });

//   it('should get all carts ordered by table_id', async () => {
//     const response = await chai.request(app).get('/cart/cart_table');
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('message').to.equal('All Carts received !!');
//   });

//   it('should get cart based on table_id', async () => {
//     const response = await chai.request(app).get(`/cart/${tableIdForTest}`);
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('message').to.equal('Cart received !!');
//   });

  it('should update cart based on table_id', async () => {
    const response = await chai
      .request(app)
      .put(`/cart/${tableIdForTest}`)
      .send({
        total_bill_amount: 60,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });
  it('should update cart based on table_id', async () => {
    const response = await chai
      .request(app)
      .put(`/cart/${tableIdForTest2}`)
      .send({
        total_bill_amount: 200,
        date_time: new Date().toISOString(),
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Updated successfully !!');
  });

  it('should delete cart based on table_id', async () => {
    const response = await chai.request(app).delete(`/cart/${tableIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
