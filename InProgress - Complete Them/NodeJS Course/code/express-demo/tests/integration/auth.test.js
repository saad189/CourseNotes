const { response } = require("express");
const { set } = require("lodash");
const request = require("supertest");
const { User } = require("../../modals/User");

let server;
describe("auth middleware", () => {
  let name;
  let email;
  let password;
  let token;
  const exec = () => {
    return request(server)
      .post("/api/users/create")
      .set("x-auth-token", token)
      .send({
        name,
        email,
        password,
      });
  };

  beforeEach(async () => {
    server = server ? server : require("../../index");
    await User.remove({});
  });

  afterEach(async () => {
    await User.remove({});
    server.close();
  });

  beforeEach(() => {
    token = new User().generateAuthToken();
    name = "Saad Ahmed";
    email = "user1@gmail.com";
    password = "12345678";
  });

  it("should return 401 if no auth is provided", async () => {
    token = "";
    const response = await exec();
    expect(response.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = null;
    const response = await exec();
    expect(response.status).toBe(400);
  });
  it("should return 200 if auth token is present", async () => {
    const response = await exec();
    expect(response.status).toBe(200);
  });
});
