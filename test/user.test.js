import { expect } from "chai";
import supertest from "supertest";

const api = supertest("http://localhost:8080");

describe("Test users", () => {
 

  it("Get users", async () => {
    const response = await api.get("/api/users");
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0]).have.property("first_name");
  });

  it("get user by id", async () => {
   
    const response = await api.get("/api/users/65a0df358e60d15eb2f4b631");
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an("object");
    expect(response.body).have.property("first_name");
  
  });

  it("Change user role", async () => {
    const response = await api.get("/api/users/premium/65a0df358e60d15eb2f4b631");
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an("object");
    expect(response.body).have.property("newRole");
  });
});
