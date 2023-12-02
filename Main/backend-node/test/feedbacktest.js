const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Update the path accordingly
const { expect } = chai;

chai.use(chaiHttp);

describe('Feedback Routes', () => {
  // Assuming you have a feedback ID for testing
  const feedbackIdForTest = '7e65170f-eae7-4563-945a-3717640ad58e';

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

  it('should get all feedbacks', async () => {
    const response = await chai.request(app).get('/feedback');
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('All Feedbacks received !!');
  });

  it('should get a feedback based on ID', async () => {
    const response = await chai.request(app).get(`/feedback/${feedbackIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Feedback received !!');
  });

  it('should delete a feedback based on ID', async () => {
    const response = await chai.request(app).delete(`/feedback/${feedbackIdForTest}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message').to.equal('Deleted successfully !!');
  });
});
