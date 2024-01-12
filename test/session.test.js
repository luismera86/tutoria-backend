import { expect } from "chai";
import supertest from "supertest";

const api = supertest("http://localhost:8080");

describe("Test sessions", () => {

  before("Register User" ,async () => {
    const user = {
      first_name: "Test",
      last_name: "TestUser",
      email: "test@test.com",
      age: 22,
      password: "123",
    }
    const response = await api.post("/api/sessions/register").send(user);
    expect(response.status).to.eql(200);
    expect(response.body).to.have.property("status").to.eql("success");
  });

 
  
  it("Login User", async () => {
    const user = {
      email: "test@test.com",
      password: "123",
    };
    const response = await api.post("/api/sessions/login").send(user);
    expect(response.status).to.eql(200);
    expect(response.body).to.have.property("status").to.eql("success");
    expect(response.body).to.have.property("payload").have.property("email").to.eql("test@test.com");
    expect(response.body).to.have.property("payload").to.not.have.property("password")
    
  });

  

  after("Delete User", async () => { 
    const user = await api.get("/api/users/email/test@test.com");
    const response = await api.delete(`/api/users/${user.body._id}`);
    expect(response.status).to.eql(200);
    expect(response.body).to.have.property("status").to.eql("success");
  });
 

});
