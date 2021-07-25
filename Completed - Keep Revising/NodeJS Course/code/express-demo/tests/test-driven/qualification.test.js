const { response } = require("express");
const { set } = require("lodash");
const request = require("supertest");
const { User } = require("../../modals/User");
const mongoose = require("mongoose");

describe("api/users/qualification", () => {
  let server;
  let name;
  let email;
  let password;
  let userId;
  let user;
  let token;
  let qualification;

  beforeEach(async () => {
    server = require("../../index");
    await User.remove({});
  });

  afterEach(async () => {
    await User.remove({});
    await server.close();
  });

  beforeEach(async () => {
    userId = mongoose.Types.ObjectId();
    name = "Saad Ahmed";
    email = "user1@gmail.com";
    password = "12345678";
    qualification = "BC(CS)";
    user = new User({ _id: userId, name, email, password });
    token = new User(user).generateAuthToken();
    await user.save();
  });

  describe("GET /", () => {
    const exec = () => {
      return request(server)
        .get("/api/users/qualification")
        .set("x-auth-token", token)
        .send();
    };

    it("should work", async () => {
      const result = await User.findById(userId.toHexString());
      expect(result).not.toBeNull();
    });
  });

  describe("POST /", () => {
    const exec = () => {
      return request(server)
        .post("/api/users/qualification")
        .set("x-auth-token", token)
        .send({
          name,
          email,
          password,
          qualification,
        });
    };

    it("should return 401 if client is not logged In", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
    });

    it("should return 400 if no email is provided", async () => {
      email = null;
      const response = await exec();
      expect(response.status).toBe(400);
    });

    it("should return 400 if no qualification is found", async () => {
      qualification = "";
      const response = await exec();
      expect(response.status).toBe(400);
    });

    it("should return 200 if valid", async () => {
      const response = await exec();
      expect(response.status).toBe(200);
    });
  });
});
