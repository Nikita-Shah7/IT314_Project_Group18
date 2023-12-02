const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Update the path accordingly
const { expect } = chai;
const { ACCESS_TOKEN_SECRET } = require("../config.js");
chai.use(chaiHttp);

describe("Table Routes", () => {
  // const tableIdForTest2 = 311;
  // const CapacityForTest = 5;
  // const CapacityForTest2 = 50;
  // const AvailabilityForTest1 = "Available";
  // const AvailabilityForTest2 = "Occupied";
  // const AvailabilityForTest3 = "Dummy_Value";
  const validAccessToken = ACCESS_TOKEN_SECRET;

  it("should create a new table", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 71,
        capacity: 4,
        availability_status: "Available",
      });

    expect(response).to.have.status(201);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Table created successfully !!");
  });
  it("should create a new table", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 72,
        capacity: 5,
        availability_status: "Available",
      });

    expect(response).to.have.status(201);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Table created successfully !!");
  });
  it("should create a new table", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 73,
        capacity: 2,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(201);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Table created successfully !!");
  });
  it("should create a new table", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 74,
        capacity: 10,
        availability_status: "Available",
      });

    expect(response).to.have.status(201);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Table created successfully !!");
  });

  it("table id already exists", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 72,
        capacity: 4,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("message")
      .to.equal(`Can't create a new Table!!`);
  });
  it("table id already exists", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 74,
        capacity: 5,
        availability_status: "Available",
      });

    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("message")
      .to.equal(`Can't create a new Table!!`);
  });

  it("table id is null", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: null,
        capacity: 4,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal(`All fields are mandatory !!`);
  });

  it("capacity is null", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 91,
        capacity: null,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal(`All fields are mandatory !!`);
  });

  it("availability status is null", async () => {
    const response = await chai
      .request(app)
      .post("/table")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 91,
        capacity: 5,
        availability_status: null,
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal(`All fields are mandatory !!`);
  });

  // it("should get all tables", async () => {
  //   const response = await chai.request(app).get("/table");
  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All Tables received !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should return tables based on availability = available", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/table/availability_status/${AvailabilityForTest1}`);

  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All Tables received based on availability_status !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should return tables based on availability = Occupied", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/table/availability_status/${AvailabilityForTest2}`);

  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All Tables received based on availability_status !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should return tables based on availability = dummy value", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/table/availability_status/${AvailabilityForTest3}`);

  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All Tables received based on availability_status !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.equal(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should return tables based on given capacity <= max capacity of any table", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/table/capacity/${CapacityForTest}`);

  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All Tables received based on capacity !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThan(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should return tables based on input capacity > max capacity of any table", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/table/capacity/${CapacityForTest2}`);

  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All Tables received based on capacity !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.equal(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should get a table based on ID", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/table/${PreexistingtableIdForTest}`);
  //   // console.log(response)
  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("Table received !!");
  // });

  // it("table with table id is not present", async () => {
  //   const response = await chai.request(app).get(`/table/${tableIdForTest2}`);
  //   // console.log(response)
  //   expect(response).to.have.status(404);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("Table not found !!");
  // });

  it("should update capacity", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${72}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 72,
        capacity: 8,
        availability_status: "Available",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });
  it("should update capacity", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${74}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 74,
        capacity: 13,
        availability_status: "Available",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });
  it("should update availability status", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${71}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 71,
        capacity: 4,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });
  it("should update availability status", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${73}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 73,
        capacity: 2,
        availability_status: "Available",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });
  it("should update tableId", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${71}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 81,
        capacity: 4,
        availability_status: "Available",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });
  it("should update tableId", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${72}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 82,
        capacity: 4,
        availability_status: "Available",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });

 
  it("New table id already exists while editing table details", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${82}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 81,
        capacity: 6,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("message")
      .to.equal(`Can't update !!`);
  });

  it("Table id is null during edit table by admin", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${82}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: null,
        capacity: 6,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are mandatory !!");
  });

  it("Capacity is null during edit table by admin", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${81}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 91,
        capacity: null,
        availability_status: "Occupied",
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are mandatory !!");
  });
  it("Availability status is null during edit table by admin", async () => {
    const response = await chai
      .request(app)
      .put(`/table/${81}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        table_id: 91,
        capacity: 4,
        availability_status: null,
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are mandatory !!");
  });

  it("should delete a table based on ID", async () => {
    const response = await chai
      .request(app)
      .delete(`/table/${81}`)
      .set("Authorization", `Bearer ${validAccessToken}`);
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Deleted successfully !!");
  });
  it("should delete a table based on ID", async () => {
    const response = await chai
      .request(app)
      .delete(`/table/${82}`)
      .set("Authorization", `Bearer ${validAccessToken}`);
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Deleted successfully !!");
  });
  it("should delete a table based on ID", async () => {
    const response = await chai
      .request(app)
      .delete(`/table/${73}`)
      .set("Authorization", `Bearer ${validAccessToken}`);
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Deleted successfully !!");
  });
  it("should delete a table based on ID", async () => {
    const response = await chai
      .request(app)
      .delete(`/table/${74}`)
      .set("Authorization", `Bearer ${validAccessToken}`);
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Deleted successfully !!");
  });
});
