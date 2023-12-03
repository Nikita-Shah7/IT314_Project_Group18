const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Update the path accordingly
const { expect } = chai;
const { ACCESS_TOKEN_SECRET } = require("../config.js");
chai.use(chaiHttp);

describe("Category Routes", () => {
  // Assuming you have a category ID for testing
  const categoryIdForTest = "38d5602e-32ab-4475-b515-a55b128fea0e"; 
  // const DummyCatId = "123456";
  const validAccessToken = ACCESS_TOKEN_SECRET;

  it("should create a new category", async () => {
    const response = await chai
      .request(app)
      .post("/category")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        categoryName: "Test Category",
      });

    expect(response).to.have.status(201);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Category created successfully !!");
  });
  it("should create a new category", async () => {
    const response = await chai
      .request(app)
      .post("/category")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        categoryName: "Test Category second",
      });

    expect(response).to.have.status(201);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Category created successfully !!");
  });

  it("check if new category field is empty", async () => {
    const response = await chai
      .request(app)
      .post("/category")
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        categoryName: null,
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are mandatory !!");
  });

  // it("should get all categories", async () => {
  //   const response = await chai.request(app).get("/category");
  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("All categories received !!");
  //   expect(response.body).to.have.property("count");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.count).to.be.a("number").to.be.greaterThanOrEqual(0);
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should get a category based on ID", async () => {
  //   const response = await chai
  //     .request(app)
  //     .get(`/category/${categoryIdForTest}`);
  //   expect(response).to.have.status(200);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("Category received !!");
  //   expect(response.body).to.have.property("data");
  //   expect(response.body.data).to.be.an("array");
  // });

  // it("should get a message when category not found ", async () => {
  //   const response = await chai.request(app).get(`/category/${DummyCatId}`);
  //   expect(response).to.have.status(404);
  //   expect(response.body)
  //     .to.have.property("message")
  //     .to.equal("Category not found !!");
  // });

  it("should update a category ", async () => {
    const response = await chai
      .request(app)
      .put(`/category/${categoryIdForTest}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        categoryName: "Updated Test Category",
      });

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Updated successfully !!");
  });
  it("should give error when new category name is blank while updating a category ", async () => {
    const response = await chai
      .request(app)
      .put(`/category/${categoryIdForTest}`)
      .set("Authorization", `Bearer ${validAccessToken}`)
      .send({
        categoryName: null,
      });

    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are mandatory !!");
  });

  it("should delete a category", async () => {
    const response = await chai
      .request(app)
      .delete(`/category/${categoryIdForTest}`)
      .set("Authorization", `Bearer ${validAccessToken}`);

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Deleted successfully !!");
  });
});
