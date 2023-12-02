const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;

chai.use(chaiHttp);

describe('Feedback Routes', () => {
  // Assuming you have a feedback ID for testing
  // const feedbackIdForTest = '7e65170f-eae7-4563-945a-3717640ad58e';

  it('should create a new feedback', async () => {
    const response = await chai
      .request(app)
      .post('/feedback')
      .send({
        starRate: 5,
        comments: 'Test comment',
        date_time: '2023-11-24T12:00:00Z',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Feedback created successfully !!');
  });
  it('should create a new feedback', async () => {
    const response = await chai
      .request(app)
      .post('/feedback')
      .send({
        starRate: 5,
        comments: 'Test comment',
        date_time: '2023-11-25T12:20:05Z',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Feedback created successfully !!');
  });

  it('should create a new feedback', async () => {
    const response = await chai
      .request(app)
      .post('/feedback')
      .send({
        starRate: 5,
        comments: 'Test comment',
        date_time: '2023-11-26T11:11:17Z',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').to.equal('Feedback created successfully !!');
  });

  it('Feedback is empty', async () => {
    const response = await chai
      .request(app)
      .post('/feedback')
      .send({
        starRate: null,
        comments: null,
        date_time:'2023-11-24T12:00:00Z',
      });

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('message').to.equal('Feedback created successfully !!');
  });


  // it('should get all feedbacks', async () => {
  //   const response = await chai.request(app).get('/feedback');
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('message').to.equal('All Feedbacks received !!');
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it('should get a feedback based on ID', async () => {
  //   const response = await chai.request(app).get(`/feedback/${feedbackIdForTest}`);
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('message').to.equal('Feedback received !!');
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });
  // it('should get a feedback based on ID2', async () => {
  //   const response = await chai.request(app).get(`/feedback/${feedbackIdForTest}`);
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('message').to.equal('Feedback received !!');
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it('should delete a feedback based on ID', async () => {
  //   const response = await chai.request(app).delete(`/feedback/${feedbackIdForTest}`);
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  // });
});
